import { API, REDUX_TYPES } from '../../constants';
import { getUserEmail } from '../../SessionHandler';
import { getSelectedBid } from '../../redux/selectors';
import notificationAPI from '../../api/notification';

const {
  SET_NOTIFICATIONS,
  SET_IS_LOADING,
  UPDATE_SEEN,
  UPDATE_SEEN_BATCH
} = REDUX_TYPES.NOTIFICATION;

export const setNotification = () => {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      const notifications = await notificationAPI.fetchNotifications();
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: { data: notifications }
      });
      dispatch({ type: SET_IS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_IS_LOADING, payload: false });
      console.error('Error fetching notifications', error);
    }
  };
};

export const setSeenOne = (notificationId: string) => {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      await notificationAPI.updateSeenOne(notificationId);
      dispatch({
        type: UPDATE_SEEN,
        payload: { notificationId }
      });
      dispatch({ type: SET_IS_LOADING, payload: false });
      await setNotification();
    } catch (error) {
      dispatch({ type: SET_IS_LOADING, payload: false });
      console.error('Error updating notification seen status', error);
    }
  };
};

export const setSeenBatch = (notificationIds: Array<string>) => {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      await notificationAPI.updateSeenBatch(notificationIds);
      dispatch({
        type: UPDATE_SEEN_BATCH,
        payload: { notificationIds }
      });
      dispatch({ type: SET_IS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_IS_LOADING, payload: false });
      console.error('Error updating notification seen status batch', error);
    }
  };
};
