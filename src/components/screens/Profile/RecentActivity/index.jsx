import Grid from 'apollo-react/components/Grid';
import React from 'react';
import ProfileLayout from '../ProfileLayout';

const RecentActivity = () => {
  return (
    <ProfileLayout>
      <Grid
        container
        item
        md={12}
        sm={12}
        xs={12}
        style={{ paddingTop: '1.2em', margin: '0' }}
        spacing={2}
      >
        Your Code goes here..
      </Grid>
    </ProfileLayout>
  );
};

export default RecentActivity;
