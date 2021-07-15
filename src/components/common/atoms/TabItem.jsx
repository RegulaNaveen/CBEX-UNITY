// @flow
import React from 'react';
import classnames from 'classnames';

type Props = {
  onClick: Function,
  item: any,
  index: number,
  selected: number,
};

const TabItem = ({ onClick, item, index, selected }: Props) => {
  function handleClick() {
    onClick(index);
  }

  return (
    <li
      role="presentation"
      className={classnames(index === selected && 'selected')}
      onClick={handleClick}
    >
      {item.props.label}
    </li>
  );
};

export default TabItem;
