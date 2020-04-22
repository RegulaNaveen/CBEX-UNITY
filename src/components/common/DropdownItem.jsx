// @flow
import React, { PureComponent } from 'react';

type Props = {
  onClick: Function,
  item: string
};

class DropdownItem extends PureComponent<Props> {
  handleClick = () => {
    const { onClick, item } = this.props;
    onClick(item);
  };

  render() {
    const { item } = this.props;

    return (
      <li
        role="presentation"
        className="dd-list-item"
        onClick={this.handleClick}
      >
        {item}
      </li>
    );
  }
}

export default DropdownItem;
