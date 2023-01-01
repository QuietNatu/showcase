import { screen } from '@testing-library/react';
import { axe } from '@/test/utils/axe';
import { render } from '@/test/utils/render';
import { App } from './app';

test('renders', () => {
  render(<App />);

  expect(screen.getByText('Vite + React')).toBeInTheDocument();
});

test('has no accessibility violations', async () => {
  const { baseElement } = render(<App />);
  expect(await axe(baseElement)).toHaveNoViolations();
});
