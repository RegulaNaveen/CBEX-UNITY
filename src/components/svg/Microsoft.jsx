// @flow
import React from 'react';

type Props = {
  width: number,
  height: number
};

const Microsoft = ({ width, height }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 64 63" fill="none">
      <path
        fill="#fff"
        d="M0 0h30v30H0zM34 0h30v30H34zM0 33h30v30H0zM34 33h30v30H34z"
      />
    </svg>
  );
};

export default Microsoft;
