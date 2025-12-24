import { useContext as useReactContext, createContext as createReactContext, Context } from 'react';

type Options = {
  /** An unique name for the context */
  name: string;
};

type Result<T> = [Context<T | undefined>, () => T];

/**
 * Shorthand to create a context with a hook that will throw an error in case the context provider is missing.
 */
export function createRequiredContext<T>(options: Options): Result<T> {
  const Context = createReactContext<T | undefined>(undefined);
  // eslint-disable-next-line functional/immutable-data -- only mutable API is available
  Context.displayName = options.name;

  const useContext = (): T => {
    const value = useReactContext(Context);

    if (value === undefined) {
      // eslint-disable-next-line functional/no-throw-statements -- React expects errors to throw
      throw new Error(`missing ${options.name} provider`);
    }

    return value;
  };

  return [Context, useContext];
}
