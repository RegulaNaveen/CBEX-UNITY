// @flow
import React, { Component } from 'react';

type Props = {
  id: string,
  placeholder: string,
  items: Array<Object>,
  title: string
};

type State = {
  isCollapsed: boolean
};

class Dropdown extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false
    };
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
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
                <li className="dd-list-item" key={item.id}>
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
