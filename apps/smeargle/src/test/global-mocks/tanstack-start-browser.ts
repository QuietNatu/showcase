import { createServerFn } from '@tanstack/react-start';
import { vi } from 'vitest';

vi.mock(import('@tanstack/react-start'), async (importOriginal) => {
  const module = await importOriginal();

  return {
    ...module,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- TODO
    createServerFn: vi
      .fn<typeof createServerFn>()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO
      .mockRejectedValue(new Error('createServerFn cannot be called client-side in tests')) as any,
  };
});
