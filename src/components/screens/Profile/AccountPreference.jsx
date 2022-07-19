import React from 'react';
import Card from 'apollo-react/components/Card';
import Typography from 'apollo-react/components/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from 'apollo-react/components/Button';
import TextField from 'apollo-react/components/TextField';
import Checkbox from 'apollo-react/components/Checkbox';

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
const AccountPreference = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(true);

  const handleChange = (e, checked) => {
    setValue(checked);
  };
  return (
    <div>
      <Card interactive style={{ maxWidth: 450, height: 380 ,margin:'10px'}}>
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
            luke.skywalker@iqvia.com
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
        <div
          className={`${classes.boldtext} `}
          style={{ margin: '0px 10px 0px 10px' }}
        >
          <Checkbox
            label={
              <Typography
                className={`${classes.boldtext} `}
                variant='caption'
                gutterBottom
              >
                By default, filter opportunity questions by MY User Role
              </Typography>
            }
            checked={value}
            onChange={handleChange}
            size="small"
          />
        </div>
        <div
          className={`${classes.boldtext} `}
          style={{ margin: '0px 10px 10px 10px' }}
        >
          <Checkbox
            label={
              <Typography
                className={`${classes.boldtext} `}
                variant='caption'
                gutterBottom
              >
                By default, filter opportunity by Interested party Questions
              </Typography>
            }
            checked={value}
            onChange={handleChange}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
};

export default AccountPreference;
