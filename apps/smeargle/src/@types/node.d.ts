declare module 'process' {
  global {
    namespace NodeJS {
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required to add props
      interface ProcessEnv {
        // TODO: not working?
        /** Base URL for API requests */
        API_BASE_URL?: string;
        /** Base URL for API requests when performing a test execution  */
        TEST_API_BASE_URL?: string;
      }
    }
  }
}
