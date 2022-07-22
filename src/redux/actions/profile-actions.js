import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import {
  fetchUserPreferenceApi,
  updateUserPreferenceApi
} from '../../api/profile';

// import { getUserEmail } from '../../SessionHandler';
// import { getSelectedBid } from '../../redux/selectors';

const {
  FETCH_USER_PREFERENCE,
  FETCH_USER_PREFERENCE_DONE,
  UPDATE_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE_DONE,
  ERROR_FETCHING_USER_PREFERENCE,
  ERROR_UPDATING_USER_PREFERENCE
} = REDUX_TYPES.PROFILE;

export function fetchUserPreference() {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_USER_PREFERENCE });
      const data = await fetchUserPreferenceApi();
      dispatch({
        type: FETCH_USER_PREFERENCE_DONE,
        payload: { data: data.data }
      });
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_USER_PREFERENCE,
        payload: { data: err }
      });
    }
  };
}

export function updateUserPreference(preferenceID, preferenceSelected) {
  console.log('tapassssssss', preferenceID, preferenceSelected);
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_USER_PREFERENCE });
      const data = await updateUserPreferenceApi(
        preferenceID,
        preferenceSelected
      );
      dispatch({
        type: UPDATE_USER_PREFERENCE_DONE,
        payload: { data: data.data }
      });
    } catch (err) {
      dispatch({
        type: ERROR_UPDATING_USER_PREFERENCE,
        payload: { data: err }
      });
    }
  };
}

// export default fetchNotes;
