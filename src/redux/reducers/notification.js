import cloneDeep from 'lodash/cloneDeep';
import { REDUX_TYPES } from '../../constants';

const {
  SET_NOTIFICATIONS,
  SET_IS_LOADING,
  UPDATE_SEEN,
  UPDATE_SEEN_BATCH
} = REDUX_TYPES.NOTIFICATION;

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
const updateSeen = (state, actions) => {
  const notificationId = actions.payload.notificationId;
  const allNotification = cloneDeep(state.notifications);
  allNotification.forEach(item => {
    if (item.id === notificationId) {
      item.read = true;
    }
  });
  return { ...state, notifications: allNotification };
};

const updateSeenBatch = (state, actions) => {
  const allNotification = cloneDeep(state.notifications);
  allNotification.forEach(item => {
    item.read = true;
  });
  return { ...state, notifications: allNotification };
};

const actionMap = {
  [SET_NOTIFICATIONS]: setNotifications,
  [SET_IS_LOADING]: setIsLoading,
  [UPDATE_SEEN]: updateSeen,
  [UPDATE_SEEN_BATCH]: updateSeenBatch
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
