// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import type { Match } from 'react-router-dom';
import { onGetProposalBoxId, getAdditionalBoxLink, setupdateBoxId } from '../../../redux/actions/proposal-actions';
import {
  getAllBidsForIndex,
  getProposalBoxId,
  getProposalBoxIdError,
  getProposalBoxIdIsLoading,
  getAdditionalLinks,
  getProposalDetails
} from '../../../redux/selectors';
import DocumentModal from '../../views/modals/documentModal';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';

const styles = {
  padding: 16,
  textAlign: 'left',
};
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
  getBrowser = () => {
    const userAgent = navigator.userAgent;
    let browser = "";
    browser = (/edg/i).test(userAgent) ? 'Edge' : browser;
    switch (browser) {
      case 'Edge': return `${browser}/${this.browserVersion(userAgent, /(edge|edga|edgios|edg)\/([\d\.]+)/i)}`;
      default: return ''
    }
  }

  browserVersion = (userAgent, regex) => {
    return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
  }
  componentDidMount() {

    const { bids, match, getAdditionalLink, proposalDetail } = this.props;
    // Opportunity number from the link
    this.oppNo = match.params.id;
    if(proposalDetail.opportunityId) getAdditionalLink(proposalDetail.opportunityId, this.oppNo, proposalDetail.Customer)
    // latest Bid logic
    if (bids.length) {
      const currentBid = bids[0];
      //Setting up the default tab
      if (currentBid)
        this.swtichTabs(currentBid.proposalId);
    }
  }
  swtichTabs(proposalId) {
    const { getBoxId } = this.props;
    // Setting the selected proposal
    this.setState(() => ({
      selectedBid: proposalId
    }));
    // Calling API to get boxFolderId;
    getBoxId(proposalId);
  }
  openAdditonalUrl(url,activelink) {
    const { updateBoxId } = this.props;
    this.setState({selectedBid: activelink},()=>{
      updateBoxId(url);
    })
  }
  isValidURL(str) {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };
  renderContent = () => {
    const { isGettingBoxId, onGettingBoxIdError, boxId } = this.props;
    if (isGettingBoxId)
      return (
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
      );

    if (!boxId || onGettingBoxIdError)
      return <p>No documents available for this proposal</p>;
    let url = ''
    if(this.isValidURL(boxId)){
      url = String(boxId).trim()+"&output=embed";
    }else{
      url = `https://app.box.com/embed/folder/${boxId}?sortColumn=date&view=list`;
    }
    
    return (
      <iframe
        src={url}
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
    const { bids, boxLinks} = this.props;
    const { data, oppfolderID } = boxLinks;
    const { selectedBid } = this.state;
    const consentPropertyName = localStorage.getItem('unity_document_consent');
    return (
      <div className="main-doc">
         <div className="title-document">
           <h3>Documents</h3>
           <p className="para-document">Welcome to the Opportunity Documents section. You can check here any documents associated to this particular opportunity.
             For that you need to access with your enterprise email account to access Box.com
           </p>
        </div>
      <div className="documents">
        <div className="doc-tab-index">
        <div className="sidebar-sopportunitylinks">
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper style={styles}>
              <Typography variant="body2" className="boxlocation">Box Locations</Typography>
            </Paper>
          </Grid>
        </Grid>
        <ul className="opportunity-link">
          <li
           onClick={()=> this.openAdditonalUrl(oppfolderID, 'oppactive')}
            className={`${selectedBid == 'oppactive' ? 'selectedBid' : ''} spacebetween`}
           >
            Opportunity {this.oppNo}
          </li>
        </ul>
          <Accordion defaultExpanded={true}>
            <AccordionSummary>
              <Typography>Bids</Typography>
            </AccordionSummary>
            <AccordionDetails className="bidlistdetail">
              <ul className="bidlist-document">
              {
                bids.map((v) =>
                  <li
                    className={(selectedBid === v.proposalId ? 'selectedBid' : '')}
                    key={v.proposalId}
                    onClick={() => { this.swtichTabs(v.proposalId) }}>
                    {this.oppNo} - Bid {v.bidNo}
                  </li>
                )
              }
            </ul>
            </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true} >
            <AccordionSummary>
              <Typography>Additional Links</Typography>
            </AccordionSummary>
            <AccordionDetails className="additionalbidlinkdetail">
              <ul className="additionalink-document">
                {
                  data && Array.isArray(data) && data.length > 0 && data.map((_v)=>
                    <li onClick={()=> this.openAdditonalUrl(_v.link, _v.linkdesc)} 
                    className={(selectedBid === _v.linkdesc ? 'selectedBid' : '')}
                    >{_v.linkdesc}</li>  
                  )
                }
            </ul>
            </AccordionDetails>
        </Accordion>
        </div>
        </div>
        <div className="doc-tab-content">
          <div className="doc-tab-content-inner">
            {this.renderContent()}
          </div>
        </div>
        {
          !consentPropertyName && this.getBrowser().includes('Edge') && <DocumentModal />
        }
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isGettingBoxId: getProposalBoxIdIsLoading(state),
  onGettingBoxIdError: getProposalBoxIdError(state),
  boxId: getProposalBoxId(state),
  bids: getAllBidsForIndex(state),
  boxLinks: getAdditionalLinks(state),
  proposalDetail: getProposalDetails(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, { 
    getBoxId: onGetProposalBoxId, 
    getAdditionalLink: getAdditionalBoxLink,
    updateBoxId: setupdateBoxId 
  })
)(Documents);
