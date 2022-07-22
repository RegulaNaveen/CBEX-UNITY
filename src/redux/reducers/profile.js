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
  //   data.isFromSocket = !!isFromSocket;
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
  console.log('founddddd 11', data);
  // const index = state.userPreference.findIndex(
  //   preference => preference.preference_id === data.preference_id
  // );
  // console.log('founddddd ', index);
  console.log('updatedUserPreference ', state.get('userPreference'));
  const updatedUserPreference = [...state.get('userPreference')];
  // updatedUserPreference[index] = data;
  console.log('updatedUserPreference ', state.userPreference);
  for (let index = 0; index < updatedUserPreference.length; index++) {
    console.log('inside if clause', updatedUserPreference[index]);
    if (updatedUserPreference[index].preference_id === data.preference_id) {
      updatedUserPreference[index].preference_selected =
        data.preference_selected;
    }
  }

  return state
    .set('userPreference', updatedUserPreference)
    .set('updateUserPreference', false);
  // return state.set('updateUserPreference', false);
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
