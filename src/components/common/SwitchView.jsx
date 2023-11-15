// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ListView, CardView } from '../svg';
import { getProposalTypeView } from '../../redux/selectors';
import AnalyticsHOC from '../HOC/AnalyticsHOC';
import Tooltip from 'apollo-react/components/Tooltip';

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
    this.trackEvent('List');
  };

  setViewToGrid = () => {
    const { getSelectedTab } = this.props;
    getSelectedTab(1);
    this.trackEvent('Card');
  };

  trackEvent = view => {
    const { eventCategories, userActions, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.dp,
      action: `View: ${userActions.click} On ${view} View`
    });
  };

  render() {
    const { selectedViewType } = this.props;

    return (
      <div className="switch-view" data-testid="swicth-view">
        <Tooltip title="List View" placement="top">
          <span>
            <button
              type="button"
              onClick={this.setViewToList}
              data-testid="list-view"
            >
              <ListView
                className={classNames('switch-view__icon', {
                  'is-active': selectedViewType === 0
                })}
              />
            </button>
          </span>
        </Tooltip>
        <Tooltip title="Grid View" placement="top">
          <span>
            <button
              type="button"
              onClick={this.setViewToGrid}
              data-testid="card-view"
            >
              <CardView
                className={classNames('switch-view__icon', {
                  'is-active': selectedViewType === 1
                })}
              />
            </button>
          </span>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedViewType: getProposalTypeView(state)
});

export default connect(mapStateToProps)(AnalyticsHOC(SwitchView));
