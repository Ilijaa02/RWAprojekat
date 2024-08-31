import { createAction, props } from '@ngrx/store';
import { Resource, ResourceType } from '../resources.service';

export const loadResources = createAction('[Resource] Load Resources');
export const loadResourcesSuccess = createAction(
    '[Resource] Load Resources Success',
    props<{ resources: Resource[] }>()
);
export const loadResourcesFailure = createAction(
    '[Resource] Load Resources Failure',
    props<{ error: string }>()
);

export const addResource = createAction(
    '[Resource] Add Resource',
    props<{ resource: Resource }>()
);
export const addResourceSuccess = createAction(
    '[Resource] Add Resource Success',
    props<{ resource: Resource }>()
);
export const addResourceFailure = createAction(
    '[Resource] Add Resource Failure',
    props<{ error: string }>()
);

export const deleteResource = createAction(
    '[Resource] Delete Resource',
    props<{ resourceId: number }>()
);
export const deleteResourceSuccess = createAction(
    '[Resource] Delete Resource Success',
    props<{ resourceId: number }>()
);
export const deleteResourceFailure = createAction(
    '[Resource] Delete Resource Failure',
    props<{ error: string }>()
);

export const filterResourcesByType = createAction(
    '[Resource] Filter Resources By Type',
    props<{ resourceType: ResourceType }>()
);
