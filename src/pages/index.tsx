import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Cookies from 'js-cookie';
import axios from "axios";
import FunctionalityButton from "@/components/atoms/FunctionalityButton";
import Header from "@/components/Header";

export default  function Home() {
  const [logged, setLogged] = useState(false);
  const router = useRouter();
  const { code } = router.query;

  const getUserToken = async () => {
    let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      grant_type: 'authorization_code',
      code: code.toString(),
      redirect_uri: 'https://spotify-playlists-tools.vercel.app/',
      code_verifier: codeVerifier.toString(),
    };
    
    const url = 'https://accounts.spotify.com/api/token';
    try {
      const response = await axios.post(url, new URLSearchParams(payload), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + (60 * 60 * 1000));
      Cookies.set('user_access_token', response.data.access_token, { expires: expirationTime });
      setLogged(true);
    } catch (error) {
        console.error('Error:', error.response.data);
      }
  }

  useEffect(() => {
    if(code) {
      localStorage.setItem('URL_code', code.toString());
      getUserToken();
    } else {
      if(Cookies.get('user_access_token')) {
        setLogged(true)
      } else {
        setLogged(false)
      }
    }

  }, [code])
  
  return (
    <div className={styles.container}>
      <Header />
      <h1>Spotify Playlists Builder by Thiago Almeida</h1>
      {
        logged ? (
          <div>
            <p>Choose one of the functions below</p>
            <FunctionalityButton href='/topMusics' title='Top Musics'>
              Choose various artists and generate a playlist with the top 10 most played songs of each chosen artist.
            </FunctionalityButton>
          </div>
          ) : (
          <div>
            <p>Please grant access to your Spotify profile for full site functionality.</p>
            <button className={styles.loginButton}><a href="/login">Grant Access</a></button>
          </div>
        )
      }
    </div>
  )
}
