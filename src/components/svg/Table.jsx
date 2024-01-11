import * as React from 'react';

const Table = ({ className, color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 4L2.04989 4.00057C2.27074 2.91128 3.19981 2.07904 4.33562 2.00532L4.5 2H19.5C20.8255 2 21.91 3.03154 21.9947 4.33562L22 4.5V19.5C22 20.8255 20.9685 21.91 19.6644 21.9947L19.5 22H4.5C3.17452 22 2.08996 20.9685 2.00532 19.6644L2 19.5V4ZM11 17H4V19.2C4 19.6078 4.30519 19.9444 4.69965 19.9938L4.8 20H11V17ZM20 17H13V20H19.2C19.6078 20 19.9444 19.6948 19.9938 19.3004L20 19.2V17ZM11 12H4V15H11V12ZM20 12H13V15H20V12ZM11 7H4V10H11V7ZM20 7H13V10H20V7Z"
        fill={color}
      />
    </svg>
  );
};

export default Table;
