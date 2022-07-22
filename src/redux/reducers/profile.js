import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';

const {
  FETCH_USER_PREFERENCE,
  FETCH_USER_PREFERENCE_DONE,
  UPDATE_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE_DONE,
  ERROR_FETCHING_USER_PREFERENCE,
  ERROR_UPDATING_USER_PREFERENCE
} = REDUX_TYPES.PROFILE;

const INITIAL_STATE = fromJS({
  preferenceID: '',
  preferenceSelected: {},
  userPreference: [],
  fetchingUserPreference: false,
  fetchUserPreferenceErrorMsg: '',
  updateUserPreference: false,
  updateUserPreferenceErrorMsg: ''
});

function onFetchUserPreference(state) {
  return state.set('fetchingUserPreference', true);
}

function onFetchUserPreferenceDone(state, action) {
  const {
    payload: { data }
  } = action;

  data.sort((a, b) => a.display_order - b.display_order);
  return state.set('userPreference', data).set('fetchingUserPreference', false);
}

function onErrorFetchingUserPreference(state, action) {
  const {
    payload: { data }
  } = action;
  return state
    .set('fetchingUserPreference', false)
    .set('fetchUserPreferenceErrorMsg', data);
}

function onUpdateUserPreference(state) {
  return state.set('updateUserPreference', true);
}

function onUpdateUserPreferenceDone(state, action) {
  const {
    payload: { data }
  } = action;

  const updatedUserPreference = [...state.get('userPreference')];

  for (let index = 0; index < updatedUserPreference.length; index + 1) {
    if (updatedUserPreference[index].preference_id === data.preference_id) {
      updatedUserPreference[index].preference_selected =
        data.preference_selected;
    }
  }

  return state
    .set('userPreference', updatedUserPreference)
    .set('updateUserPreference', false);
}

function onErrorUpdatingUserPreference(state, action) {
  const {
    payload: { data }
  } = action;
  return state
    .set('updateUserPreference', false)
    .set('updateUserPreferenceErrorMsg', data);
}

const actionMap = {
  [FETCH_USER_PREFERENCE]: onFetchUserPreference,
  [FETCH_USER_PREFERENCE_DONE]: onFetchUserPreferenceDone,
  [UPDATE_USER_PREFERENCE]: onUpdateUserPreference,
  [UPDATE_USER_PREFERENCE_DONE]: onUpdateUserPreferenceDone,
  [ERROR_FETCHING_USER_PREFERENCE]: onErrorFetchingUserPreference,
  [ERROR_UPDATING_USER_PREFERENCE]: onErrorUpdatingUserPreference
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
