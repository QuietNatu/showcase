import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { runWithApiTestContext } from '../../shared/api/api-test-context.server';
import { AppRequestHeader } from '../../shared/config/headers';

if (import.meta.env.VITE_ENABLE_MOCKING === 'true') {
  const { startMockServer } = await import('../../mocks/api/server-development');
  await startMockServer();
}

export default createServerEntry({
  fetch(request) {
    const testId = request.headers.get(AppRequestHeader.TestScenarioId) ?? undefined;

    return runWithApiTestContext({ scenarioId: testId }, () => handler.fetch(request));
  },
});
