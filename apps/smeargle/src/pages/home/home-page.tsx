import { Link } from '@tanstack/react-router';

// TODO: explain pages and routes split?

/**
 * TODO
 */
export function HomePage() {
  return (
    <>
      <h1>Showcase</h1>

      <Link to="/products">Go to products</Link>
    </>
  );
}
