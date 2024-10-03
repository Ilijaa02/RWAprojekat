import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Request } from '../../create-request/request.service';
import * as RequestActions from '../store/request.actions';

export interface RequestsState extends EntityState<Request> {
    error: string | null;
}

export const adapter: EntityAdapter<Request> = createEntityAdapter<Request>();

export const initialState: RequestsState = adapter.getInitialState({
    error: null,
});

export const requestsReducer = createReducer(
    initialState,
    on(RequestActions.loadRequestsForUserSuccess, (state, { requests }) =>
        adapter.setAll(requests, state)
    ),
    on(RequestActions.loadRequestsForUserFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(RequestActions.deleteRequestSuccess, (state, { requestId }) =>
        adapter.removeOne(requestId, state)
    )
);
