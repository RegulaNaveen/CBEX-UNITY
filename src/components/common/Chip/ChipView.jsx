import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
import Check from 'apollo-react-icons/Check';

const ChipView = ({ label, answer }) => {
  return (
    <div>
      <Tag
        Icon={answer ? Check : ''}
        label={label}
        variant={answer ? 'green' : 'blue'}
      />
    </div>
  );
};
ChipView.propTypes = {
  label: PropTypes.string,
  answer: PropTypes.string
};
ChipView.defaultProps = {
  label: '',
  answer: ''
};
export default ChipView;
