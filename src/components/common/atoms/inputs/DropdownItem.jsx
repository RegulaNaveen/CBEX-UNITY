// @flow
import React, { Component } from 'react';
import classNames from 'classnames';

type Props = {
  onClick: Function,
  item: string,
  focused: Boolean,
  parentOffsetTop: Number
};

class DropdownItem extends Component<Props> {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { parentRef } = this.props;
    if (prevProps.focused !== this.props.focused && this.props.focused) {
      console.log(this.props.item, this.props.focused);
      if (parentRef.current && this.itemRef.current) {
        parentRef.current.scrollTop = this.itemRef.current.offsetTop;
      }
    }
  }

  handleClick = (event: SyntheticEvent<EventTarget>) => {
    const { onClick, item } = this.props;
    onClick(event, item);
  };

  render() {
    const { item, focused } = this.props;

    return (
      <li
        ref={this.itemRef}
        role="option"
        className={classNames('dd-list-item', { active: focused })}
        onClick={this.handleClick}
        tabIndex={-1}
        id={item}
      >
        {item}
      </li>
    );
  }
}

export default DropdownItem;
