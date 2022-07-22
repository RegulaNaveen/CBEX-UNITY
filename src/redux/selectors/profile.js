const selectProfile = state => {
  return state.profile;
};

export const selectIsFetchingUserPreference = state => {
  return selectProfile(state).get('fetchingUserPreference');
};

export const selectIsUpdatingUserPreference = state => {
  return selectProfile(state).get('updateUserPreference');
};

export const selectUserPreference = state => {
  return selectProfile(state).get('userPreference');
};

export const selectUpdateUserPreferenceErrorMsg = state => {
  return selectProfile(state).get('updateUserPreferenceErrorMsg');
};

export const selectFetchUserPreferenceErrorMsg = state => {
  return selectProfile(state).get('fetchUserPreferenceErrorMsg');
};

export default selectProfile;
