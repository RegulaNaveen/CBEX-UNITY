// @flow
import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';

type Props = {
  id?: string,
  placeholder: string,
  items: Array<Object>,
  title: string
};

type State = {
  isCollapsed: boolean,
  selectedValue: string
};

class Dropdown extends PureComponent<Props, State> {
  static defaultProps = {
    id: undefined
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false,
      selectedValue: ''
    };
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleClick = (value: string) => {
    this.setState({ selectedValue: value }, () => {
      this.handleCollapse();
    });
  };

  render() {
    const { isCollapsed, selectedValue } = this.state;

    const { id, placeholder, items, title } = this.props;
    return (
      <>
        <p className="dd-title">{title}</p>
        <div className="dd-wrapper">
          <div
            id={id}
            className="dd-header"
            role="presentation"
            onClick={this.handleCollapse}
          >
            {selectedValue ? (
              <div className="dd-header-selected">{selectedValue}</div>
            ) : (
              <div className="dd-header-placeholder">{placeholder}</div>
            )}
          </div>
          {isCollapsed && (
            <ul className="dd-list">
              {items &&
                items.map(item => (
                  <DropdownItem
                    onClick={this.handleClick}
                    item={item.title}
                    key={item.id}
                  />
                ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

export default Dropdown;
