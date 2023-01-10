import Typography from 'apollo-react/components/Typography';
import React from 'react';

const Header = () => {
  return (
    <>
      <Typography className="title" variant="h3">
        Questions for the Customer
      </Typography>
      <Typography className="subtitle" variant="body1">
        Add questions and answers as needed
      </Typography>
      <hr className="divider-hr" />
    </>
  );
};

export default Header;
