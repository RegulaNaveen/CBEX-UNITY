// @flow
import React, { Component } from 'react';

type Props = {
  id: string,
  placeholder: string,
  items: Array<Object>,
  title: string
};

type State = {
  isCollapsed: boolean,
  selectedValue: string
};

class Dropdown extends Component<Props, State> {
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

  onClick = (value: string) => {
    this.setState({ selectedValue: value }, () => {
      this.handleCollapse();
    });
    console.log(value);
  };

  render() {
    const { isCollapsed } = this.state;
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
            <div className="dd-header-title">{placeholder}</div>
          </div>
          {isCollapsed && (
            <ul className="dd-list">
              {items.map(item => (
                <li
                  role="presentation"
                  className="dd-list-item"
                  key={item.id}
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={() => this.onClick(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }
}

export default Dropdown;
