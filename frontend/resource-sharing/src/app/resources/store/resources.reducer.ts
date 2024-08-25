import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Resource } from '../resources.service';
import * as ResourcesActions from './resources.actions';

export interface ResourcesState extends EntityState<Resource> {
    error: any;
}

export const adapter: EntityAdapter<Resource> = createEntityAdapter<Resource>();

export const initialState: ResourcesState = adapter.getInitialState({
    error: null
});

export const resourcesReducer = createReducer(
    initialState,
    on(ResourcesActions.loadResourcesSuccess, (state, { resources }) =>
        adapter.setAll(resources, state)
    ),
    on(ResourcesActions.loadResourcesFailure, (state, { error }) => ({ ...state, error })),
    on(ResourcesActions.createResourceSuccess, (state, { resource }) =>
        adapter.addOne(resource, state)
    ),
    on(ResourcesActions.createResourceFailure, (state, { error }) => ({ ...state, error })),
    on(ResourcesActions.deleteResourceSuccess, (state, { resourceId }) =>
        adapter.removeOne(resourceId, state)
    ),
    on(ResourcesActions.deleteResourceFailure, (state, { error }) => ({ ...state, error })),
    on(ResourcesActions.filterResourcesByTypeSuccess, (state, { resources }) =>
        adapter.setAll(resources, state)
    ),
    on(ResourcesActions.filterResourcesByTypeFailure, (state, { error }) => ({ ...state, error }))
);

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
