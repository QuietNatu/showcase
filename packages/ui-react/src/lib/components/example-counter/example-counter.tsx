import { useState } from 'react';

/** Only used as placeholder while no other components are created. */
export function ExampleCounter() {
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
