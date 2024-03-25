import { CSSProperties } from 'react';
import styles from '../../styles/Input.module.css';

interface InputProps {
  inputValue: string;
  handleChange: (value: any) => void;
  id?: string;
  style?: CSSProperties;
  label?: string;
}

export default function Input(props: InputProps) {
  const { handleChange, inputValue, style, label, id } = props;

  return (
    <>
      {
        label ? (
          <>
            <label htmlFor={id}>{label}</label>
            <br />
          
          </>
        ) : null
      }
      <input 
        id={id} 
        className={styles.input} 
        style={style} type="text" 
        autoComplete='off' 
        value={inputValue} 
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  )
}