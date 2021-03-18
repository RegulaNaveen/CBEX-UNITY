// @flow
import React, { PureComponent } from 'react';

type Props = {
  onClick: Function,
  item: string
};

class DropdownItem extends PureComponent<Props> {
  handleClick = (event: SyntheticEvent<EventTarget>) => {
    const { onClick, item } = this.props;
    onClick(event, item);
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
