/* eslint-disable prefer-destructuring */
import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
import Tooltip from 'apollo-react/components/Tooltip';
import selectColors from './Color';

const ChipView = ({ label, answer }) => {
  let color;
  let milestonetojs = [];

  if (typeof label === 'object') {
    try {
      if (Array.isArray(label)) {
        milestonetojs = label;
      } else {
        milestonetojs = label.toJS();
      }
    } catch (error) {
      console.log(error);
    }
    if (milestonetojs.length) {
      label = milestonetojs[0].Name || '';
      color = milestonetojs[0].Color || '';
      selectColors.map(item => {
        if (_.isEqual(color, item.color)) {
          color = item.label;
        }
      });

      return (
        <>
          <Tooltip title={label} placement="top">
            <Tag Icon="" label={label} variant={color} />
          </Tooltip>
        </>
      );
    }
    return null;
  }
  if (typeof label === 'string' && label) {
    return (
      <>
        <Tooltip title={label} placement="top">
          <Tag Icon="" label={label} variant={answer ? 'green' : 'blue'} />
        </Tooltip>
      </>
    );
  }
  return null;
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
