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
} from '../../../selectors';
import {
  getAllProposals,
  onFilteringProposals
} from '../../../actions/proposals-actions';
import TableView from '../../common/TableView';
import GridView from '../../common/GridView';
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
  pageContent: [Object]
};

class AllTab extends Component<Props, State> {
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
    fetchProposals();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, numRows } = this.state;
    const { proposals } = this.props;
    if (
      prevState.page !== page ||
      prevState.numRows !== numRows ||
      prevProps.proposals !== proposals
    ) {
      const pages = chunk(proposals, numRows);
      this.setPageContent(pages[page - 1]);
    }
  }

  renderSelectedView = () => {
    const {
      selectedViewType,
      filteredProposals,
      isFilteringProposals
    } = this.props;
    const { pageContent } = this.state;

    const data = isFilteringProposals ? filteredProposals : pageContent;

    if (selectedViewType === 0) return <TableView data={data} />;
    return <GridView data={data} />;
  };

  setPage = (page: number) => this.setState({ page });

  setRows = (numRows: number) => this.setState({ numRows });

  setPageContent = (pageContent: Array<Object>) =>
    this.setState({ pageContent });

  render() {
    const { proposals, loading } = this.props;

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
        {!isEmpty(proposals) && (
          <ComplexPagination
            totalItems={proposals.length}
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

const mapDispatchToProps = {
  fetchProposals: getAllProposals,
  filterProposals: onFilteringProposals
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTab);
