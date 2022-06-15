import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
// import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';
import {selectColors} from './Color';

const ChipView = ({ label, answer }) => {
  let color;
  let milestonetojs;
  if(typeof label === 'object'){
//console.log(typeof label)
milestonetojs = label.toJS()
//console.log(milestonetojs)
if(milestonetojs.length > 0 ){
  label = milestonetojs[0].Name
color = milestonetojs[0].Color}
console.log(typeof label)
selectColors.map((item) => {
  if(_.isEqual(color, item.color)){ 
    color= item.label.toLowerCase() }
    
}
)
return (
  <>
    <Tooltip title={typeof label === 'string' ? label : null} placement="top">
      <Tag
        Icon={''}
        label={label}

        variant={color}


      />
    </Tooltip>
  </>
);
  }
  else if(typeof label === "string" && label.length > 0){
    label = label;
    console.log(label)
    return (
      <>
        <Tooltip title={label} placement="top">
          <Tag
            Icon={''}
            label={label}
  
            variant={answer ? 'green' :'blue'}
  
  
          />
        </Tooltip>
      </>
    );
  }
  
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
