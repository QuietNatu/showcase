import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NatuCardService {
  readonly isDismissable$: Signal<boolean>;
  readonly dismiss$: Observable<void>;

  private readonly isDismissableSignal$ = signal(false);
  private readonly dismissSubject$ = new Subject<void>();

  constructor() {
    this.isDismissable$ = this.isDismissableSignal$.asReadonly();
    this.dismiss$ = this.dismissSubject$.asObservable();
  }

  setIsDismissable(isDismissable: boolean) {
    this.isDismissableSignal$.set(isDismissable);
  }

  dismiss() {
    this.dismissSubject$.next();
  }
}
