import { Link } from '@tanstack/react-router';

/** The home page of the app. */
export function HomePage() {
  return (
    <>
      <h1>Showcase</h1>

      <Link to="/products">Go to products</Link>
    </>
  );
}
