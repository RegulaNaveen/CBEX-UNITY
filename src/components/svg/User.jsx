// @flow
import * as React from 'react';

type Props = {
  className: string,
};

const User = ({ className }: Props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" className={className}>
      <g transform="translate(2)" fill="#595959" fillRule="nonzero">
        <circle cx={10} cy={6.25} r={5.5} />
        <path d="M10 13.25a9.511 9.511 0 00-9.5 9.5.5.5 0 00.5.5h18a.5.5 0 00.5-.5 9.511 9.511 0 00-9.5-9.5z" />
      </g>
    </svg>
  );
};

export default User;
