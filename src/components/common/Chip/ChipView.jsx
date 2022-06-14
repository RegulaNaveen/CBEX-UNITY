import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
// import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';
import {selectColors} from './Color';

const ChipView = ({ label, answer }) => {
  let dynamiclabel = null;
  let color =null;
  let milestonetojs = null;
  if(typeof label === 'object'){
console.log(typeof label)
milestonetojs = label.toJS()
console.log(milestonetojs)
dynamiclabel = milestonetojs[0].Name
color = milestonetojs[0].Color
console.log(color)
{selectColors.map((item) => {
  if(_.isEqual(color, item.color)){ 
    color= item.label.toLowerCase() }
    
}
)}
  }
  else if(typeof label === "string"){
    dynamiclabel = label;
    console.log(dynamiclabel)
  }

  return (
    <>
      <Tooltip title={dynamiclabel} placement="top">
        <Tag
          Icon={''}
          label={dynamiclabel}

          variant={color ? color : answer ? 'green' :'blue'}


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
