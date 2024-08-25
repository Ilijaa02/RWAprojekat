import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResourceService } from '../resources.service';
import * as ResourcesActions from './resources.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ResourcesEffects {

    loadResources$ = createEffect(() => this.actions$.pipe(
        ofType(ResourcesActions.loadResources),
        mergeMap(() => this.resourceService.getAllResources()
            .pipe(
                map(resources => ResourcesActions.loadResourcesSuccess({ resources })),
                catchError(error => of(ResourcesActions.loadResourcesFailure({ error })))
            )
        )
    ));

    createResource$ = createEffect(() => this.actions$.pipe(
        ofType(ResourcesActions.createResource),
        mergeMap(action => this.resourceService.createResource(action.resource)
            .pipe(
                map(resource => ResourcesActions.createResourceSuccess({ resource })),
                catchError(error => of(ResourcesActions.createResourceFailure({ error })))
            )
        )
    ));

    deleteResource$ = createEffect(() => this.actions$.pipe(
        ofType(ResourcesActions.deleteResource),
        mergeMap(action => this.resourceService.deleteResource(action.resourceId)
            .pipe(
                map(() => ResourcesActions.deleteResourceSuccess({ resourceId: action.resourceId })),
                catchError(error => of(ResourcesActions.deleteResourceFailure({ error })))
            )
        )
    ));

    filterResourcesByType$ = createEffect(() => this.actions$.pipe(
        ofType(ResourcesActions.filterResourcesByType),
        mergeMap(action => this.resourceService.getResourcesByType(action.resourceType)
            .pipe(
                map(resources => ResourcesActions.filterResourcesByTypeSuccess({ resources })),
                catchError(error => of(ResourcesActions.filterResourcesByTypeFailure({ error })))
            )
        )
    ));

    constructor(
        private actions$: Actions,
        private resourceService: ResourceService
    ) { }
}
