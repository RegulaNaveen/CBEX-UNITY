// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { ListView, CardView } from '../svg';

type Props = {
  getSelectedTab: (selectedTab: number) => void
};

type State = {
  activeView: 0 | 1
};

class SwitchView extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      activeView: 0
    };
  }

  setViewToList = () => {
    const { getSelectedTab } = this.props;
    this.setState({ activeView: 0 }, () => getSelectedTab(0));
  };

  setViewToGrid = () => {
    const { getSelectedTab } = this.props;
    this.setState({ activeView: 1 }, () => getSelectedTab(1));
  };

  render() {
    const { activeView } = this.state;

    return (
      <div className="switch-view">
        <button type="button" onClick={this.setViewToList}>
          <ListView
            className={classNames('switch-view__icon', {
              'is-active': activeView === 0
            })}
          />
        </button>
        <button type="button" onClick={this.setViewToGrid}>
          <CardView
            className={classNames('switch-view__icon', {
              'is-active': activeView === 1
            })}
          />
        </button>
      </div>
    );
  }
}

export default SwitchView;
