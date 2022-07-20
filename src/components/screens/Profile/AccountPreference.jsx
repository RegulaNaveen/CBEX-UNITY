import React, { useState, useEffect } from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from 'apollo-react/components/Button';
import TextField from 'apollo-react/components/TextField';
import Checkbox from 'apollo-react/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { logout } from '../../../redux/actions/auth-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import { LOGIN, PROFILE } from '../../../routes';
import Loader from 'react-loader-spinner';
import {
  NOTIFICATION_PREFERENCE,
  EMAIL_PREFERENCE,
  OPPORTUNITY_PREFERENCE,
} from './Dummy';

const useStyles = makeStyles((theme) => ({
  item: {
    // padding: '10px',
  },
  blacktext: {
    color: '#000',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular',
  },

  greytext: {
    color: '#7f7f7f',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular',
  },
  boldtext: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'ProximaNova-Regular',
  },
  title: {
    padding: '10px',
  },
  button: {
    margin: '10px',
  },
}));
const AccountPreference = ({ name, email, role, roleName, setRoleName }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [opportunityPrefList, setOpportunityPrefList] = useState(OPPORTUNITY_PREFERENCE);
  // const history = useHistory();
  // const [roleName, setRoleName] = useState('');
  const isRolesLoading = useSelector(isRolesInfoLoading);
  const rolesList = useSelector(getRoles);

  const handleOpportunityPreferenceChange = (e, checked, index) => {
    OPPORTUNITY_PREFERENCE[index].checked = checked;
    setOpportunityPrefList([...OPPORTUNITY_PREFERENCE]);
  };

  useEffect(() => {
    // if (!rolesList) useSelector(getRoles);
    if (role) setRoleName(role);
    // return () => {
    //   second
    // }
  }, []);

  const onRoleChange = (value) => {
    // const { changeUserRole } = this.props;
    // changeUserRole(value);
    dispatch(onSetUserRole(value));
    setRoleName(value);
    // this.setState({ roleName: value });
    // this.trackMatomoRoleChange(value);
  };

  const trackMatomoRoleChange = (role) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.changed} User Role to ${role}`,
    });
  };

  return (
    <div>
      <Card interactive style={{ height: 380, margin: '1.0em' }}>
        <Typography
          className={`${classes.boldtext} ${classes.title}`}
          variant='title2'
          gutterBottom
          style={{ margin: '0px 0px 0px 0.3em' }}
        >
          Account Preference
        </Typography>
        <Typography
          className={`${classes.greytext} ${classes.title}`}
          variant='caption'
          gutterBottom
          style={{ margin: '0px 0px 0px 0.4em' }}
        >
          Email
        </Typography>
        <div>
          <Typography
            className={`${classes.boldtext} ${classes.title}`}
            variant='caption'
            gutterBottom
            style={{ margin: '0px 0px 0px 0.4em' }}
          >
            {email}
          </Typography>
        </div>
        <div style={{ margin: '0px 0px 0px 0.3em' }} >
          <Button
            className={`${classes.button}`}
            variant='secondary'
            size='small'
          >
            Edit Profile Picture
          </Button>
        </div>
        <div style={{ maxWidth: 300, margin: '0px 1.0em 1.0em 1.0em' }}>
          {isRolesLoading ? (
            <div className='toolbar-account-menu-option-loader'>
              <Loader type='TailSpin' color='#297DFD' height={35} width={35} />
            </div>
          ) : (
            <Dropdown
              id='dd-team-member'
              title='User Role'
              placeholder='Select'
              items={rolesList ? rolesList.sort() : []}
              onClick={onRoleChange}
              value={roleName}
            />
          )}
          {/* <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            
          </Typography> */}
          {/* <TextField
            label='User Role'
            placeholder='Placeholder'
            helperText={
              <Typography
                className={classes.greytext}
                variant='caption'
                gutterBottom
                style={{ fontSize: '10px' }}
              >
                Your role will determine the visible questions in an opportunity
              </Typography>
            }
            size='small'
            fullWidth
            value={role}
          /> */}
        </div>
        <div style={{ margin: '0px 0px 0px 0.4em' }}>
          <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            Opportunity Preference
          </Typography>
        </div>

        {opportunityPrefList.map(({ label, checked, disabled },index) => {
          return (
            <div
              className={`${classes.boldtext} `}
              style={{ margin: '0px 10px 0px 1.0em' }}
            >
              <Checkbox
                label={
                  <Typography
                    className={`${classes.boldtext} `}
                    variant='caption'
                    gutterBottom
                  >
                    {label}
                  </Typography>
                }
                checked={checked}
                onChange={(e, checked) =>
                  handleOpportunityPreferenceChange(e, checked, index)
                }
                disabled={disabled}
              />
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default AccountPreference;
