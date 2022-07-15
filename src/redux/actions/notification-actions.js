import { API, REDUX_TYPES } from '../../constants';
import { getUserEmail } from '../../SessionHandler';
import { getSelectedBid } from '../../redux/selectors';
import notificationAPI from '../../api/notification';

const { SET_NOTIFICATIONS, SET_IS_LOADING } = REDUX_TYPES.NOTIFICATION;

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
