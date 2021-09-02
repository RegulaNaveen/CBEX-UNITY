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
import { getProposalsByStatus } from '../../../redux/actions/proposals-actions';
import TableView from '../../views/TableView';
import GridView from '../../views/GridView';
import ComplexPagination from '../../common/ComplexPagination';

type Props = {
  selectedViewType: 0 | 1,
  proposals: [Object],
  fetchProposals: Function,
  filteredProposals: [Object],
  isFilteringProposals: boolean,
  loading: boolean
};

type State = {
  numRows: number,
  page: number,
  pageContent: Array<Object>
};

class RecentTab extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      page: 1,
      numRows: 15,
      pageContent: []
    };
  }

  componentDidMount() {
    const { fetchProposals } = this.props;
    fetchProposals('non-active');
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, numRows } = this.state;
    const { proposals, filteredProposals, isFilteringProposals } = this.props;

    const contentChanged =
      prevState.page !== page ||
      prevState.numRows !== numRows ||
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

  setPage = (page: number) => this.setState({ page });

  setRows = (numRows: number) => this.setState({ numRows });

  setPageContent = (pageContent: Array<Object>) =>
    this.setState({ pageContent });

  render() {
    const {
      proposals,
      loading,
      isFilteringProposals,
      filteredProposals
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
            getCurrentPosition={this.setPage}
            getMaxRows={this.setRows}
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
  isFilteringProposals: getIsFilteringProposals(state)
});

const mapDispatchToProps = { fetchProposals: getProposalsByStatus };

export default connect(mapStateToProps, mapDispatchToProps)(RecentTab);
