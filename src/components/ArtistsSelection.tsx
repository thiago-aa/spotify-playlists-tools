import styles from '../styles/ArtistsSelection.module.css';
import SearchArtist from './SearchArtists';
import SelectedArtists from './SelectedArtists';

interface ArtistsSelectionProps {
  artistInput: string;
  handleSearchInput: (e: any) => void;
  searchedArtists: string[];
  selectedArtists: string[];
  setSelectedArtists: (artists: any[]) => void;
}

export default function ArtistsSelection(props: ArtistsSelectionProps) {
  const { artistInput, handleSearchInput, searchedArtists, selectedArtists, setSelectedArtists } = props;
  return (
    <div className={styles.artistsSelectionContainer}>
      <h3>Artists Selection</h3>
      <div>
              <SearchArtist 
                artistInput={artistInput} 
                handleSearchInput={handleSearchInput} 
                searchedArtists={searchedArtists} 
                selectedArtists={selectedArtists}
                setSelectedArtists={setSelectedArtists}
              />
              <SelectedArtists artists={selectedArtists} setArtists={setSelectedArtists}/>
      </div>
    </div>
  )
}