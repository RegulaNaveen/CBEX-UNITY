import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
// import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';

const ChipView = ({ label, answer }) => {
  return (
    <>
      <Tooltip title={label} placement="top">
        <Tag
          Icon={''}
          label={
            label.split(' ')[0].length <= 11
              ? label.split(' ')[0]
              : `${label.split(' ')[0].substr(0, 8)}...`
          }
          variant={answer ? 'green' : 'blue'}
        />
      </Tooltip>
    </>
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
