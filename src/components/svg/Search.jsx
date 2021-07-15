// @flow
import * as React from 'react';

type Props = {
  className: string,
};

const Search = ({ className }: Props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" className={className}>
      <path
        d="M23.384 21.619l-6.529-6.529a9.284 9.284 0 10-1.768 1.768l6.529 6.529c.492.48 1.276.48 1.768 0a1.251 1.251 0 000-1.768zM2.75 9.5a6.75 6.75 0 116.75 6.75A6.758 6.758 0 012.75 9.5z"
        fill="#fff"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default Search;
