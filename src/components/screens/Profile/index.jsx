import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Typography from 'apollo-react/components/Typography';
import React from 'react';
import Toolbar from '../../views/toolbar';
import AccountPreference from './AccountPreference';
import NotificationPreference from './NotificationPreference';
import Footer from 'apollo-react/components/Footer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SideNav from './SideNav';

const useStyles = makeStyles((theme) => ({
  item: {
    // padding: '10px',
  },
}));

const Profile = () => {
  const styles = {
    // padding: 16,
    // textAlign: 'center',
    backgroundColor: '#f6f7fb',
  };

  const classes = useStyles();

  return (
    <>
      <Toolbar selected='dashboard' />
      <Grid container disablePadding style={styles}>
        <Grid container item xs={3} sm={3} md={3} lg={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <SideNav />
          </Grid>
        </Grid>
        <Grid container item sm={9} xs={9} md={9} lg={9} spacing={1}>
          <Grid item sm={5} xs={10} className={classes.item}>
            <AccountPreference />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <NotificationPreference />
          </Grid>
          <Grid item xs={12} sm={12} className={classes.item}>
            <Footer
              buttonProps={[
                {
                  label: 'Terms of Use',
                  href: 'https://www.iqvia.com/about-us/terms-of-use',
                  target: '_blank',
                },
                {
                  label: 'Privacy Policy',
                  href: 'https://www.iqvia.com/about-us/privacy/privacy-policy',
                  target: '_blank',
                },
              ]}
              // maxWidth={1600}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
