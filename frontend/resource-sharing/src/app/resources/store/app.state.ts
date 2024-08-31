import { ActionReducerMap } from '@ngrx/store';
import { resourcesReducer, ResourcesState } from './resources.reducer';

export interface AppState {
  resources: ResourcesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  resources: resourcesReducer,
};
