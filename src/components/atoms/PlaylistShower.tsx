interface PlaylistShowerProps {
  playlistID: string;
}

export default function PlaylistShower(props: PlaylistShowerProps) {
  const {playlistID} = props;
  return (
    <iframe 
      src={`https://open.spotify.com/embed/playlist/${playlistID}?theme=0`}
      width="300" 
      height="380" 
      style={{minHeight: '352px'}}
      allow="encrypted-media">      
    </iframe>

  )
}