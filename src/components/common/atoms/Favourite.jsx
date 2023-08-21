import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'apollo-react/components/IconButton';
import StarOutline from 'apollo-react-icons/StarOutline';
import StarSolid from 'apollo-react-icons/StarSolid';

export default function Favourite({ value, onToggle }) {
  return (
    <IconButton
      color="primary"
      onClick={() => onToggle(!value)}
      className="fav-icon-button"
    >
      {value ? (
        <StarSolid style={{ color: '#fe9406' }} />
      ) : (
        <StarOutline style={{ color: '#999999' }} />
      )}
    </IconButton>
  );
}

Favourite.propTypes = {
  value: PropTypes.bool,
  onToggle: PropTypes.func
};

Favourite.defaultProps = {
  value: false,
  onToggle: () => {}
};
