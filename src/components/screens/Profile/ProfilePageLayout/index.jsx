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
import PropTypes from 'prop-types';
import Toolbar from '../../../views/toolbar';

import {
  fetchUserPreference,
  fetchTimezone
} from '../../../../redux/actions/profile-actions';
import {
  selectIsUpdatingUserPreference,
  selectIsFetchingUserPreference,
  selectFetchUserPreferenceErrorMsg,
  selectUpdateUserPreferenceErrorMsg,
  selectFetchTimezoneErrorMsg
} from '../../../../redux/selectors';

import SideNav from './SideNav';
import {
  getUserEmail,
  getUserName,
  getUserRole,
  getAccessToken
} from '../../../../SessionHandler';

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

const ProfilePageLayout = ({ children }) => {
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

  const errorFetchingTimezone = useSelector(selectFetchTimezoneErrorMsg);

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
            flexWrap: 'nowrap'
          }}
        >
          <div>{children}</div>

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

ProfilePageLayout.defaultProps = {
  children: <></>
};

ProfilePageLayout.propTypes = {
  children: PropTypes.element
};

export default ProfilePageLayout;
