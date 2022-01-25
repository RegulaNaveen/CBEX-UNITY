// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import type { Match } from 'react-router-dom';
import { onGetProposalBoxId } from '../../../redux/actions/proposal-actions';
import {
  getAllBidsForIndex,
  getProposalBoxId,
  getProposalBoxIdError,
  getProposalBoxIdIsLoading
} from '../../../redux/selectors';

type Props = {
  match: Match,
  getBoxId: (proposalId: string) => void,
  isGettingBoxId: boolean,
  onGettingBoxIdError: Object,
  boxId: string
};

type State = {
  selectedBid: string
}

class Documents extends Component<Props, State> {

  oppNo = '';
  constructor(props: Object) {
    super(props);
    this.state = {
      selectedBid: ''
    }
  }

  componentDidMount(){
    const {bids, match} = this.props;
    // latest Bid
    const currentBid =  bids[bids.length-1];
    // Opportunity number from the link
    this.oppNo = match.params.id;
    //Setting up the default tab
    if(currentBid)
      this.swtichTabs(currentBid.proposalId);
  }
  swtichTabs(proposalId){
    const { getBoxId} = this.props;
    // Setting the selected proposal
    this.setState(() => ({
      selectedBid : proposalId
    }));
    // Calling API to get boxFolderId;
    getBoxId(proposalId);
  }

  renderContent = () => {
    const { isGettingBoxId, onGettingBoxIdError, boxId } = this.props;
    if (isGettingBoxId)
      return (
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
      );

    if (!boxId || onGettingBoxIdError)
      return <p>No documents available for this proposal</p>;

    return (
      <iframe
        src={`https://app.box.com/embed/folder/${boxId}?sortColumn=date&view=list`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        webkitallowfullscreen="true"
        msallowfullscreen="true"
        title="Box Documents"
      />
    );
  };

  render() {
    const {bids} = this.props;
    const {selectedBid} = this.state;
    return (
      <div className="documents">
        <div className="doc-tab-index">
          <ul>
            {
              bids.map((v, i)=>
              <li 
                className={(selectedBid===v.proposalId? 'selectedBid' : '')} 
                key={v.proposalId} 
                onClick={()=>{this.swtichTabs(v.proposalId)}}>
                {oppNo} - Bid {i+1}
              </li>
              )
            } 
          </ul>
        </div>
        <div className="doc-tab-content">
          <div className="doc-tab-content-inner">
            {this.renderContent()}
          </div>
        </div>
      </div>
    )  
  }
}

const mapStateToProps = state => ({
  isGettingBoxId: getProposalBoxIdIsLoading(state),
  onGettingBoxIdError: getProposalBoxIdError(state),
  boxId: getProposalBoxId(state),
  bids: getAllBidsForIndex(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getBoxId: onGetProposalBoxId })
)(Documents);
