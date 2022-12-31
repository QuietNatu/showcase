import { screen } from '@testing-library/react';
import { render } from '../test/utils/render';
import App from './app';

test('renders', () => {
  render(<App />);

  expect(screen.getByText('Vite + React')).toBeInTheDocument();
});
