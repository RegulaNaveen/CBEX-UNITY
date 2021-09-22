import React from 'react';
import Chip from 'apollo-react/components/Chip';
import Check from 'apollo-react-icons/Check';
import PropTypes from 'prop-types';

const ChipView = ({ bgcolor, label, size, answer }) => {
  return (
    <div>
      <Chip
        icon={answer ? <Check /> : ''}
        size={size || 'small'}
        label={label}
        style={{
          backgroundColor: bgcolor || '#0869fd',
          borderColor: bgcolor || '#0869fd',
          fontFamily: 'ProximaNova-Regular',
          paddingLeft: 10,
          paddingRight: 10
        }}
      />
    </div>
  );
};
ChipView.propTypes = {
  bgcolor: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  answer: PropTypes.string
};
ChipView.defaultProps = {
  bgcolor: '',
  label: '',
  size: '',
  answer: ''
};
export default ChipView;
