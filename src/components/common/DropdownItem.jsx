// @flow
import React, { Component } from 'react';

type Props = {
  onClick: Function,
  id: string,
  item: string
};

type State = {};

class DropdownItem extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {};
  }

  handleClick = () => {
    const { onClick, item } = this.props;
    onClick(item);
  };

  render() {
    const { id, item } = this.props;

    return (
      <li
        role="presentation"
        className="dd-list-item"
        key={id}
        onClick={this.handleClick}
      >
        {item}
      </li>
    );
  }
}

export default DropdownItem;
