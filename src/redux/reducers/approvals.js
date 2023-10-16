import { v4 as uuid } from 'uuid';
import { APPROVALS } from '../../constants/types';

const INITIAL_STATE = {
  fetching: false,
  allApprovals: [],
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

const setApprovals = (state, action) => {
  const { payload } = action;
  return {
    ...state,
    fetching: false,
    allApprovals: payload.map(i => ({
      ...i,
      key: `${i.ApprovalSectionId}-${Date.now()}`,
      ArchivedData: i.ArchivedData?.reverse() || []
    }))
  };
};
const setApprovalQuestion = (state, action) => {
  const { payload } = action;
  const tabs = state.allApprovals;
  const { questionId, section } = payload;
  const selectTab = tabs[section.ApprovalSectionTitle];
  const tabIndex = selectTab.findIndex(
    value => value.ApprovalSectionTitle === section.ApprovalSectionTitle
  );
  selectTab[tabIndex].ApprovalSectionLeftQuestions.push(questionId);
  tabs[section.ApprovalSectionTitle] = selectTab;
  return {
    ...state,
    allApprovals: tabs
  };
};

const deleteCustomQuestion = (state, action) => {
  const { payload } = action;
  const tabs = state.allApprovals;
  const { questionId, ApprovalSectionTitle } = payload;
  const selectTab = tabs[ApprovalSectionTitle];
  const tabIndex = selectTab.findIndex(
    value => value.ApprovalSectionTitle === ApprovalSectionTitle
  );
  const updatedData = selectTab[tabIndex].UnityTabSectionQuestions.filter(
    value => value !== questionId
  );
  selectTab[tabIndex].UnityTabSectionQuestions = updatedData;
  tabs[tabId] = selectTab;
  return {
    ...state,
    allTabs: tabs
  };
};

const updateCustomQuestion = (state, action) => {
  const { payload } = action;
  const tabs = state.allTabs;
  const { questionId, section } = payload;
  const selectTab = tabs[section.tabID];
  selectTab.forEach(value => {
    value.UnityTabSectionQuestions = value.UnityTabSectionQuestions.filter(
      questionID => questionID !== questionId
    );
  });
  const tabIndex = selectTab.findIndex(
    value => value.UnityTabSectionTitle === section.sectionName
  );
  if (tabIndex > -1) {
    selectTab[tabIndex].UnityTabSectionQuestions.push(questionId);
    tabs[section.tabID] = selectTab;
  }
  return {
    ...state,
    allTabs: tabs
  };
};



const duplicateApproval = (state, action) => {
  const { sectionId, proposalId, data } = action.payload;

  const modifiedApprovals = state.allApprovals.map(approval => {
    if (approval.ApprovalSectionId === sectionId) {
      const newFreezedData = {
        id: uuid(),
        proposal_id: proposalId,
        section_id: data.ApprovalSectionId,
        section_title: data.ApprovalSectionTitle,
        section_order: data.ApprovalSectionOrder,
        section_left_questions: data.ApprovalSectionLeftQuestions,
        section_right_questions: data.ApprovalSectionRightQuestions
      };

      return {
        ...approval,
        key: `${approval.ApprovalSectionId}-${Date.now()}`,
        ArchivedData: approval.ArchivedData.concat([newFreezedData])
      };
    }
    return approval;
  });

  return { ...state, allApprovals: modifiedApprovals };
};

const deleteApprovals = (state, action) => {
  const { payload: sectionId } = action;

  const modifiedApprovals = state.allApprovals.map(approval => {
    if (approval.ApprovalSectionId === sectionId) {
      const removedLastData = approval.ArchivedData.slice(0, -1);
      return {
        ...approval,
        key: `${approval.ApprovalSectionId}-${Date.now()}`,
        ArchivedData: removedLastData
      };
    }
    return approval;
  });

  return { ...state, allApprovals: modifiedApprovals };
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
  [APPROVALS.FETCH_APPROVALS]: state => ({ ...state, fetching: true }),
  [APPROVALS.SET_APPROVALS]: setApprovals,
  [APPROVALS.DUPLICATE_APPROVALS]: duplicateApproval,
  [APPROVALS.DELETE_APPROVALS]: deleteApprovals,
  [APPROVALS.SET_CAN_SEND_EMAIL_IN_APPROVALS]: setCanSendEmail,
  [APPROVALS.UPDATE_FILTERS]: updateFilter,
  [APPROVALS.RESET_FILTERS]: resetFilters,
  [APPROVALS.SET_APPROVAL_QUESTION_APPROVALS_TAB]:setApprovalQuestion
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
