import React from 'react';
import Card from 'apollo-react/components/Card';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from 'apollo-react/components/Typography';
import Checkbox from 'apollo-react/components/Checkbox';

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
  const [value, setValue] = React.useState(true);

  const handleChange = (e, checked) => {
    setValue(checked);
  };
  return (
    <div>
      <Card
        interactive
        style={{ maxWidth: 500, height: 450, margin: '10px 10px 0 10px' }}
      >
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
            flexGrow:'1'
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
        <table style={{ height: 250, overflowY: 'scroll', display: 'block' }}>
          <tr
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignSelf: 'flex-start',
            }}
          >
            <td>
              <Typography
                className={`${classes.greytext} ${classes.title}`}
                variant='caption'
                gutterBottom
              >
                Assigned to an opportunity
              </Typography>
            </td>
            <td>
              <Checkbox
                // label={
                //   <Typography
                //     className={`${classes.boldtext} `}
                //     variant='caption'
                //     gutterBottom
                //   >
                //     By default, filter opportunity by Interested party Questions
                //   </Typography>
                // }
                checked={value}
                onChange={handleChange}
                size='small'
              />
            </td>
            <td>
              <Checkbox
                // label={
                //   <Typography
                //     className={`${classes.boldtext} `}
                //     variant='caption'
                //     gutterBottom
                //   >
                //     By default, filter opportunity by Interested party Questions
                //   </Typography>
                // }
                checked={value}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignSelf: 'flex-start',
            }}
          >
            <td>
              <Typography
                className={`${classes.greytext} ${classes.title}`}
                variant='caption'
                gutterBottom
              >
                Assigned to an opportunity
              </Typography>
            </td>
            <td>
              <Checkbox
                // label={
                //   <Typography
                //     className={`${classes.boldtext} `}
                //     variant='caption'
                //     gutterBottom
                //   >
                //     By default, filter opportunity by Interested party Questions
                //   </Typography>
                // }
                checked={value}
                onChange={handleChange}
                size='small'
              />
            </td>
            <td>
              <Checkbox
                // label={
                //   <Typography
                //     className={`${classes.boldtext} `}
                //     variant='caption'
                //     gutterBottom
                //   >
                //     By default, filter opportunity by Interested party Questions
                //   </Typography>
                // }
                checked={value}
                onChange={handleChange}
              />
            </td>
          </tr>
         
          <tr
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignSelf: 'flex-start',
            }}
          >
            <td>
              <Typography
                className={`${classes.greytext} ${classes.title}`}
                variant='caption'
                gutterBottom
              >
                Assigned to an opportunity
              </Typography>
            </td>
            <td>
              <Checkbox
                // label={
                //   <Typography
                //     className={`${classes.boldtext} `}
                //     variant='caption'
                //     gutterBottom
                //   >
                //     By default, filter opportunity by Interested party Questions
                //   </Typography>
                // }
                checked={value}
                onChange={handleChange}
                size='small'
              />
            </td>
            <td>
              <Checkbox
                // label={
                //   <Typography
                //     className={`${classes.boldtext} `}
                //     variant='caption'
                //     gutterBottom
                //   >
                //     By default, filter opportunity by Interested party Questions
                //   </Typography>
                // }
                checked={value}
                onChange={handleChange}
              />
            </td>
          </tr>
         
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
                Real time email updates
              </Typography>
            }
            checked={value}
            onChange={handleChange}
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
                Hourly email digest
              </Typography>
            }
            checked={value}
            onChange={handleChange}
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
                once daily email digest
              </Typography>
            }
            checked={value}
            onChange={handleChange}
          />
        </div>
      </Card>
    </div>
  );
};

export default NotificationPreference;
