import styles from '../../styles/FunctionalityButton.module.css';

interface FunctionalityButtonProps {
  title: string;
  children: any;
  href: string;
}

export default function FunctionalityButton(props: FunctionalityButtonProps) {
  const { children, href, title } = props;

  return (
    <div className={styles.container}>
      <a href={href}>
        <h4>{title}</h4>
        <p>{children}</p>
      </a>
    </div>
  )
}