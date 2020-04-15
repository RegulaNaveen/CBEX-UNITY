// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import type { NavigationHistory } from 'react-router-dom';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../svg';

type State = {
  isCollapsed: boolean
};

type Props = {
  history: NavigationHistory
};

class Toolbar extends Component<Props, State> {
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

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleCollapse();
    }
  };

  render() {
    const { isCollapsed } = this.state;
    const { history } = this.props;
    return (
      <div className="toolbar-wrapper">
        <p className="toolbar-title-one">IQVIA™</p>
        <p className="toolbar-title-two">Unity</p>
        <div className="toolbar-navigation-wrapper">
          <p className="toolbar-navigation-title selected">Proposals</p>
        </div>
        <div className="toolbar-account-spacer">
          <div className="toolbar-account-wrapper">
            <div
              className={classnames(
                'toolbar-account-info',
                isCollapsed && 'expanded'
              )}
              id="menu-title"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              type="button"
              tabIndex={-1}
            >
              <p className="toolbar-account-info-title">Oliver Queen</p>
              <DropMenu className="toolbar-account-info-icon" />
            </div>
            {isCollapsed ? (
              <ToolbarMenu
                name="Oliver Queen"
                email="oliver.queen@iqvia.com"
                history={history}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
