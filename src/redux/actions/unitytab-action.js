import { DEFAULT, SEARCH as SEARCH_CONSTANTS } from '../../constants/app';
import { UNITY_TABS, SEARCH } from '../../constants/types';
import { getErrorMessage } from '../../utils/utils';
import { getQuestionsFilters } from '../selectors';
import { selectQuery } from '../selectors/search';
import { doSearchAction } from './search-actions';

export const setAllUnityTab = data => ({
  type: UNITY_TABS.SET_UNITY_TABS,
  payload: data
});

export const updateNewFilters = data => ({
  type: UNITY_TABS.UPDATE_NEW_FILTER,
  payload: data
});

export const updateFilters = (name, value) => {
  return async (dispatch, getState) => {
    const state = getState();
    const searchQuery = selectQuery(state);
    const questionsFilter = getQuestionsFilters(state);
    const unityTabFilters = state.unitytab.filters;
    if (searchQuery !== null && searchQuery.length >= 3 && value) {
      let totalFiltersApplied = 0;
      questionsFilter.entrySeq().forEach(([groupName, group]) => {
        group
          .entrySeq()
          .filter(value => value[0] !== 'logic')
          .forEach(([key, filter]) => {
            if (filter.get('checked')) {
              totalFiltersApplied++;
            }
          });
      });
      totalFiltersApplied += unityTabFilters.filter(item => item.value).length;
      if (totalFiltersApplied === 0) {
        dispatch({
          type: SEARCH.SHOW_MODAL,
          payload: {
            modalTitle: SEARCH_CONSTANTS.TITLE_SEARCH_ACTIVE,
            modalContent: SEARCH_CONSTANTS.CONTENT_SEARCH_ACTIVE
          }
        });
      }
    }
    await dispatch({
      type: UNITY_TABS.UPDATE_FILTERS,
      payload: { name, value }
    });
    // if (searchQuery !== null && searchQuery.length >= 3) {
    //   dispatch(doSearchAction());
    // }
  };
};

export function resetFiltersAction() {
  return async (dispatch, getState) => {
    const searchQuery = selectQuery(getState());
    dispatch({ type: UNITY_TABS.RESET_FILTERS });
    // if (searchQuery !== null && searchQuery.length >= 3) {
    //   dispatch(doSearchAction());
    // }
  };
}
