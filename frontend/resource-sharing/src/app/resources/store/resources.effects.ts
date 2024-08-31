import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResourceService } from '../resources.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadResources, loadResourcesSuccess, loadResourcesFailure, deleteResource, deleteResourceSuccess, deleteResourceFailure } from './resources.actions';

@Injectable()
export class ResourceEffects {

  constructor(
    private actions$: Actions,
    private resourceService: ResourceService
  ) {}

  loadResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadResources),
      switchMap(() =>
        this.resourceService.getAllResources().pipe(
          map(resources => loadResourcesSuccess({ resources })),
          catchError(error => of(loadResourcesFailure({ error: error.message })))
        )
      )
    )
  );

  deleteResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteResource),
      switchMap(action =>
        this.resourceService.deleteResource(action.resourceId).pipe(
          map(() => deleteResourceSuccess({ resourceId: action.resourceId })),
          catchError(error => of(deleteResourceFailure({ error: error.message })))
        )
      )
    )
  );
}
