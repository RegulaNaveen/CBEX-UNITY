import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes, { string } from 'prop-types';
// import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';
import {selectColors} from './Color';
import {List, Map} from 'immutable'
const ChipView = ({ label, answer }) => {
  let dynamiclabel = null;
  let color =null;
  let milestonetojs = null;
  console.log(label)
  if(typeof label === 'object' || label.length > 0){
    milestonetojs = label.toJS() || ' ' 
    if(milestonetojs.length > 0){
dynamiclabel = milestonetojs[0].Name || ' '
color = milestonetojs[0].Color || ' '
    }
{selectColors.map((item) => {
  if(_.isEqual(color, item.color)){ 
    color= item.label.toLowerCase() }
}
)}
  }
  else {
    dynamiclabel = label;
    color = ''
  }
  return (
    <>
      <Tooltip title={dynamiclabel} placement="top">
        <Tag
          Icon={''}
          label={dynamiclabel
          }

          variant={color ? color : answer ? 'green' : 'blue' }


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
