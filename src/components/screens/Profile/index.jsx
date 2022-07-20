import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Typography from 'apollo-react/components/Typography';
import React, { useState } from 'react';
import Toolbar from '../../views/toolbar';
import AccountPreference from './AccountPreference';
import NotificationPreference from './NotificationPreference';
import Footer from 'apollo-react/components/Footer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SideNav from './SideNav';
import {
  getUserEmail,
  getUserName,
  getUserRole,
  getAccessToken,
} from '../../../SessionHandler';

const useStyles = makeStyles((theme) => ({
  item: {
    // padding: '10px',
  },
  footer: {
    margin: '0 !important',
    padding: '0 24px 0 24px !important',
    // height: '2em',
  },
}));

const Profile = () => {
  const styles = {
    // padding: 16,
    // textAlign: 'center',
    backgroundColor: '#f6f7fb',
  };

  const classes = useStyles();
  const name = getUserName();
  const email = getUserEmail();
  const role = getUserRole();
  const token = getAccessToken();
  const [roleName, setRoleName] = useState('');
  return (
    <>
      <Toolbar selected='dashboard' />
      <Grid container disablePadding style={styles}>
        <Grid container item xs={3} sm={3} md={3} lg={3}>
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
        <Grid container item sm={9} xs={9} md={9} lg={9} spacing={1}>
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
                },
              ]}
              // maxWidth={1600}
              className={` ${classes.footer}`}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
