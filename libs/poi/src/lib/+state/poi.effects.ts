/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, mergeMap, catchError } from 'rxjs';
import { PoiService } from '../poi.service';

import * as PoiActions from './poi.actions';
import { PoiEntity } from './poi.models';
import * as PoiFeature from './poi.reducer';

@Injectable()
export class PoiEffects {
  constructor(
    private readonly actions$: Actions,
    private poiService: PoiService
  ) {}

  @Effect()
  init$ = createEffect(() => this.actions$.pipe(
    ofType(PoiActions.initPoi),
    mergeMap(() => this.poiService.getAll().pipe(map(pois => PoiActions.loadPoiSuccess({poi: pois})))),
    catchError(async (error) => PoiActions.loadPoiFailure({ error })))
  )
}
