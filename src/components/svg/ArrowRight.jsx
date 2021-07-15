// @flow
import * as React from 'react';

type Props = {
  className: string,
};

const ArrowRight = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M11.71 15.29l2.59-2.59a.996.996 0 000-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z" />
    </svg>
  );
};

export default ArrowRight;
