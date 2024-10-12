import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Resource } from '../resources.service';
import * as ResourceActions from './resources.actions';

export interface ResourcesState extends EntityState<Resource> {
  selectedResourceType: string | null;
  error: string | null;
}

export const adapter: EntityAdapter<Resource> = createEntityAdapter<Resource>();

export const initialState: ResourcesState = adapter.getInitialState({
  selectedResourceType: null,
  error: null,
});

export const resourcesReducer = createReducer(
  initialState,
  on(ResourceActions.loadResourcesSuccess, (state, { resources }) =>
    adapter.setAll(resources, state)
  ),
  on(ResourceActions.loadSortedResourcesByRatingSuccess, (state, { resources }) =>
    adapter.setAll(resources, state)
  ),
  on(ResourceActions.loadResourcesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ResourceActions.addResourceSuccess, (state, { resource }) =>
    adapter.addOne(resource, state)
  ),
  on(ResourceActions.deleteResourceSuccess, (state, { resourceId }) =>
    adapter.removeOne(resourceId, state)
  ),
  on(ResourceActions.filterResourcesByType, (state, { resourceType }) => ({
    ...state,
    selectedResourceType: resourceType,
  }))
);
