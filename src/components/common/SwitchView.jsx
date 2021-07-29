// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ListView, CardView } from '../svg';
import { getProposalTypeView } from '../../redux/selectors';
import MatomoHOC from '../HOC/MatomoHOC';

type Props = {
  getSelectedTab: (selectedTab: 0 | 1) => void,
  selectedViewType: 0 | 1,
  eventCategories: any,
  userActions: any,
  trackEvent: any
};

class SwitchView extends Component<Props> {
  setViewToList = () => {
    const { getSelectedTab } = this.props;
    getSelectedTab(0);
    this.trackMatomoEvent('List');
  };

  setViewToGrid = () => {
    const { getSelectedTab } = this.props;
    getSelectedTab(1);
    this.trackMatomoEvent('Card');
  };

  trackMatomoEvent = (view) => {
    const { eventCategories, userActions, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.dp,
      action: `View: ${userActions.click} On ${view} View`
    });
  };

  render() {
    const { selectedViewType } = this.props;

    return (
      <div className="switch-view">
        <button type="button" onClick={this.setViewToList}>
          <ListView
            className={classNames('switch-view__icon', {
              'is-active': selectedViewType === 0
            })}
          />
        </button>
        <button type="button" onClick={this.setViewToGrid}>
          <CardView
            className={classNames('switch-view__icon', {
              'is-active': selectedViewType === 1
            })}
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedViewType: getProposalTypeView(state)
});

export default connect(mapStateToProps)(MatomoHOC(SwitchView));
