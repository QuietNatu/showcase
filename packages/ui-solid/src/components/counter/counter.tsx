import { createSignal } from 'solid-js';

export function NatuCounter() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      count is {count()}
    </button>
  );
}
