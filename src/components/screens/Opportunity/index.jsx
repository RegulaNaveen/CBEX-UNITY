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
  UpdateNewBid,
  expandAllSectionsAction,
  getOpportunity,
  onGetValidatedProposalDetails
} from '../../../redux/actions/proposal-actions';
import { onRefreshUserData } from '../../../redux/actions/sso-auth-actions';
import {
  getIsOpen,
  getPendingValidatedItems,
  getProposalDetails,
  getSelectedBid,
  isProposalLoading
} from '../../../redux/selectors';
import Toolbar from '../../views/toolbar';
import MatomoHOC from '../../HOC/MatomoHOC';
import UnityFooter from '../../common/Footer';
import UnityGrid from '../../common/atoms/inputs/Grid';
import UnityTab from '../../common/atoms/inputs/Tab';
import { onHandleOpenClose } from '../../../redux/actions/sidebar-actions';
import * as NewBid from './dummy.json';
import * as UpdateBid from './dummy2.json';
import { SOCKET_URL } from '../../../constants/api'
import Modal from 'apollo-react/components/Modal';

type State = {
  selectedView: string
};

type Props = {
  authData: Map,
  details: Map,
  match: Match,
  isLoading: boolean,
  isSidebarOpen: boolean,
  notifications: number,
  getRefreshAuthData: Function,
  getValidatedData: (proposalId: string) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  trackPageView: any,
  proposalDetail: any,
  getOpportunityInfo: (oppId: string) => void
};

export class Opportunity extends Component<Props, State> {
  toRef;
  constructor(props: Object) {
    super(props);
    this.state = {
      selectedView: 'questions',
      enableValidateTab: false
    };
  }
  connectsocket(){
    const {
      match: { params },
      AddNewBid
    } = this.props;
    this.socketconnection = null;
    this.socketconnection = new WebSocket(SOCKET_URL);
    this.socketconnection.onopen =  (event) => {
      if(params.id){
        this.socketconnection.send(JSON.stringify({
          action: 'ADD_OPPORTUNITY',
          body: {oppId : params.id}
        }));
      }
    };

    this.socketconnection.addEventListener('message',  (event) =>{
       AddNewBid(event.data);
    });

    // this.socketconnection.onclose = ()=>{
    //   setTimeout(()=>{
    //      this.connectsocket();
    //   }, 3000);
    // };

    // this.socketconnection.onerror = function(err) {
    //   console.error('Socket encountered error: ', err.message, 'Closing socket');
    //   this.socketconnection.close();
    // };
  }

  componentDidMount() {
    const {
      getOpportunityInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,
      expandAllSections,
      trackPageView,
      eventCategories,
      AddNewBid,
      location: { search },
      match: { params }
    } = this.props;
    // this.connectsocket();
    setTimeout(() => {
      AddNewBid(NewBid.data);
      setTimeout(() => {
        AddNewBid(UpdateBid.data);
        setTimeout(() => {
          getOpportunityInfo(params.id);
        }, 3000);
      }, 10000);
    }, 10000);
    expandAllSections(false);
    let selectedView = new URLSearchParams(search).get('viewType');
    if (selectedView && selectedView == "documents") this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    getOpportunityInfo(params.id);

    window.addEventListener('storage', e => this.handleStorageChange(e));

    const enableValidateTab = localStorage.getItem('enableValidateTab');
    if (enableValidateTab === null) {
      localStorage.setItem('enableValidateTab', false);
    } else if (enableValidateTab === 'true') {
      getValidatedData(params.id);
      this.setState({
        enableValidateTab: true
      });
    }

    // Track Page view
    trackPageView({
      documentTitle: `${eventCategories.plainPd}`
    });
  }

  componentWillUnmount() {
    const { handleOpenClose} = this.props;
    this.socketconnection.send(JSON.stringify({
      action: '$disconnect',
      body: {}
    }));
    this.socketconnection.close();
    if(handleOpenClose)
     handleOpenClose(false);

    localStorage.removeItem('proposalTypeView');
    localStorage.removeItem('proposalId');

    window.removeEventListener('storage', this.handleStorageChange);
  }

  trackMatomoEventTabs = tab => {
    const {
      eventCategories,
      userActions,
      proposalDetail,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Tab: ${userActions.click} On ${tab}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
    this.trackMatomoEventTabs(selectedView);
  };

  handleStorageChange(e) {
    const {
      getValidatedData,
      match: { params }
    } = this.props;

    if (e.key === 'enableValidateTab') {
      const isEnabled = e.newValue === 'true';
      const { selectedView: selectedViewState } = this.state;
      this.setState({
        enableValidateTab: isEnabled,
        selectedView:
          !isEnabled && selectedViewState === 'validate'
            ? 'questions'
            : selectedViewState
      });
      if (isEnabled) {
        getValidatedData(params.id);
      }
    }
  }

  renderContent = () => {
    const { enableValidateTab, selectedView } = this.state;
    const {
      isLoading,
      details,
      isOpen,
      match: { params }
    } = this.props;

    if (isLoading)
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );

    return (
      <div className="proposal-details">
        <UnityGrid data={details} isOpen={isOpen} />
        <UnityTab id={params.id} enableValidateTab={enableValidateTab} selectedView={selectedView}/>
      </div>
    );
  };

  render() {
    const { isSidebarOpen, selectedBid } = this.props;
    const { questionTemplateVersionNumber, opportunityType, bidStatus } = selectedBid.toJS();
    console.log('this.props :>> ', bidStatus);

    return (
      <div
        className={classNames('proposal-wrapper', {
          'is-collapsed': isSidebarOpen
        })}
      >
        <Toolbar />
        {this.renderContent()}
        {
          bidStatus &&  <Modal
          open={bidStatus}
          variant="warning"
          onClose={() => handleClose('warning')}
          title="Processing CRM Data"
          message="A new bid is being created based on CRM data."
          hideButtons={true}
          id="warning"
        />
        }
        <UnityFooter
          questionTemplateVersionNumber={questionTemplateVersionNumber || ''}
          opportunityType={opportunityType || ''}
        />
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
  isOpen: getIsOpen(state),
  selectedBid: getSelectedBid(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: onRefreshUserData,
    getOpportunityInfo: getOpportunity,
    getValidatedData: onGetValidatedProposalDetails,
    handleOpenClose: onHandleOpenClose,
    expandAllSections: expandAllSectionsAction,
    AddNewBid: UpdateNewBid
  })
)(MatomoHOC(Opportunity));
