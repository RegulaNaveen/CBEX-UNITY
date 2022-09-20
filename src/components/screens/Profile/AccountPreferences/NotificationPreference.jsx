import React from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import PropTypes from 'prop-types';
import { PROFILE } from '../../../../constants/app';

const NotificationPreference = ({
  userPreference,
  handleUserPreferenceChange
}) => {
  const {
    NOTIFICATION_PREFERENCE,
    NOTIFICATION,
    IN_APP,
    EMAIL,
    NOT_FOUND,
    EMAIL_PREFERENCES
  } = PROFILE;
  return (
    <div>
      <Card interactive className="card-wrapper">
        <Typography
          className="card-heading bold-text"
          variant="title2"
          gutterBottom
        >
          {NOTIFICATION_PREFERENCE}
        </Typography>
        <tr className="notification-tr-head-wrap">
          <th className="th-one">
            <Typography className="card-label" variant="caption" gutterBottom>
              {NOTIFICATION}
            </Typography>
          </th>
          <th className="th-two">
            <Typography className="card-label" variant="caption" gutterBottom>
              {IN_APP}
            </Typography>
          </th>
          <th className="th-three">
            <Typography className="card-label" variant="caption" gutterBottom>
              {EMAIL}
            </Typography>
          </th>
        </tr>

        <table className="notification-table">
          {!userPreference?.length && (
            <div>
              <Typography className="grey-text" variant="caption" gutterBottom>
                {NOT_FOUND}
              </Typography>
            </div>
          )}
          {userPreference?.map(
            ({
              preference_id: preferenceId,
              title,
              preference_type: preferenceType,
              default_type: defaultType,
              mandatory,
              preference_selected: preferenceSelected
            }) => {
              return (
                preferenceType === 'NOTIFICATION' && (
                  <tr className="notification-pref-tr" key={preferenceId}>
                    <td className="td-one">
                      <Typography
                        className="preference-label"
                        variant="body2"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className="td-two">
                      <Checkbox
                        disabled={
                          !!(mandatory === 'BOTH' || mandatory === 'IN_APP')
                        }
                        checked={
                          preferenceSelected
                            ? !!(
                                preferenceSelected === 'BOTH' ||
                                preferenceSelected === 'IN-APP'
                              )
                            : !!(
                                defaultType === 'BOTH' ||
                                defaultType === 'IN-APP'
                              )
                        }
                        onChange={(e, checked) =>
                          handleUserPreferenceChange(
                            e,
                            checked,
                            preferenceId,
                            'IN-APP'
                          )
                        }
                        size="small"
                      />
                    </td>
                    <td className="td-three">
                      <Checkbox
                        disabled={
                          !!(mandatory === 'BOTH' || mandatory === 'EMAIL')
                        }
                        checked={
                          preferenceSelected
                            ? !!(
                                preferenceSelected === 'BOTH' ||
                                preferenceSelected === 'EMAIL'
                              )
                            : !!(
                                defaultType === 'BOTH' ||
                                defaultType === 'EMAIL'
                              )
                        }
                        onChange={(e, checked) =>
                          handleUserPreferenceChange(
                            e,
                            checked,
                            preferenceId,
                            'EMAIL'
                          )
                        }
                        size="small"
                      />
                    </td>
                  </tr>
                )
              );
            }
          )}
        </table>

        <div className="top-space">
          <Typography className="card-label" variant="caption" gutterBottom>
            {EMAIL_PREFERENCES}
          </Typography>
        </div>

        {!userPreference?.length && (
          <div>
            <Typography className="grey-text" variant="caption" gutterBottom>
              {NOT_FOUND}
            </Typography>
          </div>
        )}

        {userPreference?.map(
          ({
            preference_id: preferenceId,
            title,
            preference_type: preferenceType,
            default_type: defaultType,
            mandatory,
            preference_selected: preferenceSelected
          }) => {
            return (
              preferenceType === 'EMAIL' && (
                <div key={preferenceId}>
                  <Checkbox
                    label={
                      <Typography
                        variant="body1"
                        className={
                          (preferenceSelected
                          ? !!(preferenceSelected === 'CHECKED')
                          : !!(defaultType === 'CHECKED'))
                            ? 'preference-label bold-label'
                            : 'preference-label'
                        }
                        gutterBottom
                      >
                        {title}
                      </Typography>
                    }
                    disabled={!!(mandatory === 'TRUE')}
                    checked={
                      preferenceSelected
                        ? !!(preferenceSelected === 'CHECKED')
                        : !!(defaultType === 'CHECKED')
                    }
                    onChange={(e, checked) =>
                      handleUserPreferenceChange(
                        e,
                        checked,
                        preferenceId,
                        'EMAIL_PREFERENCE'
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

NotificationPreference.defaultProps = {
  userPreference: [],
  handleUserPreferenceChange: () => {}
};

NotificationPreference.propTypes = {
  userPreference: PropTypes.array,
  handleUserPreferenceChange: PropTypes.func
};

export default NotificationPreference;
