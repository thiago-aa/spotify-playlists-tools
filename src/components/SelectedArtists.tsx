import styles from '../styles/SelectedArtists.module.css'
import ArtistCard from './ArtistCard';

interface SelectedArtistsProps {
  artists: any[];
  setArtists: (artist: any) => void
}


export default function SelectedArtist(props: SelectedArtistsProps) {
  const {artists, setArtists} = props;

  const deleteArtist = (artist: any) => {
    const index = artists.indexOf(artist);
    if(index === 0) {
      setArtists(artists.slice(1))
    } else {
      setArtists([...artists.slice(0, index), ...artists.slice((index + 1))])
    }
  }

  const renderArtists = () => {
    if(artists.length > 0) {
      return artists.map((artist, i) => <ArtistCard artist={artist} type='selectedArtist' handleClick={deleteArtist} artistsList={artists} key={i}/>) 
    } else {
      return null;
    } 
  }
  return (
    <div className={styles.selectedArtistsContainer}>
      <h3>Selected artists</h3>
      <div className={styles.artistsList}>
        {renderArtists()}
      </div>
    </div>
  )
}