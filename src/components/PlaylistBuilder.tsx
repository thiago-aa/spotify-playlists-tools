import styles from '../styles/PlaylistBuilder.module.css';
import Input from './atoms/Input';
import PlaylistShower from './atoms/PlaylistShower';

interface PlaylistBuilderProps {
  generatePlaylist: () => void;
  playlistID: string;
  playlistName: string;
  handleInput: (value: any) => void;
  activeButton: boolean;
  noPlaylist: React.ReactNode | null;
}

export default function PlaylistBuilder(props: PlaylistBuilderProps) {
  const { generatePlaylist, playlistID,  handleInput, playlistName, activeButton, noPlaylist } = props
  const buttonStyle = activeButton ? styles.activeButton : `${styles.disabledButton} ${styles.activeButton}`;
  const handleButton = activeButton ? generatePlaylist : null;
  return (
    <div className={styles.container}>
      <h3>Playlist Builder</h3>
      <div className={styles.playlistContainer}>
        <label htmlFor="">Playlist Name</label>
        <div className={styles.inputContainer}>
          <Input handleChange={handleInput} inputValue={playlistName} style={{width: '70%', marginTop: '0'}}/>
          <button onClick={handleButton} className={buttonStyle}>Generate Playlist</button>
        </div>        
          {
            playlistID.length > 0 ? (
            <PlaylistShower playlistID={playlistID}/>
            ) : (noPlaylist)
          }
        </div>
      </div>
  )
}