// @flow
import * as React from 'react';

type Props = {
  className: string
};

const Card = ({ className }: Props) => {
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
          d="M10 13a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7a1 1 0 011-1h7zm11 0a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1h7zM10 2a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h7zm11 0a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1V3a1 1 0 011-1h7z"
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

export default Card;
