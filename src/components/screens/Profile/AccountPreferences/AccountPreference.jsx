import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import { useSelector, useDispatch } from 'react-redux';

import { getRoles, isRolesInfoLoading } from '../../../../redux/selectors';
import { onSetUserRole } from '../../../../redux/actions/sso-auth-actions';
import Dropdown from '../../../common/atoms/inputs/Dropdown';

const AccountPreference = ({
  email,
  role,
  roleName,
  setRoleName,

  handleUpdateTimezone,
  isFetchingTimezone,

  timezoneList,
  timezoneID,
  currentTimezoneID,
  setCurrentTimezoneID,
  errorUpdatingTimezone
}) => {
  const dispatch = useDispatch();

  const isRolesLoading = useSelector(isRolesInfoLoading);
  const rolesList = useSelector(getRoles);

  useEffect(() => {
    if (role) setRoleName(role);
  }, []);

  useEffect(() => {
    if (timezoneID) setCurrentTimezoneID(timezoneID);
  }, [timezoneID]);

  const onRoleChange = value => {
    dispatch(onSetUserRole(value));
    setRoleName(value);
  };

  return (
    <div>
      <Card interactive className="card-wrapper">
        <Typography
          className="card-heading bold-text"
          variant="title2"
          gutterBottom
        >
          Account Preferences
        </Typography>
        <div className="top-space">
          <Typography className="card-label" variant="body2" gutterBottom>
            Email
          </Typography>
        </div>
        <div>
          <Typography
            className="card-item bold-label"
            variant="body1"
            gutterBottom
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

        <div className="top-space">
          {isRolesLoading ? (
            <div className="toolbar-account-menu-option-loader">
              <Loader type="TailSpin" color="#297DFD" height={35} width={35} />
            </div>
          ) : (
            <>
              <Dropdown
                id="dd-team-member"
                title={
                  <Typography
                    className="card-label"
                    variant="body2"
                    gutterBottom
                  >
                    User Role
                  </Typography>
                }
                placeholder="Select"
                items={rolesList ? rolesList.sort() : []}
                onClick={onRoleChange}
                value={roleName}
              />
              <Typography
                className="optional-help-text"
                variant="caption"
                gutterBottom
                // style={{ fontSize: '12px' }}
              >
                Your role will help determine the most appropriate questions
                displayed
              </Typography>
            </>
          )}
        </div>
        <div className="top-space" style={{ maxWidth: '80%' }}>
          {isFetchingTimezone ? (
            <div className="toolbar-account-menu-option-loader">
              <Loader type="TailSpin" color="#297DFD" height={35} width={35} />
            </div>
          ) : (
            <>
              <Select
                label={
                  <Typography
                    className="card-label"
                    variant="body2"
                    gutterBottom
                  >
                    Time Zone
                  </Typography>
                }
                helperText={
                  <Typography
                    className="optional-help-text"
                    variant="caption"
                    gutterBottom
                    // style={{ fontSize: '13px' }}
                  >
                    Your time zone can determine when notifications are sent
                  </Typography>
                }
                value={currentTimezoneID}
                onChange={handleUpdateTimezone}
                placeholder="Select Timezone"
                fullWidth
                error={!!errorUpdatingTimezone}
              >
                {// eslint-disable-next-line camelcase
                timezoneList.map(({ time_zone_id, description }) => {
                  return (
                    // eslint-disable-next-line camelcase
                    <MenuItem className="card-item" value={time_zone_id}>
                      {description}
                    </MenuItem>
                  );
                })}
              </Select>
            </>
          )}
        </div>
        {/* <div className="top-space">
          <Typography className="grey-text" variant="caption" gutterBottom>
            Opportunity Preferences
          </Typography>
        </div>

        {!userPreference?.length && (
          <div>
            <Typography className="grey-text" variant="caption" gutterBottom>
              Not found!
            </Typography>
          </div>
        )}

        {userPreference.map(
          (
            {
              preference_id,
              title,
              preference_type,
              default_type,
              mandatory,
              preference_selected
            },
            index
          ) => {
            return (
              preference_type === 'OPP' && (
                <div className="bold-text" key={preference_id}>
                  <Checkbox
                    label={
                      <Typography
                        className="bold-text"
                        variant="caption"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                    }
                    disabled={!!(mandatory === 'TRUE')}
                    checked={
                      preference_selected
                        ? !!(preference_selected == 'CHECKED')
                        : !!(default_type == 'CHECKED')
                    }
                    onChange={(e, checked) =>
                      handleUserPreferenceChange(
                        e,
                        checked,
                        preference_id,
                        'OPP'
                      )
                    }
                  />
                </div>
              )
            );
          }
        )} */}
      </Card>
    </div>
  );
};

AccountPreference.defaultProps = {
  email: '',
  role: '',
  roleName: '',
  setRoleName: () => {},
  userPreference: [],
  handleUserPreferenceChange: () => {},
  handleUpdateTimezone: () => {},
  isFetchingTimezone: false,
  isUpdatingTimezone: false,
  timezoneList: [],
  timezoneID: '',
  currentTimezoneID: '',
  setCurrentTimezoneID: () => {},
  errorUpdatingTimezone: ''
};

AccountPreference.propTypes = {
  email: PropTypes.string,
  role: PropTypes.string,
  roleName: PropTypes.string,
  setRoleName: PropTypes.string,
  handleUpdateTimezone: PropTypes.func,
  isFetchingTimezone: PropTypes.bool,
  timezoneList: PropTypes.array,
  timezoneID: PropTypes.string,
  currentTimezoneID: PropTypes.string,
  setCurrentTimezoneID: PropTypes.func,
  errorUpdatingTimezone: PropTypes.string
};

export default AccountPreference;
