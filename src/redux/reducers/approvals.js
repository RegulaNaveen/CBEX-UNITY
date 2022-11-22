import { APPROVALS } from '../../constants/types';

const INITIAL_STATE = {
  allApprovals: [],
  isLoading: false
};

const setApprovals = (state, action) => {
  return { ...state, allApprovals: action.payload };
};

const setLoading = (state, actions) => {
  return { ...state, isLoading: actions.payload };
};

const actionMap = {
  [APPROVALS.SET_APPROVALS]: setApprovals,
  [APPROVALS.SET_LOADING]: setLoading
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
