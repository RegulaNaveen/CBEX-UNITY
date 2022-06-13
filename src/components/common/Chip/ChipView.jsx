import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
// import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';
import {selectColors} from './Color';

const ChipView = ({ label, answer }) => {
  let dynamiclabel = null;
  let color =null;
  let colorhex = null;
  
    if(typeof label === 'object'){
      const parsedata = JSON.parse(label)
      label = parsedata.Name;
      colorhex = parsedata.Color;
      {selectColors.map((item) => {
        if(_.isEqual(colorhex, item.color)){ 
          color= item.label.toLowerCase() }
          
      }
      )}
  
      //console.log(dynamiclabel)
    }
    else if(typeof label === 'string'){
      label = label;
    }
    {selectColors.map((item) => {
      if(_.isEqual(colorhex, item.color)){ 
        color= item.label.toLowerCase() }
        
    }
    )}
    console.log(color)
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

          variant={color}


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
