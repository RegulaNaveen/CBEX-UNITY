import Grid from 'apollo-react/components/Grid';
import React, { useState } from 'react';
import Footer from 'apollo-react/components/Footer';
// eslint-disable-next-line import/no-extraneous-dependencies
import makeStyles from '@material-ui/core/styles/makeStyles';
import Loader from 'apollo-react/components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../../views/toolbar';

import SideNav from './SideNav';
import {
  getUserEmail,
  getUserName,
  getUserRole,
  getAccessToken
} from '../../../../SessionHandler';

const useStyles = makeStyles(() => ({
  footer: {
    margin: '0 !important',
    padding: '10px 24px 15px 24px !important',
    height: '15px'
  }
}));

const ProfileLayout = ({ children }) => {
  const dispatch = useDispatch();
  const styles = {
    backgroundColor: '#f6f7fb',
    minHeight: 'calc(100vh - 57px)'
  };

  const classes = useStyles();
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const role = useSelector(getUserRole);
  const token = useSelector(getAccessToken);
  const [roleName, setRoleName] = useState('');

  return (
    <div className="profile-wrapper">
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
        </Grid>
      </Grid>
    </div>
  );
};

ProfileLayout.defaultProps = {
  children: <></>
};

ProfileLayout.propTypes = {
  children: PropTypes.element
};

export default ProfileLayout;
