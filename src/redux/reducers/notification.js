import { REDUX_TYPES } from '../../constants';

const { SET_NOTIFICATIONS, SET_IS_LOADING } = REDUX_TYPES.NOTIFICATION;

const INITIAL_STATE = {
  notifications: [],
  isLoading: false
};

const setNotifications = (state, action) => {
  const {
    payload: { data }
  } = action;
  return { ...state, notifications: data };
};

const setIsLoading = (state, actions) => {
  const value = actions.payload;
  return { ...state, isLoading: value };
};

const actionMap = {
  [SET_NOTIFICATIONS]: setNotifications,
  [SET_IS_LOADING]: setIsLoading
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
