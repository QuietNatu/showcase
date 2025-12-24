import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <h1>Showcase</h1>

      <Link to="/products">Go to products</Link>
    </>
  );
}
