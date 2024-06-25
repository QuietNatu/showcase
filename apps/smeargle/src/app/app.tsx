import { Counter } from './components/counter/counter';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import '../styles/styles.scss';
import styles from './app.module.scss';
import { useTranslation } from 'react-i18next';

/* TODO: error boundary */
/* TODO: move suspense here? */
/* TODO: ui package */
/* TODO: remove */
const date = new Date(2024, 5, 23);

export function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.root}>
      <Header className={styles.header} />

      <Sidebar className={styles.sidebar} />

      <main className={styles.main}>
        <Counter />

        {/* TODO: remove */}
        <select
          value={i18n.language}
          onChange={(event) => void i18n.changeLanguage(event.target.value)}
        >
          <option value="en-GB">en-GB</option>
          <option value="en-US">en-US</option>
          <option value="pt-PT">pt-PT</option>
        </select>

        <div>{t('common.hello')}</div>
        <div>{t('common.testDate', { value: date })}</div>
      </main>
    </div>
  );
}
