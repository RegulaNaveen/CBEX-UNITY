import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';

import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import { OPPORTUNITY_PREFERENCE } from './Dummy';

const AccountPreference = ({ email, role, roleName, setRoleName }) => {
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
      <Card interactive className="card-wrapper">
        <Typography className="bold-text" variant="title2" gutterBottom>
          Account Preference
        </Typography>
        <div className="top-space">
          <Typography className="grey-text" variant="caption" gutterBottom>
            Email
          </Typography>
        </div>
        <div>
          <Typography className="bold-text" variant="caption" gutterBottom>
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

        <div className="top-space">
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
                className="grey-text"
                variant="caption"
                gutterBottom
                style={{ fontSize: '12px' }}
              >
                Your role will determine the visible questions in an opportunity
              </Typography>
            </>
          )}
        </div>
        <div className="top-space">
          <Typography className="grey-text" variant="caption" gutterBottom>
            Opportunity Preference
          </Typography>
        </div>

        {opportunityPrefList.map(({ label, checked, disabled }, index) => {
          return (
            <div className="bold-text">
              <Checkbox
                label={
                  <Typography
                    className="bold-text"
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

AccountPreference.defaultProps = {
  email: '',
  role: '',
  roleName: '',
  setRoleName: ''
};

AccountPreference.propTypes = {
  email: PropTypes.string,
  role: PropTypes.string,
  roleName: PropTypes.string,
  setRoleName: PropTypes.string
};

export default AccountPreference;
