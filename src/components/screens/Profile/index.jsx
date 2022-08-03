import Grid from 'apollo-react/components/Grid';
import React, { useEffect, useState } from 'react';
import Footer from 'apollo-react/components/Footer';
// eslint-disable-next-line import/no-extraneous-dependencies
import makeStyles from '@material-ui/core/styles/makeStyles';
import Loader from 'apollo-react/components/Loader';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import Snackbar from '@material-ui/core/Snackbar';
// eslint-disable-next-line import/no-extraneous-dependencies
import MuiAlert from '@material-ui/lab/Alert';
import Toolbar from '../../views/toolbar';
import AccountPreference from './AccountPreference';
import NotificationPreference from './NotificationPreference';
import {
  fetchUserPreference,
  updateUserPreference,
  fetchTimezone,
  updateUserTimezone
} from '../../../redux/actions/profile-actions';
import {
  selectUserPreference,
  selectIsUpdatingUserPreference,
  selectIsFetchingUserPreference,
  selectFetchUserPreferenceErrorMsg,
  selectUpdateUserPreferenceErrorMsg,
  selectIsFetchingTimezone,
  selectIsUpdatingTimezone,
  selectTimezoneList,
  selectTimezoneID,
  selectUpdateTimezoneErrorMsg,
  selectFetchTimezoneErrorMsg
} from '../../../redux/selectors';

import SideNav from './SideNav';
import {
  getUserEmail,
  getUserName,
  getUserRole,
  getAccessToken
} from '../../../SessionHandler';

const useStyles = makeStyles(() => ({
  item: {
    // padding: '10px',
  },
  footer: {
    margin: '0 !important',
    padding: '10px 24px 15px 24px !important',
    height: '15px'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Profile = () => {
  const dispatch = useDispatch();
  const styles = {
    backgroundColor: '#f6f7fb',
    minHeight: 'calc(100vh - 57px)'
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isFetchingUserPreference = useSelector(selectIsFetchingUserPreference);
  const isUpdatingUserPreference = useSelector(selectIsUpdatingUserPreference);
  const errorFetchingUserPreference = useSelector(
    selectFetchUserPreferenceErrorMsg
  );
  const errorUpdatingUserPreference = useSelector(
    selectUpdateUserPreferenceErrorMsg
  );
  const isFetchingTimezone = useSelector(selectIsFetchingTimezone);
  const isUpdatingTimezone = useSelector(selectIsUpdatingTimezone);
  const timezoneList = useSelector(selectTimezoneList);
  const timezoneID = useSelector(selectTimezoneID);
  const errorUpdatingTimezone = useSelector(selectUpdateTimezoneErrorMsg);
  const errorFetchingTimezone = useSelector(selectFetchTimezoneErrorMsg);
  const userPreference = useSelector(selectUserPreference);
  const classes = useStyles();
  const name = getUserName();
  const email = getUserEmail();
  const role = getUserRole();
  const token = getAccessToken();
  const [roleName, setRoleName] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
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

  const handleUpdateTimezone = e => {
    dispatch(updateUserTimezone(e.target.value));
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

  if (isFetchingUserPreference) {
    return (
      <div
        className="profile-wrapper"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      {isUpdatingUserPreference && <Loader />}
      <Toolbar selected="dashboard" />

      <Grid container disablePadding style={styles}>
        <Grid container item xs={3} sm={4} md={3} lg={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginRight: '0.5em' }}
          >
            <SideNav
              name={name}
              email={email}
              role={role}
              token={token}
              roleName={roleName}
              setRoleName={setRoleName}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={8}
          xs={9}
          md={9}
          lg={9}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItem: 'center',
            // height: '88vh',
            flexWrap: 'nowrap'
          }}
          // spacing={2}
        >
          <div>
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
                  // errorUpdatingTimezone
                  // errorFetchingTimezone
                  handleUserPreferenceChange={handleUserPreferenceChange}
                  handleUpdateTimezone={handleUpdateTimezone}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <NotificationPreference
                  userPreference={userPreference}
                  handleUserPreferenceChange={handleUserPreferenceChange}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid item md={12} sm={12} xs={12}>
              <Footer
                buttonProps={[
                  {
                    label: '',
                    href: '',
                    target: '',
                    disabled: true
                  }
                ]}
                className={` ${classes.footer}`}
              />
            </Grid>
          </div>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Something went wrong, Please try after sometime.
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
