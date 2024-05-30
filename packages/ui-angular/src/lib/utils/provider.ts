import { InjectionToken } from '@angular/core';

type TokenProvider<T, U extends T> = {
  provide: InjectionToken<T>;
} & (
  | { useValue: U }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { useClass: { new (...args: any[]): U } }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { useFactory: (...args: any[]) => U }
);

/** Just a way to provide some type safety to provided tokens */
export function provideToken<T, U extends T>(provider: TokenProvider<T, U>) {
  return provider;
}
