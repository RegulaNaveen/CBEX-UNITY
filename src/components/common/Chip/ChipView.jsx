import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';

const ChipView = ({ label, answer }) => {
  return (
    <div>
      <Tooltip title={ label } placement="top">
        <Tag
          Icon={ answer ? Check : '' }
          label={ label }
          variant={ answer ? 'green' : 'blue' }
        />
      </Tooltip>
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
