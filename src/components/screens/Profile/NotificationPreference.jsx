import React, { useState } from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import { NOTIFICATION_PREFERENCE, EMAIL_PREFERENCE } from './Dummy';

const NotificationPreference = () => {
  const [notificationPrefList, setNotificationPrefList] = useState(
    NOTIFICATION_PREFERENCE
  );
  const [emailPrefList, setEmailPrefList] = useState(EMAIL_PREFERENCE);

  const handleNotificationPreferenceChange = (e, checked, index, type) => {
    NOTIFICATION_PREFERENCE[index][`${type}`].checked = checked;
    setNotificationPrefList([...NOTIFICATION_PREFERENCE]);
  };

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
          {notificationPrefList?.map(({ label, inApp, email }, index) => {
            return (
              <tr
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <td style={{ flexGrow: '3' }}>
                  <Typography
                    className="grey-text"
                    variant="caption"
                    gutterBottom
                  >
                    {label}
                  </Typography>
                </td>
                <td style={{ flexGrow: '0', marginRight: '2em' }}>
                  <Checkbox
                    disabled={inApp.disabled}
                    checked={inApp.checked}
                    onChange={(e, checked) =>
                      handleNotificationPreferenceChange(
                        e,
                        checked,
                        index,
                        'inApp'
                      )
                    }
                    size="small"
                  />
                </td>
                <td style={{ flexGrow: '0' }}>
                  <Checkbox
                    disabled={email.disabled}
                    checked={email.checked}
                    onChange={(e, checked) =>
                      handleNotificationPreferenceChange(
                        e,
                        checked,
                        index,
                        'email'
                      )
                    }
                    size="small"
                  />
                </td>
              </tr>
            );
          })}
        </table>

        <div className="top-space">
          <Typography className="grey-text" variant="caption" gutterBottom>
            Email Preference
          </Typography>
        </div>

        {emailPrefList.map(({ label, checked, disabled }, index) => {
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
                  handleEmailPreferenceChange(e, check, index)
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

export default NotificationPreference;
