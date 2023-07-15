/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './app';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!;

render(() => <App />, root);
