// @flow
import * as React from 'react';

type Props = {
  className: string,
};

const RightArrow = ({ className }: Props) => {
  return (
    <svg height={20} viewBox="0 0 24 24" width={20} className={className}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#297DFD" />
    </svg>
  );
};

export default RightArrow;
