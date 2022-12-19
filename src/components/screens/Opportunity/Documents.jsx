// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import type { Match } from 'react-router-dom';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Typography from 'apollo-react/components/Typography';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import DocumentModal from '../../views/modals/documentModal';
import {
  getAllBidsForIndex,
  getProposalBoxId,
  getProposalBoxIdError,
  getProposalBoxIdIsLoading,
  getAdditionalLinks,
  getProposalDetails,
  getSelectedBid
} from '../../../redux/selectors';
import {
  onGetProposalBoxId,
  getAdditionalBoxLink,
  setupdateBoxId
} from '../../../redux/actions/proposal-actions';

const styles = {
  padding: 16,
  textAlign: 'left'
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
};

class Documents extends Component<Props, State> {
  oppNo = '';
  constructor(props: Object) {
    super(props);
    this.state = {
      selectedBid: ''
    };
  }
  getBrowser = () => {
    const { userAgent } = navigator;
    let browser = '';
    browser = /edg/i.test(userAgent) ? 'Edge' : browser;
    switch (browser) {
      case 'Edge':
        return `${browser}/${this.browserVersion(
          userAgent,
          /(edge|edga|edgios|edg)\/([\d\.]+)/i
        )}`;
      default:
        return '';
    }
  };

  browserVersion = (userAgent, regex) => {
    return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
  };

  componentDidMount() {
    const {
      bids,
      match,
      getAdditionalLink,
      proposalDetail,
      selectedBid,
      location: { search }
    } = this.props;
    const { id } = selectedBid.toJS();
    const selectedView = new URLSearchParams(search).get('viewType');
    // Opportunity number from the link
    this.oppNo = match.params.id;
    if (proposalDetail.opportunityId)
      getAdditionalLink(
        proposalDetail.opportunityId,
        this.oppNo,
        proposalDetail.Customer
      );
    // latest Bid logic
    if (bids && bids.length) {
      const currentBid = bids[0];
      // Setting up the default tab
      if (currentBid) this.swtichTabs(currentBid.proposalId);
    }

    if (selectedView && selectedView === 'documents' && id) {
      this.swtichTabs(id);
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
  openAdditonalUrl(url, activelink) {
    const { updateBoxId } = this.props;
    this.setState({ selectedBid: activelink }, () => {
      updateBoxId(url);
    });
  }
  isValidURL(str) {
    var res = str.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  renderContent = boxId => {
    const { isGettingBoxId, onGettingBoxIdError } = this.props;
    let url = '';
    if (isGettingBoxId)
      return (
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
      );

    if (!boxId || onGettingBoxIdError) {
      url = '';
      return <p>No documents available for this proposal</p>;
    }
    console.log('url1 :>> ', url);
    if (this.isValidURL(boxId)) {
      url = `${String(boxId).trim()}&output=embed`;
    } else {
      url = `https://app.box.com/embed/folder/${boxId}?sortColumn=date&view=list`;
    }
    console.log('url2 :>> ', url);
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
    const { bids, boxLinks, boxId } = this.props;
    const { data, oppfolderID } = boxLinks;
    const { selectedBid } = this.state;
    const consentPropertyName = localStorage.getItem('unity_document_consent');
    return (
      <div className="main-doc">
        <div className="title-document">
          <h3>Documents</h3>
          <p className="para-document">
            Welcome to the Opportunity Documents section. You can check here any
            documents associated to this particular opportunity. For that you
            need to access with your enterprise email account to access Box.com.
            For assistance with Box.com or to obtain access submit a VIA ticket
            <span> </span>
            <a
              style={{ textDecoration: 'none', color: '#0768fd' }}
              href="https://quintiles.service-now.com/via?id=sc_cat_item&sys_id=d0e1bce09038790090f625c1886a1a73"
              target="_blank"
              rel="noreferrer"
            >
              here.
            </a>
          </p>
        </div>
        <div className="documents">
          <div className="doc-tab-index">
            <div className="sidebar-sopportunitylinks">
              <Grid container spacing={2}>
                <Grid item xs>
                  <Paper style={styles}>
                    <Typography variant="body2" className="boxlocation">
                      Box Locations
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              {/* <ul className="opportunity-link">
          <li
           onClick={()=> this.openAdditonalUrl(oppfolderID, 'oppactive')}
            className={`${selectedBid == 'oppactive' ? 'selectedBid' : ''} spacebetween`}
           >
            Opportunity {this.oppNo}
          </li>
        </ul> */}
              <Accordion defaultExpanded={true}>
                <AccordionSummary>
                  <Typography>Bids</Typography>
                </AccordionSummary>
                <AccordionDetails className="bidlistdetail">
                  <ul className="bidlist-document">
                    {bids.map(v => (
                      <li
                        className={
                          selectedBid === v.proposalId ? 'selectedBid' : ''
                        }
                        key={v.proposalId}
                        onClick={() => {
                          this.swtichTabs(v.proposalId);
                        }}
                      >
                        {this.oppNo} - Bid {v.bidNo}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion defaultExpanded={true}>
                <AccordionSummary>
                  <Typography>Additional Links</Typography>
                </AccordionSummary>
                <AccordionDetails className="additionalbidlinkdetail">
                  <ul className="additionalink-document">
                    {data &&
                      Array.isArray(data) &&
                      data.length > 0 &&
                      data.map(_v => (
                        <li
                          onClick={() =>
                            this.openAdditonalUrl(_v.link, _v.linkdesc)
                          }
                          className={
                            selectedBid === _v.linkdesc ? 'selectedBid' : ''
                          }
                        >
                          {_v.linkdesc}
                        </li>
                      ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="doc-tab-content">
            <div className="doc-tab-content-inner">
              {this.renderContent(boxId)}
            </div>
          </div>
          {!consentPropertyName && this.getBrowser().includes('Edge') && (
            <DocumentModal />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isGettingBoxId: getProposalBoxIdIsLoading(state),
  onGettingBoxIdError: getProposalBoxIdError(state),
  boxId: getProposalBoxId(state),
  bids: getAllBidsForIndex(state),
  selectedBid: getSelectedBid(state),
  boxLinks: getAdditionalLinks(state),
  proposalDetail: getProposalDetails(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getBoxId: onGetProposalBoxId,
    getAdditionalLink: getAdditionalBoxLink,
    updateBoxId: setupdateBoxId
  })
)(Documents);
