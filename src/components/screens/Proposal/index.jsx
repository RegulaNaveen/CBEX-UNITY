// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import {
  getProposal,
  onGetValidatedProposalDetails,
} from '../../../redux/actions/proposal-actions';
import { onRefreshUserData } from '../../../redux/actions/sso-auth-actions';
import {
  getIsOpen,
  getPendingValidatedItems,
  getProposalDetails,
  isProposalLoading,
} from '../../../redux/selectors';
import Questions from './Questions';
import Toolbar from '../../views/toolbar';
import TabButtons from '../../common/TabButtons';
import Documents from './Documents';
import Validate from './Validate';
import MatomoHOC from '../../HOC/MatomoHOC';

type State = {
  selectedView: string,
};

type Props = {
  authData: Map,
  details: Map,
  match: Match,
  isLoading: boolean,
  isSidebarOpen: boolean,
  notifications: number,
  getRefreshAuthData: Function,
  getProposalInfo: Function,
  getValidatedData: (proposalId: string) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  trackPageView: any,
  proposalDetail: any,
};

export class Proposal extends Component<Props, State> {
  toRef;

  constructor(props: Object) {
    super(props);

    this.state = {
      selectedView: 'questions',
      enableValidateTab: false,
    };
  }

  componentDidMount() {
    const {
      getProposalInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,
      trackPageView,
      eventCategories,
      match: { params },
    } = this.props;

    const selectedView = localStorage.getItem('proposalTypeView');

    if (selectedView) this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    getProposalInfo(params.id);
    getValidatedData(params.id);

    window.addEventListener('storage', (e) => this.handleStorageChange(e));

    const enableValidateTab = localStorage.getItem('enableValidateTab');
    if (enableValidateTab === null) {
      localStorage.setItem('enableValidateTab', false);
    } else if (enableValidateTab === 'true') {
      this.setState({
        enableValidateTab: true,
      });
    }

    // Track Page view
    trackPageView({
      documentTitle: `${eventCategories.plainPd}`,
      href: 'https://dev-unity.iqvia.app',
    });
  }

  componentWillUnmount() {
    localStorage.removeItem('proposalTypeView');
    localStorage.removeItem('proposalId');

    window.removeEventListener('storage', this.handleStorageChange);
  }

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
    this.trackMatomoEventTabs(selectedView);
  };

  trackMatomoEventTabs = (tab) => {
    const {
      eventCategories,
      userActions,
      proposalDetail,
      trackEvent,
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Tab: ${userActions.click} On ${tab}`,
      href: 'https://dev-unity.iqvia.app',
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail),
        },
      ],
    });
  };

  handleStorageChange(e) {
    if (e.key === 'enableValidateTab') {
      const isEnabled = e.newValue === 'true';
      const { selectedView: selectedViewState } = this.state;
      this.setState({
        enableValidateTab: isEnabled,
        selectedView:
          !isEnabled && selectedViewState === 'validate'
            ? 'questions'
            : selectedViewState,
      });
    }
  }

  renderContent = () => {
    const { selectedView, enableValidateTab } = this.state;
    const { isLoading, details, notifications } = this.props;

    const viewsMap = {
      questions: <Questions />,
      documents: <Documents />,
      // validate: <Validate />
    };

    if (enableValidateTab) {
      viewsMap.validate = <Validate />;
    }

    const { 'CRM #': crm } = details;
    const placeholder = 'No data';

    if (isLoading)
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );

    return (
      <div className="proposal-details">
        <h1>{crm || placeholder}</h1>
        {enableValidateTab ? (
          <TabButtons
            elements={[
              { tabName: 'questions' },
              { tabName: 'documents' },
              { tabName: 'validate', notifications },
            ]}
            selectedView={selectedView}
            onChangeView={this.onChangeProposalView}
          />
        ) : (
          <TabButtons
            elements={[
              { tabName: 'questions' },
              { tabName: 'documents' },
              // { tabName: 'validate', notifications }
            ]}
            selectedView={selectedView}
            onChangeView={this.onChangeProposalView}
          />
        )}
        {viewsMap[selectedView]}
      </div>
    );
  };

  render() {
    const { isSidebarOpen } = this.props;

    return (
      <div
        className={classNames('proposal-wrapper', {
          'is-collapsed': isSidebarOpen,
        })}
      >
        <Toolbar />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  details: getProposalDetails(state),
  isLoading: isProposalLoading(state),
  isSidebarOpen: getIsOpen(state),
  notifications: getPendingValidatedItems(state),
  proposalDetail: getProposalDetails(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: onRefreshUserData,
    getProposalInfo: getProposal,
    getValidatedData: onGetValidatedProposalDetails,
  })
)(MatomoHOC(Proposal));
