import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Card from 'apollo-react/components/Card';
import Checkbox from 'apollo-react/components/Checkbox';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import { useSelector, useDispatch } from 'react-redux';

import { getRoles, isRolesInfoLoading } from '../../../../redux/selectors';
import { onSetUserRole } from '../../../../redux/actions/sso-auth-actions';
import Dropdown from '../../../common/atoms/inputs/Dropdown';
import { PROFILE } from '../../../../constants/app';

const AccountPreference = ({
  email,
  role,
  roleName,
  setRoleName,
  userPreference,
  handleUserPreferenceChange,
  handleUpdateTimezone,
  isFetchingTimezone,
  timezoneList,
  timezoneID,
  currentTimezoneID,
  setCurrentTimezoneID,
  errorUpdatingTimezone
}) => {
  const {
    ACCOUNT_PREFERENCES,
    EMAIL,
    USER_ROLE,
    ROLE_HELPER_TEXT,
    TIME_ZONE,
    TIME_ZONE_HELPER_TEXT
  } = PROFILE;
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
          className="card-heading"
          variant="title2"
          gutterBottom
        >
          {ACCOUNT_PREFERENCES}
        </Typography>
        <div className="top-space">
          <Typography className="card-label" variant="body2" gutterBottom>
            {EMAIL}
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
                    {USER_ROLE}
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
              >
                {ROLE_HELPER_TEXT}
              </Typography>
            </>
          )}
        </div>
        <div className="top-space time-zone-select">
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
                    {TIME_ZONE}
                  </Typography>
                }
                helperText={
                  <Typography
                    className="optional-help-text"
                    variant="caption"
                    gutterBottom
                  >
                    {TIME_ZONE_HELPER_TEXT}
                  </Typography>
                }
                value={currentTimezoneID}
                onChange={handleUpdateTimezone}
                placeholder="Select Timezone"
                fullWidth
                error={!!errorUpdatingTimezone}
              >
                {timezoneList.map(
                  ({ time_zone_id: timeZoneId, description }) => {
                    return (
                      <MenuItem className="card-item" value={timeZoneId}>
                        {description}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </>
          )}
        </div>
        {userPreference && userPreference.some((val) => val.preference_type === 'OPP') && <div className="top-space">
          <Typography className="card-label" variant="caption" gutterBottom>
            Opportunity Preferences
          </Typography>
        </div>}

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
        )}
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
  handleUserPreferenceChange: PropTypes.func,
  handleUpdateTimezone: PropTypes.func,
  isFetchingTimezone: PropTypes.bool,
  timezoneList: PropTypes.array,
  timezoneID: PropTypes.string,
  currentTimezoneID: PropTypes.string,
  setCurrentTimezoneID: PropTypes.func,
  errorUpdatingTimezone: PropTypes.string,
  userPreference: PropTypes.array
};

export default AccountPreference;
