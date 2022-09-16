import React from 'react';

import { Link, useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'apollo-react/components/Avatar';
import CloseCircle from 'apollo-react-icons/CloseCircle';
import Button from 'apollo-react/components/Button';
import Typography from 'apollo-react/components/Typography';
import MuiListItem from '@material-ui/core/ListItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Container } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import makeStyles from '@material-ui/core/styles/makeStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListItem from '@material-ui/core/ListItem';

import { logout } from '../../../../redux/actions/auth-actions';
import { LOGIN, PROFILE, RECENT_ACTIVITY } from '../../../../routes';

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItem: 'center',
    height: '87vh'
  },
  container: {
    backgroundColor: '#fff',
    minHeight: 'calc(100vh - 57px)',
    marginTop: theme.spacing(0),
    padding: '0 0 1em 0 !important'
  },
  item: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingTop: '20px !important'
  },
  profilepic: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing(1)
  },
  active: {
    backgroundColor: 'blue'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  root: {
    '&$selected': {
      backgroundColor: 'blue',
      color: 'white'
    },
    '&$selected:hover': {
      backgroundColor: 'blue',
      color: 'white'
    }
  },
  selected: {},
  logout: {
    padding: '0 24px',
    marginBottom: '-5px'
    // paddingTop: theme.spacing(20)
  },
  userDetails: {
    textAlign: 'center',
    margin: '0'
  },
  greytext: {
    color: '#7f7f7f',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular'
  },
  boldtext: {
    fontWeight: '700',
    color: '#000',
    fontFamily: 'ProximaNova-Regular'
  }
}));

const SideNav = ({ name, role }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push(LOGIN);
  };

  return (
    <Container className={classes.container} disablePadding>
      {/* <div cla></div> */}
      <div className={classes.layout}>
        <div className={classes.upperPart}>
          <div className={classes.profilepic}>
            <Avatar alt="avatar" src="" size="extraLarge">
              {name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)}
            </Avatar>
          </div>
          <div className={classes.userDetails}>
            <Typography classname={classes.boldtext} variant="p" gutterBottom>
              {name}
            </Typography>
          </div>
          <div className={classes.userDetails}>
            <Typography
              className={classes.greytext}
              variant="caption"
              gutterBottom
            >
              {role}
            </Typography>
          </div>

          <div className={classes.item}>
            <List disablePadding>
              <div className="nav">
                <NavLink
                  to={PROFILE}
                  activeClassName="selected"
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem
                    // button
                    key="Account Preference"
                    className="acct-pref"
                    classes={{ root: classes.root, selected: classes.selected }}
                  >
                    <Typography
                      className="List-label"
                      gutterBottom
                      style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '24px',
                        width: '148px'
                      }}
                    >
                      Account Preferences
                    </Typography>
                  </ListItem>
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  style={{ textDecoration: 'none' }}
                  to={RECENT_ACTIVITY}
                >
                  <ListItem
                    // button
                    key="Recent Activity"
                    className="acct-pref"
                    classes={{ root: classes.root, selected: classes.selected }}
                  >
                    <Typography
                      className="List-label"
                      gutterBottom
                      style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        lineHeight: '24px',
                        width: '148px'
                      }}
                    >
                      Recent Activity
                    </Typography>
                  </ListItem>
                </NavLink>
              </div>
              {/* <Divider /> */}
            </List>
            <Divider style={{ marginTop: '0.25em' }} />
          </div>
        </div>
        <div className={classes.lowerPart}>
          <div className={classes.logout}>
            <Button
              variant="secondary"
              icon={CloseCircle}
              fullWidth
              size="small"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

SideNav.defaultProps = {
  name: '',
  // roleName: '',
  role: ''
};

SideNav.propTypes = {
  name: PropTypes.string,
  // roleName: PropTypes.string,
  role: PropTypes.string
};

export default SideNav;
