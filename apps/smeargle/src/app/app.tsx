import { Counter } from './components/counter/counter';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import '../styles/styles.scss';
import styles from './app.module.scss';
import { useTranslation } from 'react-i18next';

/**
 * Renders the whole app.
 */
export function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <Header className={styles.header} />

      <Sidebar className={styles.sidebar} />

      <main className={styles.main}>
        <div>{t('features.app.homepage.description')}</div>

        <Counter />
      </main>
    </div>
  );
}
