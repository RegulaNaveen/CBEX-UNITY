// @flow
import * as React from 'react';

type Props = {
  className?: string,
  style?: object
};

const Intermediate = ({ className, style }: Props) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={className}
      style={style}
    >
      <path
        d="M14.783 0c.48 0 .87.392.87.875v1.531c0 .121.097.219.217.219h2.39c.961 0 1.74.784 1.74 1.75V19.25c0 .966-.779 1.75-1.74 1.75H1.74C.778 21 0 20.216 0 19.25V4.375c0-.966.779-1.75 1.74-1.75h1.303c.24 0 .435.196.435.438V5.03c0 .363.292.657.652.657l.097-.008a.655.655 0 00.556-.649V.875c0-.483.389-.875.87-.875.48 0 .869.392.869.875v1.532c0 .12.097.218.217.218h5.435c.24 0 .435.196.435.438V5.03c0 .363.292.657.652.657l.096-.008a.655.655 0 00.556-.649V.875c0-.483.39-.875.87-.875zm3.043 7.875H2.174a.436.436 0 00-.435.438v10.5c0 .241.195.437.435.437h15.652c.24 0 .435-.196.435-.438v-10.5a.436.436 0 00-.435-.437zM14 13a1 1 0 010 2H6a1 1 0 010-2h8z"
        fill="current"
        fillRule="nonzero"
      />
    </svg>
  );
};

Intermediate.defaultProps = {
  className: ''
};

export default Intermediate;
