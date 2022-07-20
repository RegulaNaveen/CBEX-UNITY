import Grid from 'apollo-react/components/Grid';
import React, { useState } from 'react';
import Footer from 'apollo-react/components/Footer';
// eslint-disable-next-line import/no-extraneous-dependencies
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '../../views/toolbar';
import AccountPreference from './AccountPreference';
import NotificationPreference from './NotificationPreference';

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
    padding: '0 24px 0 24px !important'
    // height: '2em',
  }
}));

const Profile = () => {
  const styles = {
    backgroundColor: '#f6f7fb'
  };

  const classes = useStyles();
  const name = getUserName();
  const email = getUserEmail();
  const role = getUserRole();
  const token = getAccessToken();
  const [roleName, setRoleName] = useState('');
  return (
    <div className="profile-wrapper">
      <Toolbar selected="dashboard" />
      <Grid container disablePadding style={styles}>
        <Grid container item xs={3} sm={4} md={3} lg={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
        <Grid container item sm={8} xs={9} md={9} lg={9} spacing={2}>
          <Grid item md={6} sm={12} xs={12} className={classes.item}>
            <AccountPreference
              name={name}
              email={email}
              role={role}
              roleName={roleName}
              setRoleName={setRoleName}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.item}>
            <NotificationPreference />
          </Grid>
          <Grid item md={12} sm={12} xs={12} className={`${classes.item} `}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
