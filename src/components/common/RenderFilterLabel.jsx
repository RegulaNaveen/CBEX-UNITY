import Typography from 'apollo-react/components/Typography';
import React from 'react';

function RenderFilterLabel({ labelText, showColor = false, color }) {
  if (showColor) {
    return (
      <span style={{ display: 'inline-flex', gap: '4px' }}>
        <span className="tag-box" style={{ backgroundColor: color }}></span>
        <Typography>{labelText}</Typography>
      </span>
    );
  } else {
    return <Typography>{labelText}</Typography>;
  }
}

export default RenderFilterLabel;
