import { fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';

const {
  FETCH_USER_PREFERENCE,
  FETCH_USER_PREFERENCE_DONE,
  FETCH_TIMEZONE,
  FETCH_TIMEZONE_DONE,
  UPDATE_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE_DONE,
  UPDATE_USER_TIMEZONE,
  UPDATE_USER_TIMEZONE_DONE,
  ERROR_FETCHING_USER_PREFERENCE,
  ERROR_UPDATING_USER_PREFERENCE,
  ERROR_FETCHING_TIMEZONE,
  ERROR_UPDATING_USER_TIMEZONE
} = REDUX_TYPES.PROFILE;

const INITIAL_STATE = fromJS({
  preferenceID: '',
  preferenceSelected: {},
  userPreference: [],
  timezoneList: [],
  timezoneID: '',
  fetchingUserPreference: false,
  fetchingTimezone: false,
  fetchUserPreferenceErrorMsg: '',
  fetchingTimezoneErrorMsg: '',
  updateUserPreference: false,
  updateTimezone: false,
  updateUserPreferenceErrorMsg: '',
  updateTimezoneErrorMsg: ''
});

function onFetchUserPreference(state) {
  return state.set('fetchingUserPreference', true);
}

function onFetchTimezone(state) {
  return state
    .set('fetchingTimezone', true)
    .set('fetchingTimezoneErrorMsg', '');
}

function onFetchUserPreferenceDone(state, action) {
  const {
    payload: { data }
  } = action;

  data.sort((a, b) => a.display_order - b.display_order);
  return state.set('userPreference', data).set('fetchingUserPreference', false);
}

function onFetchTimezoneDone(state, action) {
  const {
    payload: { data }
  } = action;

  // data.timezonelist.sort((a, b) =>
  //   a.description.toUpperCase() < b.description.toUpperCase() ? -1 : 1
  // );

  return state
    .set('timezoneList', data?.timezonelist)
    .set('timezoneID', data?.usertimezone?.time_zone_id)
    .set('fetchingTimezone', false);
}

function onErrorFetchingUserPreference(state, action) {
  const {
    payload: { data }
  } = action;
  return state
    .set('fetchingUserPreference', false)
    .set('fetchUserPreferenceErrorMsg', data);
}

function onErrorFetchingTimezone(state, action) {
  const {
    payload: { data }
  } = action;
  return state
    .set('fetchingTimezone', false)
    .set('fetchingTimezoneErrorMsg', data);
}

function onUpdateUserPreference(state) {
  return state.set('updateUserPreference', true);
}

function onUpdateUserTimezone(state) {
  return state.set('updateTimezone', true).set('updateTimezoneErrorMsg', '');
}

function onUpdateUserPreferenceDone(state, action) {
  const {
    payload: { data }
  } = action;

  const updatedUserPreference = [...state.get('userPreference')];

  for (let index = 0; index < updatedUserPreference.length; index++) {
    if (updatedUserPreference[index].preference_id === data.preference_id) {
      updatedUserPreference[index].preference_selected =
        data.preference_selected;
    }
  }

  return state
    .set('userPreference', updatedUserPreference)
    .set('updateUserPreference', false);
}

function onUpdateUserTimezoneDone(state, action) {
  const {
    payload: { data }
  } = action;

  return state
    .set('timezoneID', data?.time_zone_id)
    .set('updateTimezone', false);
}

function onErrorUpdatingUserPreference(state, action) {
  const {
    payload: { data }
  } = action;
  return state
    .set('updateUserPreference', false)
    .set('updateUserPreferenceErrorMsg', data);
}

function onErrorUpdatingTimezone(state, action) {
  const {
    payload: { data }
  } = action;
  return state.set('updateTimezone', false).set('updateTimezoneErrorMsg', data);
}

const actionMap = {
  [FETCH_USER_PREFERENCE]: onFetchUserPreference,
  [FETCH_USER_PREFERENCE_DONE]: onFetchUserPreferenceDone,
  [FETCH_TIMEZONE]: onFetchTimezone,
  [FETCH_TIMEZONE_DONE]: onFetchTimezoneDone,
  [UPDATE_USER_PREFERENCE]: onUpdateUserPreference,
  [UPDATE_USER_PREFERENCE_DONE]: onUpdateUserPreferenceDone,
  [UPDATE_USER_TIMEZONE]: onUpdateUserTimezone,
  [UPDATE_USER_TIMEZONE_DONE]: onUpdateUserTimezoneDone,
  [ERROR_FETCHING_USER_PREFERENCE]: onErrorFetchingUserPreference,
  [ERROR_UPDATING_USER_PREFERENCE]: onErrorUpdatingUserPreference,
  [ERROR_FETCHING_TIMEZONE]: onErrorFetchingTimezone,
  [ERROR_UPDATING_USER_TIMEZONE]: onErrorUpdatingTimezone
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
