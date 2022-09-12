// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Check } from '../../../svg';

type Props = {
  onClick: Function,
  item: string,
  isSelected: boolean,
  parentRef: any
};

class MultiselectItem extends Component<Props> {

  constructor(props) {
    super(props);
    this.itemRef = React.createRef();
  }

  handleClick = (event: SyntheticEvent<EventTarget>) => {
    const { onClick, item } = this.props;
    onClick(event, item);
  };

  componentDidUpdate(prevProps) {
    const { parentRef } = this.props;
    if (prevProps.focused !== this.props.focused && this.props.focused) {
      if (parentRef.current && this.itemRef.current) {
        parentRef.current.scrollTop = this.itemRef.current.offsetTop;
      }
    }
  }

  render() {
    const { item, isSelected, focused } = this.props;
    return (
      <li
        role="presentation"
        className={classNames({
          'multiselect-list-item': true,
          'selected': isSelected,
          'focused': focused
        })}
        ref={this.itemRef}
        onClick={this.handleClick}
      >
        <div className="multiselect-icon">{isSelected ? <Check /> : null}</div>
        {item}
      </li>
    );
  }
}

export default MultiselectItem;
