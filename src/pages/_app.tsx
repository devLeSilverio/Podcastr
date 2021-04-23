import Header from '../../src/components/Header';
import Player from '../../src/components/Player';
import styles from '../../styles/app.module.scss';
import '../../styles/globals.scss';

function MyApp({Component,pageProps}){
  return (
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
  )
}

export default MyApp