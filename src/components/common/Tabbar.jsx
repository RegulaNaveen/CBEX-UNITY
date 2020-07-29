// @flow
import React, { Component } from 'react';
import TabItem from './TabItem';

type Props = {
  defaultSelected: Number,
  children: any
};

type State = {
  selected: Number
};

class Tabbar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  componentDidMount() {
    const { defaultSelected } = this.props;
    this.setState({ selected: defaultSelected || 0 });
  }

  handleChange = (index: Number) => {
    this.setState({ selected: index });
  };

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
                key={item}
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
