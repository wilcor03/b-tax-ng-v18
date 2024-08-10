import { inject, Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadData, loadDataSuccess, storeData } from '../actions/bce.actions';
import { BceService } from '@features/bce/services/bce.service';

@Injectable()
export class BceEffects {
  
  private readonly _actions$ = inject(Actions);
  private readonly _bceService = inject(BceService);

  load$ = createEffect(() => (
    this._actions$.pipe(
      ofType(loadData),
      exhaustMap(() => this._bceService.load()
        .pipe(
          map(data => loadDataSuccess({ data } as any)),
          catchError(() => EMPTY)
        )
      )
    )
  ));

  store$ = createEffect(() => (
    this._actions$.pipe(
      ofType(storeData),
      exhaustMap(({ payload }) => this._bceService.store(payload)
        .pipe(
          map(data => loadDataSuccess({ data } as any)),
          catchError(() => EMPTY)
        )
      )
    )
  ));
}