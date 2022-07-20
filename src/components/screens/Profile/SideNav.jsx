import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from 'apollo-react/components/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseCircle from 'apollo-react-icons/CloseCircle';
import Button from 'apollo-react/components/Button';
import Typography from 'apollo-react/components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { logout } from '../../../redux/actions/auth-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import { LOGIN, PROFILE } from '../../../routes';
import Loader from 'react-loader-spinner';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItem: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    marginTop: theme.spacing(0),
    padding: '0 !important',
  },
  item: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingTop: '20px !important',
  },
  profilepic: {
    paddingTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing(1),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  active: {
    backgroundColor: '#0768fd',
  },
  root: {
    '&$selected': {
      backgroundColor: '#0768fd',
      color: '#fff !important',

      '&:hover': {
        backgroundColor: '#0768fd',
        color: '#000 !important',
      },
    },
  },
  selected: {},
  logout: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(20),
  },
  userDetails: {
    textAlign: 'center',
    margin: '0',
  },
  greytext: {
    color: '#7f7f7f',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular',
  },
  boldtext: {
    fontWeight: '700',
    color: '#000',
    fontFamily: 'ProximaNova-Regular',
  },
}));

const SideNav = ({ name, email, role, token ,roleName}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // const bidList = useSelector(getBidList);
  // const selectedBid = useSelector(getSelectedBid);
  // const isQuestionAnswered = useSelector(getIsQuestionAnswered);
  // const logoutUser = useSelector(logout);
  

  const handleLogout = () => {
    dispatch(logout());
    history.push(LOGIN);
  };

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    Axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      responseType: 'blob',
    }).then((o) => {
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
            <Avatar
              alt='avatar'
              src='' //'https://s3-ap-southeast-1.amazonaws.com/tv-prod/member/photo/2567699-large.jpg'
              size='extraLarge'
            >
              {name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)}
            </Avatar>
          </div>
          <div className={classes.userDetails}>
            <Typography classname={classes.boldtext} variant='p' gutterBottom>
              {name}
            </Typography>
          </div>
          <div className={classes.userDetails}>
            <Typography
              className={classes.greytext}
              variant='caption'
              gutterBottom
            >
              {roleName}
            </Typography>
          </div>

          <div className={classes.item}>
            <List disablePadding>
              <ListItem
                selected={true}
                button
                key='Account Preference'
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
                key='Recent Activity'
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
              variant='secondary'
              icon={CloseCircle}
              fullWidth
              size='small'
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

export default SideNav;
