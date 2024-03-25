import styles from '../styles/Header.module.css';

interface HeaderProps {
  title?: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <header className={styles.header}>
      <div>        
        <div className={styles.triangleContainer}>
          <a href="/"><div className={styles.triangle}></div></a>
        </div>
        <span>Spotify Playlist Tools</span>
      </div>
      <h1>{title}</h1>
    </header>
  )
}