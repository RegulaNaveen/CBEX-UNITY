// @flow
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TabItem from './TabItem';

type Props = {
  children: any
};

type State = {
  selected: number
};

class Tabbar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  handleChange = (index: number) => this.setState({ selected: index });

  render() {
    const {
      props: { children },
      state: { selected }
    } = this;

    return (
      <div className="tab">
        <ul className="tab-title-wrapper">
          {children &&
            children.map((item, index) => (
              <TabItem
                key={uuidv4()}
                index={index}
                item={item}
                selected={selected}
                onClick={this.handleChange}
              />
            ))}
        </ul>
        <div className="tab-content-wrapper">{children[selected]}</div>
      </div>
    );
  }
}

export default Tabbar;
