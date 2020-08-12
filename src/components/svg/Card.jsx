// @flow
import * as React from 'react';

type Props = {
  className: string,
  fill?: string
};

const Card = ({ className, fill }: Props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" className={className}>
      <defs>
        <path
          id="prefix__card__a"
          d="M10 13a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7a1 1 0 011-1h7zm11 0a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1h7zM10 2a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h7zm11 0a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1V3a1 1 0 011-1h7z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <mask id="prefix__card__b" fill="#fff">
          <use xlinkHref="#prefix__card__a" />
        </mask>
        <g fill={fill} mask="url(#prefix__card__b)">
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};

Card.defaultProps = {
  fill: '#000'
};

export default Card;
