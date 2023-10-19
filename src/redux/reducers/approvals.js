import { v4 as uuid } from 'uuid';
import { APPROVALS } from '../../constants/types';
import cloneDeep from 'lodash/cloneDeep';

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
  const { questionId, section } = payload;
  const approval = state.allApprovals;
  const result = approval.map(value => {
    if (
      section.sectionName === 'Approvals' &&
      value.ApprovalSectionTitle === section.approvalSectionName
    ) {
      if (section.direction === 'left') {
        value.ApprovalSectionLeftQuestions.push(questionId);
      } else {
        value.ApprovalSectionRightQuestions.push(questionId);
      }
    }
    return value;
  });
  return {
    ...state,

    allApprovals: result
  };
};

const deleteApprovalQuestion = (state, action) => {
  const { payload } = action;
  const { questionId, approvalSectionName } = payload;
  const approval = state.allApprovals;

  approval.forEach(value => {
    if (value.ApprovalSectionTitle === approvalSectionName) {
      value.ApprovalSectionLeftQuestions = value.ApprovalSectionLeftQuestions.filter(
        QuestionId => QuestionId !== questionId
      );
    }
  });
  return {
    ...state,
    allApprovals: approval
  };
};

const updateApprovalQuestion = (state, action) => {
  const { payload } = action;
  const { questionId, section } = payload;
  const approval = state.allApprovals;
  approval.forEach(value => {
    if (section.direction === 'left') {
      value.ApprovalSectionLeftQuestions = value.ApprovalSectionLeftQuestions.filter(
        QuestionId => QuestionId !== questionId
      );
    } else {
      value.ApprovalSectionRightQuestions = value.ApprovalSectionRightQuestions.filter(
        QuestionId => QuestionId !== questionId
      );
    }
  });

  const result = approval.map(value => {
    if (
      section.sectionName === 'Approvals' &&
      value.ApprovalSectionTitle === section.approvalSectionName
    ) {
      if (section.direction === 'left') {
        value.ApprovalSectionLeftQuestions.push(questionId);
      } else {
        value.ApprovalSectionRightQuestions.push(questionId);
      }
    }
    return value;
  });
  return {
    ...state,
    allApprovals: result
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
      const leftSideQuestion = data.ApprovalSectionLeftQuestions.filter(
        val => !val.section.approvalSectionName
      ).map(value => value.questionId);
      approval.ApprovalSectionLeftQuestions = leftSideQuestion;
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
  const { sectionId, proposalQuestions } = action.payload;
  const allApprovals = cloneDeep(state.allApprovals);
  const archiveSection = allApprovals.find(
    value => value.ApprovalSectionId === sectionId
  );
  const archiveData = archiveSection.ArchivedData;
  const lastData = archiveData[archiveData.length - 1];
  const leftcustomQuestionID = lastData.section_left_questions
    .filter(val => val.section.approvalSectionName)
    .map(id => id.questionId);

  let questionHash = {};
  proposalQuestions.forEach(question => {
    if (question && question.section?.approvalSectionName) {
      questionHash[question.questionId] = question.section;
    }
  });

  const modifiedApprovals = state.allApprovals.map(approval => {
    if (approval.ApprovalSectionId === sectionId) {
      approval.ApprovalSectionLeftQuestions = approval.ApprovalSectionLeftQuestions.filter(
        id => !questionHash[id]
      );
      approval.ApprovalSectionLeftQuestions = [
        ...approval.ApprovalSectionLeftQuestions,
        ...leftcustomQuestionID
      ];
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
  [APPROVALS.SET_APPROVAL_QUESTION_APPROVALS_TAB]: setApprovalQuestion,
  [APPROVALS.UPDATE_APPROVAL_QUESTION_CUSTOM_TAB]: updateApprovalQuestion,
  [APPROVALS.DELETE_APPROVAL_QUESTION_CUSTOM_TAB]: deleteApprovalQuestion
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
