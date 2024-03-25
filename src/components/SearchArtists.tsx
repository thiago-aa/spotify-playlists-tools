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

  return (
    <div className={styles.searchArtistContainer}>
      <h3>Search for the artists</h3>
      {/* <label htmlFor="artistInput">Type the artist name</label><br /> */}
      <Input handleChange={handleSearchInput} inputValue={artistInput}></Input>
      <div className={styles.artistsList}>
        {
        artistInput.length > 0 ? (
          searchedArtists.map((artist, i) =>  (
            <ArtistCard 
              handleClick={setSelectedArtists} 
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