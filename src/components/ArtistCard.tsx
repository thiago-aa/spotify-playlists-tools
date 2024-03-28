import styles from '../styles/ArtistCard.module.css'
import { IconArrowRight, DeleteIcon, IconPlus } from './icons';
import { useState } from 'react';

interface ArtistSearchedProps {
  artist: any;
  handleClick: any;
  artistsList: string[];
  type: 'searchResult' | 'selectedArtist'
}

export default function ArtistCard(props: ArtistSearchedProps) {
  const [cardStyle, setCardStyle] = useState<any>(styles.artist);
  const {artist, handleClick, artistsList, type} = props;

  return  artist.images[0] === undefined ? null : (
    <div 
      className={cardStyle} 
      onMouseOver={() => type === 'searchResult' && setCardStyle(styles.artistHover)}
      onMouseLeave={() => setCardStyle(styles.artist)}
      onClick={() => type ==='searchResult' && handleClick(artist)}
    >
      <div className={styles.artistInfo}>        
        <img className={styles.artistImg} src={artist.images[0] !== undefined ? artist.images[0].url : ''} alt={`${artist.name} image not found`} />
        <p className={styles.artistName}>
          {artist.name}
        </p>
      </div>
      {
        type === 'searchResult' ? (
          <button>+</button>
        ) : (
          <button style={{backgroundColor: '#ededed'}} onClick={() => handleClick(artist)}><DeleteIcon className={styles.deleteIcon}/></button>
        )
      }
    </div>
  )
    
  
}