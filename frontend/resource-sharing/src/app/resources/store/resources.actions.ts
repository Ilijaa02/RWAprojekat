import { createAction, props } from '@ngrx/store';
import { Resource, ResourceType } from '../resources.service';

export const loadResources = createAction('[Resources] Load Resources');
export const loadResourcesSuccess = createAction('[Resources] Load Resources Success', props<{ resources: Resource[] }>());
export const loadResourcesFailure = createAction('[Resources] Load Resources Failure', props<{ error: any }>());

export const createResource = createAction('[Resources] Create Resource', props<{ resource: Resource }>());
export const createResourceSuccess = createAction('[Resources] Create Resource Success', props<{ resource: Resource }>());
export const createResourceFailure = createAction('[Resources] Create Resource Failure', props<{ error: any }>());

export const deleteResource = createAction('[Resources] Delete Resource', props<{ resourceId: number }>());
export const deleteResourceSuccess = createAction('[Resources] Delete Resource Success', props<{ resourceId: number }>());
export const deleteResourceFailure = createAction('[Resources] Delete Resource Failure', props<{ error: any }>());

export const filterResourcesByType = createAction('[Resources] Filter Resources By Type', props<{ resourceType: ResourceType }>());
export const filterResourcesByTypeSuccess = createAction('[Resources] Filter Resources By Type Success', props<{ resources: Resource[] }>());
export const filterResourcesByTypeFailure = createAction('[Resources] Filter Resources By Type Failure', props<{ error: any }>());
