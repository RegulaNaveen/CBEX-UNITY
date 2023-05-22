import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'apollo-react/components/Avatar';
import CloseCircle from 'apollo-react-icons/CloseCircle';
import Button from 'apollo-react/components/Button';
import Typography from 'apollo-react/components/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Container } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import List from '@mui/material/List';
// eslint-disable-next-line import/no-extraneous-dependencies
import Divider from '@mui/material/Divider';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListItem from '@mui/material/ListItem';
import { logout } from '../../../../redux/actions/auth-actions';
import { LOGIN, PROFILE, RECENT_ACTIVITY } from '../../../../routes';
import { PROFILE as PROFILE_CONSTANTS } from '../../../../constants/app';

const SideNav = ({ name, role }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push(LOGIN);
  };
  const {
    ACCOUNT_PREFERENCES,
    RECENT_ACTIVITY: RECENT_TEXT,
    LOGOUT
  } = PROFILE_CONSTANTS;

  return (
    <Container className="container" disablePadding>
      <div className="layout">
        <div className="upperPart">
          <div className="profilePic">
            <Avatar
              className="profileAvtar"
              alt="avatar"
              src=""
              size="extraLarge"
            >
              {name &&
                name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)}
            </Avatar>
          </div>
          <div className="userDetails">
            <Typography className="user-name" variant="p" gutterBottom>
              {name}
            </Typography>
          </div>
          <div className="userDetails">
            <Typography
              className="user-role-label"
              variant="caption"
              gutterBottom
            >
              {role}
            </Typography>
          </div>

          <div className="item">
            <List disablePadding>
              <div className="nav">
                <NavLink
                  to={PROFILE}
                  activeClassName="selected"
                  className="nav-text"
                >
                  <ListItem key="Account Preference" className="acct-pref">
                    <Typography
                      className="List-label nav-menu-label"
                      gutterBottom
                    >
                      {ACCOUNT_PREFERENCES}
                    </Typography>
                  </ListItem>
                </NavLink>
                <Divider className="divider-wrap" />
                <NavLink
                  activeClassName="selected"
                  className="nav-text"
                  to={RECENT_ACTIVITY}
                >
                  <ListItem key="Recent Activity" className="acct-pref">
                    <Typography
                      className="List-label nav-menu-label"
                      gutterBottom
                    >
                      {RECENT_TEXT}
                    </Typography>
                  </ListItem>
                </NavLink>
                <Divider className="divider-wrap" />
              </div>
            </List>
          </div>
        </div>
        <div className="lowerPart">
          <div className="logout">
            <Button
              variant="secondary"
              icon={CloseCircle}
              fullWidth
              size="small"
              onClick={() => {
                handleLogout();
              }}
            >
              {LOGOUT}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

SideNav.defaultProps = {
  name: '',
  role: ''
};

SideNav.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string
};

export default SideNav;
