import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { UNITY_TABS } from '../../constants/types';

const INITIAL_STATE = {
  fetching: false,
  allTabs: [],
  canSendEmail: false,
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

const duplicateUnityTab = (state, action) => {
  const { sectionId, proposalId, data } = action.payload;

  const modifiedUnityTab = state.allTabs.map(tab => {
    if (tab.ApprovalSectionId === sectionId) {
      const newFreezedData = {
        id: uuid(),
        proposal_id: proposalId,
        section_id: data.UnityTabSectionId,
        section_title: data.UnityTabSectionTitle,
        section_order: data.UnityTabSectionOrder,
        section_questions: data.UnityTabSectionQuestions
      };

      return {
        ...tab,
        ArchivedData: tab.ArchivedData.concat([newFreezedData])
      };
    }
    return tab;
  });

  return { ...state, allTabs: modifiedUnityTab };
};

const deleteUnityTab = (state, action) => {
  const { payload: sectionId } = action;

  const modifiedUnityTab = state.allTabs.map(tab => {
    if (tab.UnityTabSectionId === sectionId) {
      const removedLastData = tab.ArchivedData.slice(0, -1);
      return { ...tab, ArchivedData: removedLastData };
    }
    return tab;
  });

  return { ...state, allTabs: modifiedUnityTab };
};

const setCanSendEmail = (state, action) => {
  return { ...state, canSendEmail: action.payload };
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

const actionMap = {
  [UNITY_TABS.FETCH_UNITY_TABS]: state => ({ ...state, fetching: true }),
  [UNITY_TABS.SET_UNITY_TABS]: setUnityTab,
  [UNITY_TABS.DUPLICATE_UNITY_TABS]: duplicateUnityTab,
  [UNITY_TABS.DELETE_UNITY_TABS]: deleteUnityTab,
  [UNITY_TABS.SET_CAN_SEND_EMAIL_IN_UNITY_TABS]: setCanSendEmail,
  [UNITY_TABS.UPDATE_FILTERS]: updateFilter,
  [UNITY_TABS.RESET_FILTERS]: resetFilters
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
