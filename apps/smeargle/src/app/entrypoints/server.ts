import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { runWithApiTestContext } from '../../shared/api/api-test-context.server';

if (import.meta.env.VITE_ENABLE_MOCKING === 'true') {
  const { startMockServer } = await import('../../mocks/api/server-development');
  await startMockServer();
}

export default createServerEntry({
  fetch(request) {
    const testId = request.headers.get('test-id') ?? undefined;

    return runWithApiTestContext({ testId }, () => handler.fetch(request));
  },
});
