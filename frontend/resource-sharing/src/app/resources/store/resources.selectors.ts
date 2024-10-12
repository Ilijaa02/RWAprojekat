import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ResourcesState } from './resources.reducer';
import { Resource, ResourceType } from '../resources.service';

interface FilterProps {
  type: ResourceType | '';
}

export const selectResourcesState = createFeatureSelector<ResourcesState>('resources');

export const {
  selectAll: selectAllResources,
  selectEntities: selectResourceEntities,
  selectIds: selectResourceIds,
  selectTotal: selectResourceTotal,
} = adapter.getSelectors(selectResourcesState);

export const selectResourceById = (id: number) =>
  createSelector(selectResourceEntities, entities => entities[id]);

export const selectFilteredResources = createSelector(
  selectAllResources,
  (resources: Resource[], props: FilterProps) => {
    if (!props.type) {
      return resources;
    }
    return resources.filter(resource => resource.type === props.type);
  }
);

export const selectSortedResourcesByRating = createSelector(
  selectAllResources,
  (resources: Resource[]) => resources.sort((a, b) => b.user.rating - a.user.rating)
);
