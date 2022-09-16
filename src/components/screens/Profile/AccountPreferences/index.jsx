import Grid from 'apollo-react/components/Grid';
import React, { useEffect, useState } from 'react';
import Loader from 'apollo-react/components/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useSelector, useDispatch } from 'react-redux';

import {
  updateUserPreference,
  updateUserTimezone
} from '../../../../redux/actions/profile-actions';
import {
  fetchUserPreference,
  fetchTimezone
} from '../../../../redux/actions/profile-actions';
import {
  selectUserPreference,
  selectIsFetchingTimezone,
  selectIsUpdatingTimezone,
  selectTimezoneList,
  selectTimezoneID,
  selectUpdateTimezoneErrorMsg,
  selectIsFetchingUserPreference,
  selectIsUpdatingUserPreference,
  selectFetchUserPreferenceErrorMsg,
  selectUpdateUserPreferenceErrorMsg,
  selectFetchTimezoneErrorMsg
} from '../../../../redux/selectors';

import {
  getUserEmail,
  getUserName,
  getUserRole
} from '../../../../SessionHandler';
import ProfileLayout from '../ProfileLayout';
import AccountPreference from './AccountPreference';
import NotificationPreference from './NotificationPreference';

function AccountPreferences() {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isFetchingTimezone = useSelector(selectIsFetchingTimezone);
  const isUpdatingTimezone = useSelector(selectIsUpdatingTimezone);
  const timezoneList = useSelector(selectTimezoneList);
  const timezoneID = useSelector(selectTimezoneID);
  const errorUpdatingTimezone = useSelector(selectUpdateTimezoneErrorMsg);

  const userPreference = useSelector(selectUserPreference);
  //   const classes = useStyles();
  const name = getUserName();
  const email = getUserEmail();
  const role = getUserRole();
  const isFetchingUserPreference = useSelector(selectIsFetchingUserPreference);
  const isUpdatingUserPreference = useSelector(selectIsUpdatingUserPreference);
  const errorFetchingUserPreference = useSelector(
    selectFetchUserPreferenceErrorMsg
  );
  const errorUpdatingUserPreference = useSelector(
    selectUpdateUserPreferenceErrorMsg
  );

  const errorFetchingTimezone = useSelector(selectFetchTimezoneErrorMsg);

  const [roleName, setRoleName] = useState('');
  const [currentTimezoneID, setCurrentTimezoneID] = useState('');

  const handleUpdateTimezone = e => {
    setCurrentTimezoneID(e.target.value);
    dispatch(updateUserTimezone(e.target.value));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  /**
   *
   * @param {*} e
   * @param {*} checked : current state of selection
   * @param {*} preferenceId : selected preference ID
   * @param {*} type : type of preference
   */

  const handleUserPreferenceChange = (e, checked, preferenceId, type) => {
    const selectedPreference = userPreference.filter(preference => {
      return preference.preference_id === preferenceId;
    });
    const preferenceSelected = {};
    const previousPreference =
      selectedPreference[0].preference_selected ||
      selectedPreference[0].default_type;

    if (type === 'EMAIL_PREFERENCE') {
      preferenceSelected.preference_selected = checked
        ? 'CHECKED'
        : 'UN-CHECKED';
    } else if (type === 'OPP') {
      preferenceSelected.preference_selected = checked
        ? 'CHECKED'
        : 'UN-CHECKED';
    } else {
      switch (previousPreference) {
        case 'BOTH':
          if (type === 'IN-APP' && !checked) {
            preferenceSelected.preference_selected = 'EMAIL';
          } else {
            preferenceSelected.preference_selected = 'IN-APP';
          }
          break;
        case 'IN-APP':
          if (type === 'IN-APP' && !checked) {
            preferenceSelected.preference_selected = 'UN-CHECKED';
          } else {
            preferenceSelected.preference_selected = 'BOTH';
          }
          break;
        case 'EMAIL':
          if (type === 'EMAIL' && !checked) {
            preferenceSelected.preference_selected = 'UN-CHECKED';
          } else {
            preferenceSelected.preference_selected = 'BOTH';
          }
          break;
        case 'UN-CHECKED':
          if (type === 'EMAIL' && checked)
            preferenceSelected.preference_selected = 'EMAIL';
          if (type === 'IN-APP' && checked)
            preferenceSelected.preference_selected = 'IN-APP';
          break;
        case 'EMAIL_PREFERENCE':
          preferenceSelected.preference_selected = checked
            ? 'CHECKED'
            : 'UN-CHECKED';
          break;
        case 'OPP':
          preferenceSelected.preference_selected = checked
            ? 'CHECKED'
            : 'UN-CHECKED';
          break;
        default:
      }
    }

    dispatch(updateUserPreference(preferenceId, preferenceSelected));
  };

  useEffect(() => {
    dispatch(fetchUserPreference());
    dispatch(fetchTimezone());
  }, []);

  useEffect(() => {
    if (
      errorUpdatingUserPreference ||
      errorFetchingUserPreference ||
      errorFetchingTimezone
    )
      setOpenSnackbar(true);
  }, [errorUpdatingUserPreference, errorFetchingUserPreference]);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      <ProfileLayout>
        {isUpdatingUserPreference && <Loader />}
        <Grid
          container
          item
          md={12}
          sm={12}
          xs={12}
          style={{ paddingTop: '1.2em', margin: '0' }}
          spacing={2}
        >
          <Grid item md={6} sm={12} xs={12}>
            <AccountPreference
              name={name}
              email={email}
              role={role}
              roleName={roleName}
              setRoleName={setRoleName}
              userPreference={userPreference}
              isFetchingTimezone={isFetchingTimezone}
              isUpdatingTimezone={isUpdatingTimezone}
              timezoneList={timezoneList}
              timezoneID={timezoneID}
              handleUserPreferenceChange={handleUserPreferenceChange}
              handleUpdateTimezone={handleUpdateTimezone}
              currentTimezoneID={currentTimezoneID}
              setCurrentTimezoneID={setCurrentTimezoneID}
              errorUpdatingTimezone={errorUpdatingTimezone}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <NotificationPreference
              userPreference={userPreference}
              handleUserPreferenceChange={handleUserPreferenceChange}
            />
          </Grid>
        </Grid>
      </ProfileLayout>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Something went wrong, Please try after sometime.
        </Alert>
      </Snackbar>
    </>
  );
}

export default AccountPreferences;
