import React from 'react';

const DayIndicator = () => {
  return (
    <svg
      width="5"
      height="27"
      viewBox="0 0 5 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="24"
        height="1"
        transform="rotate(90 3 3)"
        fill="#250056"
      />
      <circle
        cx="2.5"
        cy="2.5"
        r="2.5"
        transform="rotate(-180 2.5 2.5)"
        fill="#250056"
      />
    </svg>
  );
};

export default DayIndicator;
