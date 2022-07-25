import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Card from 'apollo-react/components/Card';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';

import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import Dropdown from '../../common/atoms/inputs/Dropdown';

const AccountPreference = ({
  email,
  role,
  roleName,
  setRoleName,
  userPreference,
  handleUserPreferenceChange
}) => {
  const dispatch = useDispatch();

  const isRolesLoading = useSelector(isRolesInfoLoading);
  const rolesList = useSelector(getRoles);

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
          Account Preferences
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
        )}
      </Card>
    </div>
  );
};

AccountPreference.defaultProps = {
  email: '',
  role: '',
  roleName: '',
  setRoleName: '',
  userPreference: [],
  handleUserPreferenceChange: () => {}
};

AccountPreference.propTypes = {
  email: PropTypes.string,
  role: PropTypes.string,
  roleName: PropTypes.string,
  setRoleName: PropTypes.string,
  userPreference: PropTypes.array,
  handleUserPreferenceChange: PropTypes.func
};

export default AccountPreference;
