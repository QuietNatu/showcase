import { Counter } from './components/counter/counter';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import '../styles/styles.scss';
import styles from './app.module.scss';
import { useTranslation } from 'react-i18next';

/* TODO: error boundary? */
/* TODO: loading while app is not ready? (i18n via APP_INITIALIZER -> https://netbasal.com/optimize-user-experience-while-your-angular-app-loads-7e982a67ff1a) */

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
