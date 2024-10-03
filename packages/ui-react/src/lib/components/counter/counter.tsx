import { useState } from 'react';

/**
 * Displays a counter.
 */
export function NatuCounter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        setCount((count) => count + 1);
      }}
    >
      count is {count}
    </button>
  );
}
