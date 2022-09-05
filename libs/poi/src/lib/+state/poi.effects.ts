/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError, EMPTY, tap } from 'rxjs';
import { PoiService } from '../poi.service';

import * as PoiActions from './poi.actions';

@Injectable()
export class PoiEffects {
  constructor(
    private readonly actions$: Actions,
    private poiService: PoiService
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(PoiActions.initPoi),
    mergeMap(() => this.poiService.getAll().pipe(map(pois => PoiActions.loadPoiSuccess({poi: pois})))),
    catchError(async (error) => PoiActions.loadPoiFailure({ error })))
  )

  @Effect({dispatch: false})
  visit$ = this.actions$.pipe(
    ofType(PoiActions.visitPoi),
    tap(action => {
      const stat = localStorage.getItem('tour-' + action.poiId);

      const total = stat ? Number(stat) + 1 : 1;

      localStorage.setItem('tour-' + action.poiId, total.toString());

      return EMPTY;
    })
    )
  
}

