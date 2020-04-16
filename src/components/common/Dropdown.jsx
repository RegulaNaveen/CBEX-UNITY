// @flow
import React, { Component } from 'react';

type Props = {
  items: Array<Object>,
  title: string
};

type State = {};

class Dropdown extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, title } = this.props;
    return (
      <>
        <p className="dd-title">{title}</p>
        <select className="dd-list">
          {items.map(item => (
            <option className="dd-list-item" key={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </>
    );
  }
}

export default Dropdown;
