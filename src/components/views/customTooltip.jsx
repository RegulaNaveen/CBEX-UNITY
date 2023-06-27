import { fontSize, fontWeight } from '@mui/system';
import React, { useState } from 'react';

// Example custom tooltip component
const CustomTooltip = ({ children, title }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#444444',
            color: '#ffffff',
            border: 'solid 1px #444444',
            padding: '2px',
            borderRadius: '4px',
            zIndex: '999',
            fontSize: '13px',
            fontWeight: '400',
            lineHeight: '1.54',
            inset: '-39px auto auto 20px'
          }}
        >
          {title}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderTop: '6px solid #444444',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
