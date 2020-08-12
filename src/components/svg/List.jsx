// @flow
import * as React from 'react';

type Props = {
  className: string
};

const List = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <path
          id="prefix__a"
          d="M20.5 18a1.5 1.5 0 010 3h-17a1.5 1.5 0 010-3h17zm0-5a1.5 1.5 0 010 3h-17a1.5 1.5 0 010-3h17zm0-5a1.5 1.5 0 010 3h-17a1.5 1.5 0 010-3h17zm0-5a1.5 1.5 0 010 3h-17a1.5 1.5 0 010-3h17z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <mask id="prefix__b" fill="#fff">
          <use xlinkHref="#prefix__a" />
        </mask>
        <g fill="#000" mask="url(#prefix__b)">
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};

export default List;
