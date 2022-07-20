import React, { useEffect, useState } from 'react';
import Card from 'apollo-react/components/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';
import {
  NOTIFICATION_PREFERENCE,
  EMAIL_PREFERENCE,
  OPPORTUNITY_PREFERENCE,
} from './Dummy';

const useStyles = makeStyles((theme) => ({
  item: {
    // padding: '10px',
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
    padding: '15px',
  },
}));

const NotificationPreference = () => {
  const classes = useStyles();
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
      <Card interactive style={{ height: 480, margin: '10px 10px 0 10px' }}>
        <Typography
          className={`${classes.boldtext} ${classes.title}`}
          variant='title2'
          gutterBottom
        >
          Notification Preference
        </Typography>
        <tr
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignSelf: 'flex-start',
            // flexGrow: '1',
            marginRight: '0.5rem',
            paddingBottom: '0.5rem',
          }}
        >
          <th style={{}}>
            <Typography
              className={`${classes.greytext} ${classes.title}`}
              variant='caption'
              gutterBottom
            >
              Notification Preference
            </Typography>
          </th>
          <th style={{ marginLeft: '6.5em' }}>
            <Typography
              className={`${classes.greytext} ${classes.title}`}
              variant='caption'
              gutterBottom
            >
              In-App
            </Typography>
          </th>
          <th style={{}}>
            <Typography
              className={`${classes.greytext} ${classes.title}`}
              variant='caption'
              gutterBottom
            >
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
                  justifyContent: 'space-between',
                  // alignSelf: 'flex-start',
                  // flexGrow: '1'
                }}
              >
                <td style={{ flexGrow: '3' }}>
                  <Typography
                    className={`${classes.greytext} ${classes.title}`}
                    variant='caption'
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
                    size='small'
                    // noteType='inApp'
                    // noteIndex={index}
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
                    size='small'
                  />
                </td>
              </tr>
            );
          })}
        </table>
        <div style={{ margin: '.5em 0 0 0' }}>
          <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            Email Preference
          </Typography>
        </div>

        {emailPrefList.map(({ label, checked, disabled }, index) => {
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
                  handleEmailPreferenceChange(e, checked, index)
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
