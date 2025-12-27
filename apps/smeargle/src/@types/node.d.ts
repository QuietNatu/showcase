declare module 'process' {
  global {
    namespace NodeJS {
      // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required to add props
      interface ProcessEnv {
        API_BASE_URL?: string;
      }
    }
  }
}
