import { createAction, props } from '@ngrx/store';
import { PoiEntity } from './poi.models';

export const initPoi = createAction('[Poi Page] Init');

export const selectPoi = createAction('[Poi/API] Select Poi', props<{poiId: string|number}>());

export const visitPoi = createAction('[POI/API] Visit Poi', props<{poiId: string|number}>())

export const loadPoiSuccess = createAction(
  '[Poi/API] Load Poi Success',
  props<{ poi: PoiEntity[] }>()
);

export const loadPoiFailure = createAction(
  '[Poi/API] Load Poi Failure',
  props<{ error: any }>()
);
