import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RequestService } from '../../create-request/request.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadRequestsForUser, loadRequestsForUserSuccess, loadRequestsForUserFailure, deleteRequest, deleteRequestSuccess, deleteRequestFailure } from '../store/request.actions';

@Injectable()
export class RequestEffects {

    loadRequestsForUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRequestsForUser),
            switchMap(({ username }) =>
                this.requestService.getRequestsForUser(username).pipe(
                    map((requests) => loadRequestsForUserSuccess({ requests })),
                    catchError((error) => of(loadRequestsForUserFailure({ error: error.message })))
                )
            )
        )
    );

    deleteRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRequest),
            switchMap(({ requestId }) =>
                this.requestService.deleteRequest(requestId).pipe(
                    map(() => deleteRequestSuccess({ requestId })),
                    catchError((error) => of(deleteRequestFailure({ error: error.message })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private requestService: RequestService
    ) { }
}
