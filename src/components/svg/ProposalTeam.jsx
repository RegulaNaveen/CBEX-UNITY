import * as React from 'react';
import PresentationAudience from 'apollo-react-icons/PresentationAudience';

const SvgComponent = props => {
  return (
    <svg width={48} height={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>{'Team'}</title>
      <PresentationAudience style={{ color: props.fill }} />
    </svg>
  );
};

export default SvgComponent;
