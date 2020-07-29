// @flow
import React, { PureComponent } from 'react';

type Props = {
  onClick: Function,
  item: any,
  index: Number,
  selected: Number
};

class TabItem extends PureComponent<Props> {
  handleClick = () => {
    const { onClick, index } = this.props;
    onClick(index);
  };

  render() {
    const { item, index, selected } = this.props;
    const style = index === selected ? 'selected' : '';
    return (
      <li role="presentation" className={style} onClick={this.handleClick}>
        {item.props.label}
      </li>
    );
  }
}

export default TabItem;
