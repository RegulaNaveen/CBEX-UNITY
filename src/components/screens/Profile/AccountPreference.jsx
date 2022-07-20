import React, { useState } from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from 'apollo-react/components/Button';
import TextField from 'apollo-react/components/TextField';
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
  blacktext: {
    color: '#000',
    fontweight: '530',
    fontFamily: 'ProximaNova-Regular',
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
    padding: '10px',
  },
  button: {
    margin: '10px',
  },
}));
const AccountPreference = ({ name, email, role }) => {
  const classes = useStyles();


  return (
    <div>
      <Card interactive style={{ height: 380, margin: '10px' }}>
        <Typography
          className={`${classes.boldtext} ${classes.title}`}
          variant='title2'
          gutterBottom
        >
          Account Preference
        </Typography>
        <Typography
          className={`${classes.greytext} ${classes.title}`}
          variant='caption'
          gutterBottom
        >
          Email
        </Typography>
        <div>
          <Typography
            className={`${classes.boldtext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            {email}
          </Typography>
        </div>
        <div>
          <Button
            className={`${classes.button}`}
            variant='secondary'
            size='small'
          >
            Edit Profile Picture
          </Button>
        </div>
        <div style={{ maxWidth: 300, margin: '0px 10px 10px 10px' }}>
          {/* <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            
          </Typography> */}
          <TextField
            label='User Role'
            placeholder='Placeholder'
            helperText={
              <Typography
                className={classes.greytext}
                variant='caption'
                gutterBottom
                style={{ fontSize: '10px' }}
              >
                Your role will determine the visible questions in an opportunity
              </Typography>
            }
            size='small'
            fullWidth
            value={role}
          />
        </div>
        <div>
          <Typography
            className={`${classes.greytext} ${classes.title}`}
            variant='caption'
            gutterBottom
          >
            Opportunity Preference
          </Typography>
        </div>

        {OPPORTUNITY_PREFERENCE.map(({ label, checked, disabled }) => {
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

export default AccountPreference;
