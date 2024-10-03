import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, RequestsState } from '../store/request.reducer';

export const selectRequestsState = createFeatureSelector<RequestsState>('requests');

export const {
  selectAll: selectAllRequests,
  selectEntities: selectRequestEntities,
  selectIds: selectRequestIds,
  selectTotal: selectRequestTotal,
} = adapter.getSelectors(selectRequestsState);

export const selectRequestById = (id: number) =>
  createSelector(selectRequestEntities, entities => entities[id]);
