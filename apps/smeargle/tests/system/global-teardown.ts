import { mockServer } from '../../src/mocks/api/server';

/** Closes server mocks */
function globalTeadown() {
  mockServer.close();
}

export default globalTeadown;
