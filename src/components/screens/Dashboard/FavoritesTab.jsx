// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chunk } from 'lodash';
import Loader from 'react-loader-spinner';
import Typography from 'apollo-react/components/Typography';
import Card from 'apollo-react/components/Card';
import {
  getProposalTypeView,
  getProposals,
  getFavouriteProposals,
  getProposalsLoading,
  getFilteredProposals,
  getIsFilteringProposals,
} from '../../../redux/selectors';
import { selectFavourites } from '../../../redux/selectors/sso-auth';
import { getPage, getNumOfRows } from '../../../redux/selectors/proposals';
import {
  setPageAction,
  setNumberOfRowsAction
} from '../../../redux/actions/proposals-actions';
import TableView from '../../views/TableView';
import GridView from '../../views/GridView';
import ComplexPagination from '../../common/ComplexPagination';

type Props = {
  selectedViewType: 0 | 1,
  proposals: [Object],
  favoriteProposals: [Object],
  filteredProposals: [Object],
  favourites: [string];
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
  pageContent: Array<Object>
};

class FavoritesTab extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      pageContent: []
    };
  }

  componentDidMount() {
    const { setRows } = this.props;
    setRows(15);
  }

  componentDidUpdate(prevProps) {
    const {
      page,
      numRows,
      proposals,
      filteredProposals,
      favoriteProposals,
      isFilteringProposals
    } = this.props;

    const contentChanged =
      prevProps.page !== page ||
      prevProps.numRows !== numRows ||
      prevProps.favoriteProposals !== favoriteProposals ||
      prevProps.filteredProposals !== filteredProposals;

    if (contentChanged) {
      const pages = chunk(
        isFilteringProposals ? filteredProposals : favoriteProposals,
        numRows
      );
      this.setPageContent(pages[page - 1]);
    }
  }

  renderSelectedView = () => {
    const { selectedViewType, allFlags } = this.props;
    const { pageContent } = this.state;

    if (pageContent && pageContent.length) {
      if (selectedViewType === 0) {
        return <TableView data={pageContent} tabIndex={1} hideStatus/>;
      } else {
        return <GridView data={pageContent} allFlags={allFlags} tabIndex={1}/>;
      }
    } else {
      return (
        <Card className="no-info-card">
          <Typography>
            No favorites defined
          </Typography>
        </Card>
      );
    }
  };

  setPageContent = (pageContent: Array<Object>) =>
    this.setState({ pageContent });

  render() {
    const {
      proposals,
      loading,
      isFilteringProposals,
      filteredProposals,
      favoriteProposals,
      setPage,
      setRows,
    } = this.props;

    // const favouriteProposals = this.favoriteProposals(proposals);
    // const favouriteFilteredProposals = this.favoriteProposals(filteredProposals);
    
    const showPagination = isFilteringProposals
      ? filteredProposals.length > 15
      : favoriteProposals.length > 15;
    
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
              isFilteringProposals ? filteredProposals.length : favoriteProposals.length
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
  favoriteProposals: getFavouriteProposals(state),
  favourites: selectFavourites(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesTab);
