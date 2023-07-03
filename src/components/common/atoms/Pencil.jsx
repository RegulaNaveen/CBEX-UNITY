import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'apollo-react/components/IconButton';
import Pencil from 'apollo-react-icons/Pencil';

export default function Edit({ onClick }) {
  return (
    <IconButton
      color="primary"
      onClick={() => onClick()}
      className="edit-icon-button"
    >
      <Pencil style={{ color: '#999999' }} />
    </IconButton>
  );
}

Edit.propTypes = {
  onClick: PropTypes.func
};

Edit.defaultProps = {
  onClick: () => {}
};
