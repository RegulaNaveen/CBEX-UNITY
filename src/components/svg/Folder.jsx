// @flow
import * as React from 'react';

type Props = {
  className: string
};

const Folder = ({ className }: Props) => {
  return (
    <svg height={36} viewBox="0 0 24 24" width={36} className={className}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
        fill="#105bff"
      />
    </svg>
  );
};

export default Folder;
