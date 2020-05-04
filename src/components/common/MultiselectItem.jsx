// @flow
import React, { PureComponent } from 'react';

type Props = {
  onClick: Function,
  item: string
};

class MultiselectItem extends PureComponent<Props> {
  handleClick = () => {
    const { onClick, item } = this.props;
    onClick(item);
  };

  render() {
    const { item } = this.props;

    return (
      <li
        role="presentation"
        className="multiselect-list-item"
        onClick={this.handleClick}
      >
        {item}
      </li>
    );
  }
}

export default MultiselectItem;
