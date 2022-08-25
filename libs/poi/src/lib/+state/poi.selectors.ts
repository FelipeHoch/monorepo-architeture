import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POI_FEATURE_KEY, PoiState, poiAdapter } from './poi.reducer';

// Lookup the 'Poi' feature state managed by NgRx
export const getPoiState = createFeatureSelector<PoiState>(POI_FEATURE_KEY);

const { selectAll, selectEntities } = poiAdapter.getSelectors();

export const getPoiLoaded = createSelector(
  getPoiState,
  (state: PoiState) => state.loaded
);

export const getPoiError = createSelector(
  getPoiState,
  (state: PoiState) => state.error
);

export const getAllPoi = createSelector(getPoiState, (state: PoiState) =>
  selectAll(state)
);

export const getPoiEntities = createSelector(getPoiState, (state: PoiState) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getPoiState,
  (state: PoiState) => state.selectedId
);

export const getSelected = createSelector(
  getPoiEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
