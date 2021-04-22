import styles from './styles.module.scss';
import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";


export default function Header(){
  
  const currentDate = format(new Date(), 'EEEEEEE,d MMMM',{
    locale: ptBr,
  });

  return(
    <header className={styles.headerContainer}>
      <img src="logo.svg" alt="Podcastr"></img>
      <p>O melhor para você ouvir,sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}