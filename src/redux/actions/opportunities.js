import { OPPORTUNITIES } from '../../constants/types';
import OpportunitiesApi from '../../api/opportunity';
import {
  selectOpportunitiesFilters,
  selectOpportunitiesItemsPerPage,
  selectOpportunitiesPage
} from '../selectors/opportunities';
import { formatProposal } from './proposals-actions';
import { selectCustomNameMap, selectFavourites } from '../selectors/sso-auth';
import { isEqual } from 'lodash';

export const setOpportunities = (opportunities = []) => {
  return {
    type: OPPORTUNITIES.SET_OPPORTUNITIES,
    payload: opportunities
  };
};

export const setLoading = (loading = false) => {
  return {
    type: OPPORTUNITIES.SET_LOADING,
    payload: loading
  };
};

export function updateFilters(filters = {}) {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const currentFilters = selectOpportunitiesFilters(state);
      if (!isEqual(currentFilters, filters)) {
        await dispatch({
          type: OPPORTUNITIES.SET_FILTERS,
          payload: filters
        });
        await dispatch({
          type: OPPORTUNITIES.SET_PAGE,
          payload: 1
        });
        await dispatch(fetchOpportunities());
      }
    } catch (e) {
    } finally {
    }
  };
}

export function updatePage(page = 1) {
  return async dispatch => {
    await dispatch({
      type: OPPORTUNITIES.SET_PAGE,
      payload: page
    });
    await dispatch(fetchOpportunities());
  };
}

export const setTotalOpportunities = (total = 0) => {
  return {
    type: OPPORTUNITIES.SET_TOTAL,
    payload: total
  };
};

export function updateItemsPerPage(itemsPerPage = 15) {
  return async dispatch => {
    await dispatch({
      type: OPPORTUNITIES.SET_ITEMS_PER_PAGE,
      payload: itemsPerPage
    });
    await dispatch({
      type: OPPORTUNITIES.SET_PAGE,
      payload: 1
    });
    await dispatch(fetchOpportunities());
  };
}

export function fetchOpportunities() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const state = getState();
      const page = selectOpportunitiesPage(state);
      const rows = selectOpportunitiesItemsPerPage(state);
      const filters = selectOpportunitiesFilters(state);
      const favourites = selectFavourites(state).toJS();
      const customNameMap = selectCustomNameMap(state).toJS();

      const favouritesMap = favourites.reduce((favMap, fav) => {
        favMap[fav] = true;
        return favMap;
      }, {});

      const response = await OpportunitiesApi.getOpportunities(
        page * rows - rows,
        rows,
        filters
      );
      if (response.status === 200) {
        dispatch(setTotalOpportunities(response.data.count));
        dispatch(
          setOpportunities(
            response.data.data.map(opportunity =>
              formatProposal(
                opportunity.latestProposal,
                favouritesMap,
                customNameMap
              )
            )
          )
        );
      } else {
        dispatch(setTotalOpportunities(0));
        dispatch(setOpportunities([]));
      }
    } catch (e) {
      console.error(e);
      dispatch(setTotalOpportunities(0));
      dispatch(setOpportunities([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
