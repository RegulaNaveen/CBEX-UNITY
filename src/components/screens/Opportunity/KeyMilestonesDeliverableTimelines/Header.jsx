import Typography from 'apollo-react/components/Typography';
import React from 'react';

const Header = () => {
  return (
    <>
      <Typography variant="h3">
        Key Milestones & Deliverable Timelines
      </Typography>
      <hr style={{ marginTop: '15px' }} className="key-milestone-divider-hr" />
    </>
  );
};

export default Header;
