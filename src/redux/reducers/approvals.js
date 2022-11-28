import isEmpty from 'lodash/isEmpty';
import { v4 as uuid } from 'uuid';
import { APPROVALS } from '../../constants/types';

const INITIAL_STATE = {
  allApprovals: [],
  quesHashData: {},
  isLoading: false
};

const setApprovals = (state, action) => {
  return { ...state, allApprovals: action.payload };
};

const setQuesHash = (state, action) => {
  return { ...state, quesHashData: action.payload };
};

const setLoading = (state, actions) => {
  return { ...state, isLoading: actions.payload };
};

const duplicateApproval = (state, action) => {
  const { sectionId, proposalId, quesHashData } = action.payload;
  console.log({ quesHashData });

  const modifiedApprovals = state.allApprovals.map(approval => {
    if (approval.ApprovalSectionId === sectionId) {
      const newFreezedData = {
        id: uuid(),
        proposal_id: proposalId,
        section_id: approval.ApprovalSectionId,
        section_title: approval.ApprovalSectionTitle,
        section_order: approval.ApprovalSectionOrder,
        section_left_questions: approval.ApprovalSectionLeftQuestions.map(
          i => quesHashData[i]
        ).filter(i => !isEmpty(i)),
        section_right_questions: approval.ApprovalSectionRightQuestions.map(
          i => quesHashData[i]
        ).filter(i => !isEmpty(i))
      };

      return {
        ...approval,
        ArchivedData: approval.ArchivedData.concat([newFreezedData])
      };
    }
    return approval;
  });

  console.log({ modifiedApprovals });

  return { ...state, allApprovals: modifiedApprovals };
};

const deleteApprovals = (state, action) => {
  const { payload: sectionId } = action;

  const modifiedApprovals = state.allApprovals.map(approval => {
    if (approval.ApprovalSectionId === sectionId) {
      const [, ...rest] = approval.ArchivedData;
      return { ...approval, ArchivedData: rest };
    }
    return approval;
  });

  return { ...state, allApprovals: modifiedApprovals };
};

const actionMap = {
  [APPROVALS.SET_APPROVALS]: setApprovals,
  [APPROVALS.SET_QUES_HASH]: setQuesHash,
  [APPROVALS.SET_LOADING]: setLoading,
  [APPROVALS.DUPLICATE_APPROVALS]: duplicateApproval,
  [APPROVALS.DELETE_APPROVALS]: deleteApprovals
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
