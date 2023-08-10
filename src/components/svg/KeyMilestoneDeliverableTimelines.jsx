import React from 'react';
import { Clock } from 'apollo-react-icons';

const SvgComponent = props => {
  console.log('props', props);
  return (
    <svg width={48} height={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>{'Key Milestone & deliverable timelines'}</title>

      <Clock style={{ color: props.fill }} />
    </svg>
  );
};

export default SvgComponent;
