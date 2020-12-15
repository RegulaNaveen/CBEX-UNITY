// @flow
import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import type { Node } from 'react';

type Props = {
  child: Node,
  title: string,
  content: Node,
  backgroundColor?: string,
  color?: string,
  width?: string
};

type State = {
  position: string
};

class ToolTip extends Component<Props, State> {
  static defaultProps = {
    backgroundColor: '#444444',
    color: '#ffffff',
    width: '200px'
  };

  tooltip: any;

  constructor(props: Object) {
    super(props);

    this.tooltip = createRef();

    this.state = {
      position: ''
    };
  }

  componentDidMount() {
    const element = this.tooltip.current;
    const bounding = element ? element.getBoundingClientRect() : null;

    if (bounding) {
      if (
        bounding.right >
        (window.innerWidth || document.documentElement.clientWidth)
      )
        this.setState({ position: 'bottom' });
    }
  }

  render() {
    const { child, title, content, backgroundColor, color, width } = this.props;
    const { position } = this.state;

    return (
      <div className="tooltip-wrapper">
        <div className="child">{child}</div>
        <div
          className={classNames('tooltip', {
            [`${position}-position`]: position
          })}
          ref={this.tooltip}
          style={{ backgroundColor, width, color }}
        >
          <p>{title}</p>
          {content}
        </div>
      </div>
    );
  }
}

export default ToolTip;
