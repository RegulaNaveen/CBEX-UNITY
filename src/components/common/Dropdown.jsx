// @flow
import React, { PureComponent } from 'react';
import DropdownItem from './DropdownItem';

type Props = {
  id?: string,
  placeholder?: string,
  items: Array<Object>,
  title?: string,
  onClick: Function,
  value?: string
};

type State = {
  isCollapsed: boolean,
  selectedValue: string
};

class Dropdown extends PureComponent<Props, State> {
  static defaultProps = {
    id: undefined,
    placeholder: '',
    title: undefined,
    value: undefined
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
    const { onClick } = this.props;
    onClick(value);
    this.setState({ selectedValue: value }, () => {
      this.handleCollapse();
    });
  };

  render() {
    const { isCollapsed, selectedValue } = this.state;
    const { id, placeholder, items, title, value } = this.props;

    return (
      <>
        {title && <p className="dd-title">{title}</p>}
        <div className="dd-wrapper">
          <div
            id={id}
            className="dd-header"
            role="presentation"
            onClick={this.handleCollapse}
          >
            {selectedValue || value ? (
              <div className="dd-header-selected">{selectedValue || value}</div>
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
                    item={item}
                    key={item}
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
