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
  return { ...state };
};

const deleteApprovals = (state, action) => {
  return { ...state };
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
