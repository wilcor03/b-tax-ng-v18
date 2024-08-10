import { inject, Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadData, loadDataSuccess, storeData } from '@store/actions/sumaria.actions';
import { SumariaService } from '@features/sumaria/services/sumaria.service';

@Injectable()
export class SumariaEffects {
  
  private readonly _actions$ = inject(Actions);
  private readonly _sumariaService = inject(SumariaService);

  load$ = createEffect(() => (
    this._actions$.pipe(
      ofType(loadData),
      exhaustMap(() => this._sumariaService.load()
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
      exhaustMap(({ payload }) => this._sumariaService.store(payload)
        .pipe(
          map(data => loadDataSuccess({ data } as any)),
          catchError(() => EMPTY)
        )
      )
    )
  ));
}