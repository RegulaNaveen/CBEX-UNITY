import React, { useState } from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import { NOTIFICATION_PREFERENCE, EMAIL_PREFERENCE } from './Dummy';

const NotificationPreference = ({
  userPreference,
  handleUserPreferenceChange
}) => {
  const [notificationPrefList, setNotificationPrefList] = useState(
    userPreference
  );
  const [emailPrefList, setEmailPrefList] = useState(EMAIL_PREFERENCE);

  const handleEmailPreferenceChange = (e, checked, index) => {
    EMAIL_PREFERENCE[index].checked = checked;
    setEmailPrefList([...EMAIL_PREFERENCE]);
  };

  return (
    <div>
      <Card interactive className="card-wrapper">
        <Typography className="bold-text" variant="title2" gutterBottom>
          Notification Preference
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
              Notification Preference
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

        <table style={{ height: 250, overflowY: 'auto', display: 'block' }}>
          {!userPreference?.length && (
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: '100%'
              }}
            >
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
            Email Preference
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
                    // checked={checked}
                    onChange={(e, checked) =>
                      handleUserPreferenceChange(
                        e,
                        checked,
                        preference_id,
                        'EMAIL_PREFERENCE'
                      )
                    }
                    // disabled={disabled}
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

export default NotificationPreference;
