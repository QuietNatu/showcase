import { Counter } from './components/counter/counter';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import '../styles/styles.scss';
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />

      <Sidebar className={styles.sidebar} />

      <main className={styles.main}>
        <Counter />
      </main>
    </div>
  );
}
