import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'apollo-react/components/Avatar';
import CloseCircle from 'apollo-react-icons/CloseCircle';
import Button from 'apollo-react/components/Button';
import Typography from 'apollo-react/components/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Container } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import makeStyles from '@material-ui/core/styles/makeStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import List from '@material-ui/core/List';
// eslint-disable-next-line import/no-extraneous-dependencies
import Divider from '@material-ui/core/Divider';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListItem from '@material-ui/core/ListItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import ListItemText from '@material-ui/core/ListItemText';

import { logout } from '../../../redux/actions/auth-actions';
import { LOGIN } from '../../../routes';

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItem: 'center'
  },
  container: {
    backgroundColor: '#fff',
    height: '100vh',
    marginTop: theme.spacing(0),
    padding: '0 !important'
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
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  active: {
    backgroundColor: '#0768fd'
  },
  root: {
    '&$selected': {
      backgroundColor: '#0768fd',
      color: '#fff !important',

      '&:hover': {
        backgroundColor: '#0768fd',
        color: '#000 !important'
      }
    }
  },
  selected: {},
  logout: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(20)
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

const SideNav = ({ name, roleName }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push(LOGIN);
  };

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    Axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      responseType: 'blob'
    }).then(o => {
      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(o.data);
      setImageUrl(blobUrl);
    });
  }, []);

  return (
    <Container className={classes.container} disablePadding>
      {/* <div cla></div> */}
      <div className={classes.layout}>
        <div className={classes.upperPart}>
          <div className={classes.profilepic}>
            <Avatar alt="avatar" src={imageUrl} size="extraLarge">
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
              {roleName}
            </Typography>
          </div>

          <div className={classes.item}>
            <List disablePadding>
              <ListItem
                // selected={true}
                selected
                button
                key="Account Preference"
                classes={{ root: classes.root, selected: classes.selected }}
              >
                <ListItemText
                  primary={
                    <Typography style={{ color: '#fff' }} gutterBottom>
                      Account Preference
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem
                button
                key="Recent Activity"
                classes={{ root: classes.root, selected: classes.selected }}
              >
                {/* <ListItemText
                  primary='Recent Activity'
                  classes={{ root: classes.root, selected: classes.selected }}
                /> */}
              </ListItem>
              {/* <Divider /> */}
            </List>
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
  roleName: ''
};

SideNav.propTypes = {
  name: PropTypes.string,
  roleName: PropTypes.string
};

export default SideNav;
