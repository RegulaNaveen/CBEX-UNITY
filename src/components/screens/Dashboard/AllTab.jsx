// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chunk, isEmpty } from 'lodash';
import Loader from 'react-loader-spinner';
import {
  getProposalTypeView,
  getProposals,
  getProposalsLoading,
  getFilteredProposals,
  getIsFilteringProposals
} from '../../../redux/selectors';
import { getPage, getNumOfRows } from '../../../redux/selectors/proposals';
import {
  setPageAction,
  setNumberOfRowsAction
} from '../../../redux/actions/proposals-actions';
import GridView from '../../views/GridView';
import TableView from '../../views/TableView';
import ComplexPagination from '../../common/ComplexPagination';

type Props = {
  selectedViewType: 0 | 1,
  proposals: [Object],
  filteredProposals: [Object],
  isFilteringProposals: boolean,
  loading: boolean,
  page: Number,
  numRows: Number,
  setPage: Function,
  setRows: Function
};

type State = {
  numRows: number,
  page: number,
  pageContent: Array<Object>
};

class AllTab extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      pageContent: []
    };
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
      const pages = chunk(
        isFilteringProposals ? filteredProposals : proposals,
        numRows
      );
      this.setPageContent(pages[page - 1]);
    }
  }

  renderSelectedView = () => {
    const { selectedViewType } = this.props;
    const { pageContent } = this.state;

    if (selectedViewType === 0) return <TableView data={pageContent} />;
    return <GridView data={pageContent} />;
  };

  setPageContent = (pageContent: Array<Object>) =>
    this.setState({ pageContent });

  render() {
    const {
      proposals,
      loading,
      isFilteringProposals,
      filteredProposals,
      setPage,
      setRows
    } = this.props;

    const showPagination = isFilteringProposals
      ? !isEmpty(filteredProposals)
      : !isEmpty(proposals);

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
        <section id="all-tab" className="tab-content">
          {this.renderSelectedView()}
        </section>
        {showPagination && (
          <ComplexPagination
            totalItems={
              isFilteringProposals ? filteredProposals.length : proposals.length
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
  numRows: getNumOfRows(state.proposals)
});

const mapDispatchToProps = {
  setPage: setPageAction,
  setRows: setNumberOfRowsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTab);
