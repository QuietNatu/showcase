// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useContext as useReactContext, createContext as createReactContext } from 'react';

interface CreateContextOptions<T> {
  /** Default value for the context */
  defaultValue?: T;

  /** An unique name for the context */
  name: string;
}

/**
 * Creates a named context, provider and hook to consume it.
 * Throws an error if context value is undefined.
 */
export function createContext<T>(options: CreateContextOptions<T>) {
  const Context = createReactContext<T | undefined>(options.defaultValue);
  // eslint-disable-next-line functional/immutable-data
  Context.displayName = options.name;

  const useContext = (): T => {
    const value = useReactContext(Context);

    if (value === undefined) {
      // Error should only happen in dev mode, so throwing is fine
      // eslint-disable-next-line functional/no-throw-statements
      throw new Error(`missing ${options.name} provider`);
    }

    return value;
  };

  return [Context.Provider, useContext, Context] as const;
}
