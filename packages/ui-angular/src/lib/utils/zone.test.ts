import { TestBed } from '@angular/core/testing';
import { runInZone } from './zone';
import { NgZone } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

describe(runInZone.name, () => {
  it('makes observable stream run inside Angular zone', async () => {
    TestBed.configureTestingModule({});

    const ngZone = TestBed.inject(NgZone);
    const source$ = new BehaviorSubject<string>('example');

    const sourceWithoutZone$ = source$.pipe(map(() => NgZone.isInAngularZone()));
    const sourceWithZone$ = source$.pipe(
      runInZone(ngZone),
      map(() => NgZone.isInAngularZone()),
    );

    expect(await firstValueFrom(sourceWithoutZone$)).toBe(false);
    expect(await firstValueFrom(sourceWithZone$)).toBe(true);
  });
});
