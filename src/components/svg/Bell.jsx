// @flow
import * as React from 'react';

type Props = {
  className: string,
};

const Bell = ({ className }: Props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" className={className}>
      <g fill="#fff" fillRule="nonzero">
        <path d="M14.236 21H9.764a.25.25 0 00-.248.222 2.5 2.5 0 104.968 0 .248.248 0 00-.248-.222zM21.446 19.276a16.366 16.366 0 01-1.746-7.332v-.768a9.114 9.114 0 00-3.866-7.622 6.379 6.379 0 00-2.334-.918V1.5a1.5 1.5 0 00-3 0v1.149a6.738 6.738 0 00-2.851 1.277 9.2 9.2 0 00-3.349 7.25v.768a16.366 16.366 0 01-1.746 7.332A.5.5 0 003 20h18a.5.5 0 00.446-.725v.001z" />
      </g>
    </svg>
  );
};

export default Bell;
