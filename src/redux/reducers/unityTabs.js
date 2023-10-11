/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import _ from 'lodash';
import { UNITY_TABS } from '../../constants/types';
import { Map, fromJS, OrderedMap, setIn,set } from 'immutable'; // NOSONAR

const INITIAL_STATE = {
  fetching: false,
  allTabs: {},
  canSendEmail: false,
  tabRefresh: `Refresh${Date.now().toString()}`,
  isSetQuestionLoading: false,
  setQuestionError: undefined,
  filters: [
    {
      name: 'answered',
      displayName: 'Answered',
      group: 'answer',
      value: false
    },
    {
      name: 'unanswered',
      displayName: 'Unanswered',
      group: 'answer',
      value: false
    },
    {
      name: 'verificationRequired',
      displayName: 'Verification Required',
      group: 'verification',
      value: false
    },
    {
      name: 'responsible',
      displayName: 'Responsible',
      group: 'roles',
      value: false
    },
    {
      name: 'informed',
      displayName: 'Informed',
      group: 'roles',
      value: false
    }
  ]
};

const setUnityTab = (state, action) => {
  const { payload } = action;
  const data = _.groupBy(payload, 'TabID');
  return {
    ...state,
    fetching: false,
    allTabs: data
  };
};

const updateFilter = (state, action) => {
  const { payload } = action;
  const { name, value } = payload;
  const newFilters = state.filters.map(obj =>
    obj.name === name ? { ...obj, value } : obj
  );
  return { ...state, filters: newFilters };
};

const resetFilters = (state, action) => {
  return {
    ...state,
    filters: INITIAL_STATE.filters
  };
};

const resetSingleFilters = (state, action) => {
  const filter = state.filters.map(v => {
    v.value = false;
    return v;
  });
  return {
    ...state,
    filters: filter
  };
};

const resetTab = (state, action) => {
  return {
    ...state,
    allTabs: INITIAL_STATE.allTabs
  };
};

const customTabRefresh = (state, action) => {
  const { payload } = action;
  return {
    ...state,
    tabRefresh: payload
  };
};

const addNewFilter = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    filters: [...state.filters, ...payload]
  };
};

const actionMap = {
  [UNITY_TABS.FETCH_UNITY_TABS]: state => ({ ...state, fetching: true }),
  [UNITY_TABS.SET_UNITY_TABS]: setUnityTab,
  [UNITY_TABS.UPDATE_FILTERS]: updateFilter,
  [UNITY_TABS.RESET_FILTERS]: resetFilters,
  [UNITY_TABS.RESET_SINGLE_TAB_FILTERS]: resetSingleFilters,
  [UNITY_TABS.RESET_TAB]: resetTab,
  [UNITY_TABS.SET_TAB_REFRESH]: customTabRefresh,
  [UNITY_TABS.UPDATE_NEW_FILTER]: addNewFilter
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
