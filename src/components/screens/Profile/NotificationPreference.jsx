import React from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import PropTypes from 'prop-types';

const NotificationPreference = ({
  userPreference,
  handleUserPreferenceChange
}) => {
  return (
    <div>
      <Card interactive className="card-wrapper">
        <Typography className="bold-text" variant="title2" gutterBottom>
          Notification Preferences
        </Typography>
        <tr
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1em',
            textAlign: 'left'
          }}
        >
          <th style={{ flexGrow: '3', alignSelf: 'flex-start' }}>
            <Typography className="grey-text" variant="caption" gutterBottom>
              Notifications Preferences
            </Typography>
          </th>
          <th style={{ flexGrow: '0', marginRight: '2.9em' }}>
            <Typography className="grey-text" variant="caption" gutterBottom>
              In-App
            </Typography>
          </th>
          <th style={{ flexGrow: '0', marginRight: '1.5em' }}>
            <Typography className="grey-text" variant="caption" gutterBottom>
              Email
            </Typography>
          </th>
        </tr>

        <table
          style={{
            overflowY: 'auto',
            display: 'block',
            marginTop: '0.5em'
          }}
        >
          {!userPreference?.length && (
            <div>
              <Typography className="grey-text" variant="caption" gutterBottom>
                Not found!
              </Typography>
            </div>
          )}
          {userPreference?.map(
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
                // eslint-disable-next-line camelcase
                preference_type === 'NOTIFICATION' && (
                  <tr
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                    key={preference_id}
                  >
                    <td style={{ flexGrow: '3' }}>
                      <Typography
                        className="grey-text"
                        variant="caption"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                    </td>
                    <td style={{ flexGrow: '0', marginRight: '2em' }}>
                      <Checkbox
                        disabled={
                          !!(mandatory === 'BOTH' || mandatory === 'IN_APP')
                        }
                        checked={
                          preference_selected
                            ? !!(
                                preference_selected == 'BOTH' ||
                                preference_selected == 'IN-APP'
                              )
                            : !!(
                                default_type == 'BOTH' ||
                                default_type == 'IN-APP'
                              )
                        }
                        onChange={(e, checked) =>
                          handleUserPreferenceChange(
                            e,
                            checked,
                            preference_id,
                            'IN-APP'
                          )
                        }
                        size="small"
                      />
                    </td>
                    <td style={{ flexGrow: '0' }}>
                      <Checkbox
                        // disabled={email.disabled}
                        // checked={email.checked}
                        disabled={
                          !!(mandatory === 'BOTH' || mandatory === 'EMAIL')
                        }
                        checked={
                          preference_selected
                            ? !!(
                                preference_selected == 'BOTH' ||
                                preference_selected == 'EMAIL'
                              )
                            : !!(
                                default_type == 'BOTH' ||
                                default_type == 'EMAIL'
                              )
                        }
                        onChange={(e, checked) =>
                          handleUserPreferenceChange(
                            e,
                            checked,
                            preference_id,
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
          <Typography className="grey-text" variant="caption" gutterBottom>
            Email Preferences
          </Typography>
        </div>

        {!userPreference?.length && (
          <div>
            <Typography className="grey-text" variant="caption" gutterBottom>
              Not found!
            </Typography>
          </div>
        )}

        {userPreference?.map(
          ({
            preference_id,
            title,
            preference_type,
            default_type,
            mandatory,
            preference_selected
          }) => {
            return (
              preference_type === 'EMAIL' && (
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
