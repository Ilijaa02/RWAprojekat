import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ResourcesState } from './resources.reducer';
import { Resource } from '../resources.service';

const adapter: EntityAdapter<Resource> = createEntityAdapter<Resource>();

export const selectResourcesState = createFeatureSelector<ResourcesState>('resources');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors(selectResourcesState);

export const selectResourceError = createSelector(
    selectResourcesState,
    (state: ResourcesState) => state.error
);
