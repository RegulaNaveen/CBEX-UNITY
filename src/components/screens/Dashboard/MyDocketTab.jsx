// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chunk } from 'lodash';
import { getProposalTypeView, getProposals } from '../../../selectors';
import { getProposalsByStatus } from '../../../actions/proposals-actions';
import TableView from '../../common/TableView';
import GridView from '../../common/GridView';
import ComplexPagination from '../../common/ComplexPagination';

type Props = {
  selectedViewType: 0 | 1,
  proposals: [Object],
  fetchProposals: Function
};

type State = {
  numRows: number,
  page: number,
  pageContent: [Object]
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
    fetchProposals('active');
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
    const { proposals } = this.props;
    return (
      <>
        <section id="all-tab" className="tab-content">
          {this.renderSelectedView()}
        </section>
        {proposals && (
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
  proposals: getProposals(state)
});

const mapDispatchToProps = { fetchProposals: getProposalsByStatus };

export default connect(mapStateToProps, mapDispatchToProps)(RecentTab);
