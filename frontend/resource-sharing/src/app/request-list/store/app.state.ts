import { ActionReducerMap } from '@ngrx/store';
import { requestsReducer, RequestsState } from '../store/request.reducer';

export interface AppState {
    requests: RequestsState;
}

export const appReducers: ActionReducerMap<AppState> = {
    requests: requestsReducer,
};
