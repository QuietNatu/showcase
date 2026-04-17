import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { runWithTestContext } from '../../shared/test-context';

// TODO: env var not working with pnpm start?
if (import.meta.env.VITE_ENABLE_MOCKING === 'true') {
  const { startMockServer } = await import('../../mocks/api/server-development');
  await startMockServer();
}

export default createServerEntry({
  fetch(request) {
    const testId = request.headers.get('test-id') ?? undefined;

    return runWithTestContext({ testId }, () => handler.fetch(request));
  },
});
