import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResourceService } from '../resources.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadResources, loadResourcesSuccess, loadResourcesFailure, deleteResource, deleteResourceSuccess, deleteResourceFailure } from './resources.actions';

// @Injectable()
// export class ResourceEffects {

//   constructor(
//     private actions$: Actions,
//     private resourceService: ResourceService
//   ) {}

//   // loadResources$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(loadResources),
//   //     switchMap(() =>
//   //       this.resourceService.getAllResources().pipe(
//   //         map(resources => loadResourcesSuccess({ resources })),
//   //         catchError(error => of(loadResourcesFailure({ error: error.message })))
//   //       )
//   //     )
//   //   )
//   // );

//   // deleteResource$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(deleteResource),
//   //     switchMap(action =>
//   //       this.resourceService.deleteResource(action.resourceId).pipe(
//   //         map(() => deleteResourceSuccess({ resourceId: action.resourceId })),
//   //         catchError(error => of(deleteResourceFailure({ error: error.message })))
//   //       )
//   //     )
//   //   )
//   // );
// }

export const loadResources$ = createEffect(
  (action$ = inject(Actions), resourceService = inject(ResourceService)) => {
    return action$.pipe(
      ofType(loadResources),
      switchMap(() =>
        resourceService.getAllResources().pipe(
          map((resources) => {
            console.log('ucitavanje', resources);
            return loadResourcesSuccess({ resources })
          }),
          catchError((err) => {
            return of(loadResourcesFailure({ error: err.message }))
          }
          )
        )
      )
    )
  },
  { functional: true }
)

export const deleteResource$ = createEffect(
  (actions$ = inject(Actions), resourceService = inject(ResourceService)) => {
    return actions$.pipe(
      ofType(deleteResource),
      switchMap(({ resourceId }) =>
        resourceService.deleteResource(resourceId).pipe(
          map(() => deleteResourceSuccess({ resourceId })),
          catchError(err => of(deleteResourceFailure({ error: err.message })))
        )
      )
    );
  },
  { functional: true }
);