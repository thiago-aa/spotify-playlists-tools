import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import styles from '../styles/topMusics.module.css';
import Header from '@/components/Header';
import PlaylistBuilder from '@/components/PlaylistBuilder';
import { Router, useRouter } from 'next/router';
import ArtistsSelection from '@/components/ArtistsSelection';

export default function Home() {
  const [token, setToken] = useState<string>('');
  const [artistInput, setArtistInput] = useState<string>('');
  const [searchedArtists, setSearchedArtists] = useState<any[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<any[]>([])
  const [topTracksURIs, setTopTracksURIs] = useState<string[]>([])
  const [playlistID, setPlaylistID] = useState<string>('')
  const [code, setCode] = useState('')
  const [playlistName, setPlaylistName] = useState('');
  const [noPlaylist, setNoPlaylist] = useState(null);
  const [logged, setLogged] = useState(true);
  const [savePlaylist, setSavePlaylist] = useState(true);
  const clientID: any = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  

  const router = useRouter();
  // const { code } = router.query;

  useEffect(() => {
    setCode(localStorage.getItem('URL_code'));
    getToken();
    if(Cookies.get('user_access_token') === undefined) {
      setLogged(false);
    }
  }, []);
  
  async function getToken() {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          'grant_type': 'client_credentials',
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(clientID + ':' + clientSecret).toString('base64')),
          },
        });
       setToken(response.data.access_token);
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw error;
    }
  }
  
  
  const  searchArtist = async (artistName: string) => {
    try{
      const response  = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      setSearchedArtists(response.data.artists.items.slice(0,5))
    } catch(error) {
      console.error(error)
    }
  }

  const getTopTracks = async (artistID: string) => {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return response.data.tracks;
  }
  
  const handleSearchInput = (e: any) => {
    setArtistInput(e);
    if(artistInput.length > 0) {
      searchArtist(artistInput);
    }
  }

  const generateTopTracksPlaylist = async () => {
    const auxTracks: any[] = [];

    setNoPlaylist(
      <>
        Loading...
      </>
    );

    for (const artist of selectedArtists) {
      const artistTracks = await getTopTracks(artist.id);
      auxTracks.push(...artistTracks.map((track: any) => track.uri))
    }
    setTopTracksURIs(auxTracks);
    let userToken;
    if(Cookies.get('user_access_token') === undefined) {
      router.push('/');
    } else {
      userToken = Cookies.get('user_access_token');
    }

    const user = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      },
    })

      
    const playlist = await axios.post(`https://api.spotify.com/v1/users/${user.data.id}/playlists`, {
        name: playlistName ? playlistName : 'Top Tracks',
        description: '',
        public: false
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
    setPlaylistID(playlist.data.id);
    try {
      const addAsMusicas = await axios.post(`https://api.spotify.com/v1/playlists/${playlist.data.id}/tracks`, {
      uris: auxTracks
      }, {
       headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      })
    } catch(error) {
      router.push('/');
    }
    if(!savePlaylist) {
      try {
        await axios.delete(`https://api.spotify.com/v1/playlists/${playlistID}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Error unfollowing playlist:', error);
      }
      
    }
  }

  
  if(logged) {
    return (
      <>
        <Header title='Top Musics'/>
        <div className={styles.mainContainer}>
          <ArtistsSelection 
            artistInput={artistInput}
            handleSearchInput={handleSearchInput}
            searchedArtists={searchedArtists}
            selectedArtists={selectedArtists}
            setSelectedArtists={setSelectedArtists}
          />
        <div>
        </ div>

          <PlaylistBuilder 
            generatePlaylist={generateTopTracksPlaylist} 
            playlistID={playlistID} 
            handleInput={setPlaylistName} 
            playlistName={playlistName}
            activeButton={selectedArtists.length > 0}
            noPlaylist={noPlaylist}
          />
          
        </div>
      </>
    )
  } else {
   router.push('/');
  }
}
