import { v4 as uuid } from 'uuid';
import { APPROVALS } from '../../constants/types';

const INITIAL_STATE = {
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
    allApprovals: payload.map(i => ({
      ...i,
      ArchivedData: i.ArchivedData?.reverse() || []
    }))
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
      return { ...approval, ArchivedData: removedLastData };
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

const actionMap = {
  [APPROVALS.SET_APPROVALS]: setApprovals,
  [APPROVALS.DUPLICATE_APPROVALS]: duplicateApproval,
  [APPROVALS.DELETE_APPROVALS]: deleteApprovals,
  [APPROVALS.SET_CAN_SEND_EMAIL_IN_APPROVALS]: setCanSendEmail,
  [APPROVALS.UPDATE_FILTERS]: updateFilter
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
