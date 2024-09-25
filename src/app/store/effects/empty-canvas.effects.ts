import { inject, Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmptyCanvasService } from '@features/empty-canvas/services/empty-canvas.service';
import { loadData, loadDataSuccess, storeData } from '@store/actions/empty-canvas.actions';


@Injectable()
export class EmptyCanvasEffects {

  private readonly _actions$ = inject(Actions);
  private readonly _emptyCanvasService = inject(EmptyCanvasService);

  load$ = createEffect(() => (
    this._actions$.pipe(
      ofType(loadData),
      exhaustMap(() => this._emptyCanvasService.load()
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
      exhaustMap(({ payload }) => this._emptyCanvasService.store(payload)
        .pipe(
          map(data => loadDataSuccess({ data } as any)),
          catchError(() => EMPTY)
        )
      )
    )
  ));
}