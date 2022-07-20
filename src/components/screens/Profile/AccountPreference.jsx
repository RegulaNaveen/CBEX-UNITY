import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Checkbox from 'apollo-react/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';

import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import { OPPORTUNITY_PREFERENCE } from './Dummy';

const useStyles = makeStyles(() => ({
  item: {
    // padding: '10px',
  },
  blacktext: {
    color: '#000',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular'
  },

  greytext: {
    color: '#7f7f7f',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular'
  },
  boldtext: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'ProximaNova-Regular'
  },
  title: {
    padding: '10px'
  },
  button: {
    margin: '10px'
  }
}));
const AccountPreference = ({ email, role, roleName, setRoleName }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [opportunityPrefList, setOpportunityPrefList] = useState(
    OPPORTUNITY_PREFERENCE
  );

  const isRolesLoading = useSelector(isRolesInfoLoading);
  const rolesList = useSelector(getRoles);

  const handleOpportunityPreferenceChange = (e, checked, index) => {
    OPPORTUNITY_PREFERENCE[index].checked = checked;
    setOpportunityPrefList([...OPPORTUNITY_PREFERENCE]);
  };

  useEffect(() => {
    if (role) setRoleName(role);
  }, []);

  const onRoleChange = value => {
    dispatch(onSetUserRole(value));
    setRoleName(value);
  };

  return (
    <div>
      <Card
        interactive
        style={{ height: 320, marginTop: '0.6em', marginLeft: '0.5em' }}
      >
        <Typography
          className={`${classes.boldtext} ${classes.title}`}
          variant="title2"
          gutterBottom
          style={{ margin: '10px 0px 0px 0.4em' }}
        >
          Account Preference
        </Typography>
        <Typography
          className={`${classes.greytext} ${classes.title}`}
          variant="caption"
          gutterBottom
          style={{ margin: '0px 0px 0px 0.4em' }}
        >
          Email
        </Typography>
        <div>
          <Typography
            className={`${classes.boldtext} ${classes.title}`}
            variant="caption"
            gutterBottom
            style={{ margin: '0px 0px 0px 0.4em' }}
          >
            {email}
          </Typography>
        </div>
        {/* <div style={{ margin: '0px 0px 0px 0.3em' }} >
          <Button
            className={`${classes.button}`}
            variant='secondary'
            size='small'
          >
            Edit Profile Picture
          </Button>
        </div> */}
        <div style={{ margin: '0.3em 1.0em 1.0em 1.0em' }}>
          {isRolesLoading ? (
            <div className="toolbar-account-menu-option-loader">
              <Loader type="TailSpin" color="#297DFD" height={35} width={35} />
            </div>
          ) : (
            <>
              <Dropdown
                id="dd-team-member"
                title="User Role"
                placeholder="Select"
                items={rolesList ? rolesList.sort() : []}
                onClick={onRoleChange}
                value={roleName}
              />
              <Typography
                className={classes.greytext}
                variant="caption"
                gutterBottom
                style={{ fontSize: '12px' }}
              >
                Your role will determine the visible questions in an opportunity
              </Typography>
            </>
          )}
        </div>
        <div style={{ margin: '0.5em 0px 0px 0.4em' }}>
          <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant="caption"
            gutterBottom
          >
            Opportunity Preference
          </Typography>
        </div>

        {opportunityPrefList.map(({ label, checked, disabled }, index) => {
          return (
            <div
              className={`${classes.boldtext} `}
              style={{ margin: '0px 10px 0px 1.1em' }}
            >
              <Checkbox
                label={
                  <Typography
                    className={`${classes.boldtext} `}
                    variant="caption"
                    gutterBottom
                  >
                    {label}
                  </Typography>
                }
                checked={checked}
                onChange={(e, check) =>
                  handleOpportunityPreferenceChange(e, check, index)
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
