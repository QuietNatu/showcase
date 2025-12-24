import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>Showcase</h1>

      <Link to="/products">Go to products</Link>
    </>
  );
}
