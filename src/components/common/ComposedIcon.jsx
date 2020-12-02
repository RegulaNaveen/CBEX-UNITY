// @flow
import React from 'react';
import { Check, Warning, Dash } from '../svg';

type Props = {
  iconType: string,
  width?: number,
  height?: number
};

const ComposedIcon = ({ iconType, width, height }: Props) => {
  const iconsMap = {
    match: {
      className: 'match',
      icon: (
        <Check
          width={width ? width - 7 : 18}
          height={height ? height - 7 : 18}
        />
      )
    },
    'no match': {
      className: 'no-match',
      icon: (
        <Warning
          width={width ? width - 7 : 18}
          height={height ? height - 7 : 18}
        />
      )
    },
    null: {
      className: 'null',
      icon: (
        <Dash
          width={width ? width - 7 : 18}
          height={height ? height - 7 : 18}
        />
      )
    }
  };

  return (
    <span
      className={`composed-icon ${iconsMap[iconType].className}-icon`}
      style={{ width, height }}
    >
      {iconsMap[iconType].icon}
    </span>
  );
};

ComposedIcon.defaultProps = {
  width: 25,
  height: 25
};

export default ComposedIcon;
