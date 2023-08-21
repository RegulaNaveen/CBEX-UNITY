import Grid from 'apollo-react/components/Grid';
import React, { useState } from 'react';
import Footer from 'apollo-react/components/Footer';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../../views/toolbar';
import SideNav from './SideNav';
import {
  getUserEmail,
  getUserName,
  getUserRole,
  getAccessToken
} from '../../../../SessionHandler';

const ProfileLayout = ({ children }) => {
  const name = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const role = useSelector(getUserRole);
  const token = useSelector(getAccessToken);
  const [roleName, setRoleName] = useState('');

  const state = {
    name,
    email,
    role,
    token
  };
  return (
    <div className="profile-wrapper">
      <Toolbar selected="dashboard" />

      <Grid container disablePadding className="container-wrap">
        <Grid container item xs={3} sm={4} md={3} lg={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="sideNav-wrapper"
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
          className="right-container-wrap"
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
                className="footer"
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
