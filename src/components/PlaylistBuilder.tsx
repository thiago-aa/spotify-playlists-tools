import styles from '../styles/PlaylistBuilder.module.css';
import Input from './atoms/Input';

interface PlaylistBuilderProps {
  generatePlaylist: () => void;
  playlistID: string;
  playlistName: string;
  handleInput: (value: any) => void;
}

export default function PlaylistBuilder(props: PlaylistBuilderProps) {
  const { generatePlaylist, playlistID,  handleInput, playlistName } = props

  return (
    <div className={styles.container}>
      <h3>Playlist Builder</h3>
      <div className={styles.playlistContainer}>
        <div style={{width: '100%'}}>
          <Input handleChange={handleInput} inputValue={playlistName} label='Playlist Name' style={{width: '70%'}}/>
          <button onClick={generatePlaylist}>Generate Playlist</button>
        </div>        
          {
            playlistID.length > 0 ? (
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator&theme=0`}
              width="70%"
              height='352px'
              style={{minHeight: '352px'}}
            />
            ) : null
          }
        </div>
      </div>
  )
}