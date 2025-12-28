import handler, { createServerEntry } from '@tanstack/react-start/server-entry';

if (import.meta.env.VITE_ENABLE_MOCKING === 'true') {
  const { startMockServer } = await import('../mocks/api/server-development');
  await startMockServer();
}

export default createServerEntry({
  fetch(request) {
    return handler.fetch(request);
  },
});
