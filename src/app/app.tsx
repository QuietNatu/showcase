import { ReactComponent as ReactLogo } from '@/assets/react.svg';
import './app.scss';

export function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer" aria-label="React logo">
          <ReactLogo className="logo react" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </div>
  );
}
