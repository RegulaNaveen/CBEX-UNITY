const selectProfile = state => {
  return state.profile;
};

export const selectIsFetchingUserPreference = state => {
  return selectProfile(state).get('fetchingUserPreference');
};

export const selectIsUpdatingUserPreference = state => {
  return selectProfile(state).get('updateUserPreference');
};

export const selectIsFetchingTimezone = state => {
  return selectProfile(state).get('fetchingTimezone');
};

export const selectIsUpdatingTimezone = state => {
  return selectProfile(state).get('updateTimezone');
};

export const selectUserPreference = state => {
  return selectProfile(state).get('userPreference');
};

export const selectTimezoneList = state => {
  return selectProfile(state).get('timezoneList');
};

export const selectTimezoneID = state => {
  return selectProfile(state).get('timezoneID');
};

export const selectUpdateUserPreferenceErrorMsg = state => {
  return selectProfile(state).get('updateUserPreferenceErrorMsg');
};

export const selectUpdateTimezoneErrorMsg = state => {
  return selectProfile(state).get('updateTimezoneErrorMsg');
};

export const selectFetchUserPreferenceErrorMsg = state => {
  return selectProfile(state).get('fetchUserPreferenceErrorMsg');
};

export const selectFetchTimezoneErrorMsg = state => {
  return selectProfile(state).get('fetchingTimezoneErrorMsg');
};

export default selectProfile;
