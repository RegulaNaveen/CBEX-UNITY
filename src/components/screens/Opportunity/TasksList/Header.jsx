import Typography from 'apollo-react/components/Typography';
import React from 'react';
import classNames from 'classnames';

const Header = () => {
  return (
    <>
      <Typography variant="h3">Task List</Typography>
      <hr style={{ marginTop: '15px' }} className="task-list-divider-hr" />
    </>
  );
};

export default Header;
