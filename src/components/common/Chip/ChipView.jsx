import React from 'react';
import Tag from 'apollo-react/components/Tag';
import PropTypes from 'prop-types';
// import Check from 'apollo-react-icons/Check';
import Tooltip from 'apollo-react/components/Tooltip';
import {selectColors} from './Color';

const ChipView = ({ label, answer }) => {
  let dynamiclabel = null;
  let color =null;
  let diff = /([[])/g
  if(label.match(diff)){
console.log(label)
console.log(JSON.parse(label))
dynamiclabel = JSON.parse(label)[0].Name
color = JSON.parse(label)[0].Color
console.log(color)
{selectColors.map((item) => {
  if(_.isEqual(color, item.color)){ 
    color= item.label.toLowerCase() }
    
}
)}
  }
  else {
    dynamiclabel = label;
  }

  return (
    <>
      <Tooltip title={dynamiclabel} placement="top">
        <Tag
          Icon={''}
          label={
            dynamiclabel.split(' ')[0].length <= 11
              ? dynamiclabel.split(' ')[0]
              : `${dynamiclabel.split(' ')[0].substr(0, 8)}...`
          }

          variant={color || 'blue'}


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
