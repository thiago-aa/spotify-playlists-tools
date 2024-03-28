import styles from '../styles/SearchArtists.module.css'
import ArtistCard from './ArtistCard';
import Input from './atoms/Input';

interface SearchArtistProps {
  artistInput: string;
  handleSearchInput: (e: any) => void;
  searchedArtists: string[];
  selectedArtists: string[];
  setSelectedArtists: (artists: any[]) => void;
}

export default function SearchArtist(props: SearchArtistProps) {
  const {artistInput, handleSearchInput, searchedArtists, selectedArtists, setSelectedArtists} = props

  const selectArtist = (artist: any) => {
    if(!selectedArtists.includes(artist)){
      setSelectedArtists([artist, ...selectedArtists])
    }
  }

  return (
    <div className={styles.searchArtistContainer}>
      <h3>Search for the artists</h3>
      <Input handleChange={handleSearchInput} inputValue={artistInput}></Input>
      <div className={styles.artistsList}>
        {
        artistInput.length > 0 ? (
          searchedArtists.map((artist, i) =>  (
            <ArtistCard 
              handleClick={selectArtist} 
              artist={artist} 
              artistsList={selectedArtists} 
              type='searchResult'
              key={i} 
            />
          ))
        ) : null
        }
      </div>
    </div>
  )
}