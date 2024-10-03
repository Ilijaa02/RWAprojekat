import { createAction, props } from '@ngrx/store';
import { Request } from '../../create-request/request.service';

export const loadRequestsForUser = createAction(
    '[Request] Load Requests For User',
    props<{ username: string }>()
);
export const loadRequestsForUserSuccess = createAction(
    '[Request] Load Requests For User Success',
    props<{ requests: Request[] }>()
);
export const loadRequestsForUserFailure = createAction(
    '[Request] Load Requests For User Failure',
    props<{ error: string }>()
);

export const deleteRequest = createAction(
    '[Request] Delete Request',
    props<{ requestId: number }>()
);
export const deleteRequestSuccess = createAction(
    '[Request] Delete Request Success',
    props<{ requestId: number }>()
);
export const deleteRequestFailure = createAction(
    '[Request] Delete Request Failure',
    props<{ error: string }>()
);
