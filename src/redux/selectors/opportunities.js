import { createSelector } from 'reselect';

const selectOpportunities = state => state.opportunities;

export const selectOpportunitiesList = createSelector(
  selectOpportunities,
  opportunitiesReducer => opportunitiesReducer.opportunities
);

export const selectOpportunitiesLoading = createSelector(
  selectOpportunities,
  opportunities => opportunities.loading
);

export const selectOpportunitiesFilters = createSelector(
  selectOpportunities,
  opportunities => opportunities.filters
);

export const selectOpportunitiesPage = createSelector(
  selectOpportunities,
  opportunities => opportunities.page
);

export const selectOpportunitiesItemsPerPage = createSelector(
  selectOpportunities,
  opportunities => opportunities.itemsPerPage
);

export const selectOpportunitiesTotal = createSelector(
  selectOpportunities,
  opportunities => opportunities.total
);
