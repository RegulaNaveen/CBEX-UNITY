import React from 'react';
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

  return (
    <div>
      <Card interactive style={{ height: 470, margin: '10px 10px 0 10px' }}>
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
          <th>
            <Typography
              className={`${classes.greytext} ${classes.title}`}
              variant='caption'
              gutterBottom
            >
              Notification Preference
            </Typography>
          </th>
          <th>
            <Typography
              className={`${classes.greytext} ${classes.title}`}
              variant='caption'
              gutterBottom
            >
              In-App
            </Typography>
          </th>
          <th>
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
          {NOTIFICATION_PREFERENCE.map(({ label, inApp, email }) => {
            return (
              <tr
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-start',
                  // flexGrow: '1'
                }}
              >
                <td>
                  <Typography
                    className={`${classes.greytext} ${classes.title}`}
                    variant='caption'
                    gutterBottom
                  >
                    {label}
                  </Typography>
                </td>
                <td>
                  <Checkbox
                    disabled={inApp.disabled}
                    checked={inApp.checked}
                    // onChange={}
                    size='small'
                  />
                </td>
                <td>
                  <Checkbox
                    disabled={email.disabled}
                    checked={email.checked}
                    
                    // onChange={}
                    size='small'
                  />
                </td>
              </tr>
            );
          })}
        </table>
        <div>
          <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            Email Preference
          </Typography>
        </div>

        {EMAIL_PREFERENCE.map(({ label, checked, disabled }) => {
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
                // onChange={}
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
