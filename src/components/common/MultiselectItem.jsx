// @flow
import React, { PureComponent } from 'react';
import { Check } from '../svg';

type Props = {
  onClick: Function,
  item: string,
  isSelected: boolean
};

class MultiselectItem extends PureComponent<Props> {
  handleClick = (event: SyntheticEvent<EventTarget>) => {
    const { onClick, item } = this.props;
    onClick(event, item);
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
        <div className="multiselect-icon">{isSelected ? <Check /> : null}</div>
        {item}
      </li>
    );
  }
}

export default MultiselectItem;
