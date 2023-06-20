// @flow
import React, { Component } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import Card from 'apollo-react/components/Card';
import { connect } from 'react-redux';
import { chunk, isEmpty } from 'lodash';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import {
  getProposalTypeView,
  getProposals,
  getProposalsLoading,
  getFilteredProposals,
  getIsFilteringProposals
} from '../../../redux/selectors';
import {
  getPage,
  getAssignedTabNumOfRows
} from '../../../redux/selectors/proposals';
import {
  setPageAction,
  setAssignedTabNumberOfRowsAction
} from '../../../redux/actions/proposals-actions';
import TableView from '../../views/TableView';
import GridView from '../../views/GridView';
import AssignTabPagination from '../../common/AssignTabPagination';

type Props = {
  selectedViewType: 0 | 1,
  proposals: [Object],
  filteredProposals: [Object],
  isFilteringProposals: boolean,
  loading: boolean,
  page: Number,
  numRows: Number,
  setPage: Function,
  setRows: Function,
  allFlags: Object
};

type State = {
  numRows: number,
  page: number,
  oldpageContent: Array<Object>,
  newpageContent: Array<Object>
};

class RecentTab extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      oldpageContent: [],
      newpageContent: [],
      pageContent: [],
      currentCount: 0,
      pastCount: 0
    };
  }

  componentDidMount() {
    const { setRows, allFlags } = this.props;
    setRows(10);
  }

  componentDidUpdate(prevProps) {
    const {
      page,
      numRows,
      proposals,
      filteredProposals,
      isFilteringProposals
    } = this.props;

    const contentChanged =
      prevProps.page !== page ||
      prevProps.numRows !== numRows ||
      prevProps.proposals !== proposals ||
      prevProps.filteredProposals !== filteredProposals;
    if (contentChanged) {
      let pages = [];
      let newPageChunk = [];
      let oldPageChunk = [];
      if (isFilteringProposals) {
        pages = chunk(filteredProposals, numRows);
        this.setPageContent(pages[page - 1]);
      } else {
        let currentProposal = [];
        let oldProposal = [];
        proposals.filter(value => {
          if (moment(value['bid due date']).diff(new Date()) > 0) {
            currentProposal.push(value);
          } else {
            oldProposal.push(value);
          }
          return value;
        });
        pages = chunk(proposals, numRows);
        newPageChunk = chunk(currentProposal, numRows);
        oldPageChunk = chunk(oldProposal, numRows);
        this.setPageContentAssignTab(
          pages[page - 1],
          newPageChunk[page - 1],
          oldPageChunk[page - 1]
        );
      }
    }
  }

  getPageCount() {
    let { proposals } = this.props;
    const currentProposal = [];
    const oldProposal = [];
    if (proposals && proposals?.length) {
      proposals.filter(value => {
        if (moment(value['bid due date']).diff(new Date()) > 0) {
          currentProposal.push(value);
        } else {
          oldProposal.push(value);
        }
        return value;
      });
    }
    return {
      oppCount: currentProposal.length,
      oldoppCount: oldProposal.length
    };
  }

  renderSelectedView = key => {
    const { selectedViewType, allFlags } = this.props;
    let { newpageContent, oldpageContent, pageContent } = this.state;
    if (key == 'current') {
      if (newpageContent && newpageContent.length) {
        if (selectedViewType === 0) {
          return <TableView data={newpageContent} hideStatus />;
        } else {
          return <GridView data={newpageContent} allFlags={allFlags} />;
        }
      } else {
        return (
          <Card className="no-info-card">
            <Typography>
              No current opportunities are assigned to you
            </Typography>
          </Card>
        );
      }
    } else {
      if (oldpageContent && oldpageContent.length) {
        if (selectedViewType === 0) {
          return <TableView data={oldpageContent} hideStatus />;
        } else {
          return <GridView data={oldpageContent} allFlags={allFlags} />;
        }
      } else {
        return (
          <Card className="no-info-card">
            <Typography>
              No current opportunities are assigned to you
            </Typography>
          </Card>
        );
      }
    }
  };

  setPageContent = (pageContent: Array<Object>) => {
    this.setState({ pageContent });
  };

  setPageContentAssignTab = (pageContent, newpageContent, oldpageContent) => {
    this.setState({ pageContent, newpageContent, oldpageContent });
  };

  render() {
    const {
      proposals,
      loading,
      isFilteringProposals,
      filteredProposals,
      setPage,
      setRows
    } = this.props;
    const { pageContent } = this.state;
    const showPagination = isFilteringProposals
      ? !isEmpty(filteredProposals)
      : !isEmpty(proposals);
    const { oppCount, oldoppCount } = this.getPageCount() || 0;
    const maxItem = Math.max(...[oppCount, oldoppCount]) || 0;
    return loading ? (
      <Loader
        type="TailSpin"
        color="#297DFD"
        height={100}
        width={100}
        className="loading"
      />
    ) : (
      <>
        <Accordion defaultExpanded className="current-tab">
          <AccordionSummary>
            <Typography>
              Current{oppCount > 0 ? `(${oppCount})` : '(No data to show)'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <section id="all-tab" className="tab-content">
              {this.renderSelectedView('current')}
            </section>
          </AccordionDetails>
        </Accordion>

        <Accordion className="past-tab">
          <AccordionSummary>
            <Typography>
              Past{oldoppCount > 0 ? `(${oldoppCount})` : '(No data to show)'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <section id="all-tab" className="tab-content">
              {this.renderSelectedView('past')}
            </section>
          </AccordionDetails>
        </Accordion>

        {showPagination && (
          <AssignTabPagination
            currentTab="Assigned Tab"
            totalItems={
              isFilteringProposals ? filteredProposals.length : maxItem
            }
            getCurrentPosition={setPage}
            getMaxRows={setRows}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedViewType: getProposalTypeView(state),
  proposals: getProposals(state),
  loading: getProposalsLoading(state),
  filteredProposals: getFilteredProposals(state),
  isFilteringProposals: getIsFilteringProposals(state),
  page: getPage(state.proposals),
  numRows: getAssignedTabNumOfRows(state.proposals)
});

const mapDispatchToProps = {
  setPage: setPageAction,
  setRows: setAssignedTabNumberOfRowsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTab);
