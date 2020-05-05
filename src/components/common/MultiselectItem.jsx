// @flow
import React, { PureComponent } from 'react';

type Props = {
  onClick: Function,
  item: string,
  isSelected: boolean
};

class MultiselectItem extends PureComponent<Props> {
  handleClick = () => {
    const { onClick, item } = this.props;
    onClick(item);
  };

  render() {
    const { item, isSelected } = this.props;
    return (
      <li
        role="presentation"
        className={
          isSelected
            ? 'multiselect-list-item selected'
            : 'multiselect-list-item'
        }
        onClick={this.handleClick}
      >
        {item}
      </li>
    );
  }
}

export default MultiselectItem;
