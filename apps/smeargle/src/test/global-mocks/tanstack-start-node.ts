import { createServerFn } from '@tanstack/react-start';
import { vi } from 'vitest';

type CreateServerFn = typeof createServerFn<'GET'>;
type ServerFnBuilder = ReturnType<CreateServerFn>;

/** This is a partial implementation, missing middleware and input validator logic should be added when needed */
const mockServerFn = vi.hoisted(
  () =>
    // eslint-disable-next-line @typescript-eslint/no-useless-default-assignment -- TODO false positive?
    (allMiddleware: unknown[] = [], inputValidators: unknown[] = []) =>
      ({
        middleware: (middleware: unknown) =>
          mockServerFn([...allMiddleware, middleware], inputValidators),

        inputValidator: (inputValidator: unknown) =>
          mockServerFn(allMiddleware, [...inputValidators, inputValidator]),

        handler: (fn: unknown) => fn,
      }) as unknown as ServerFnBuilder,
);

vi.mock(import('@tanstack/react-start'), async (importOriginal) => {
  const module = await importOriginal();

  return {
    ...module,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- TODO
    createServerFn: vi.fn<CreateServerFn>(() => mockServerFn()) as any,
  };
});
