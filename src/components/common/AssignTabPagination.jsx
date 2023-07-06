// @flow
import React, { Component } from 'react';
import { chunk } from 'lodash';
import Dropwdown from './atoms/inputs/Dropdown';
import Pagination from './atoms/Pagination';
import MatomoHoc from '../HOC/MatomoHOC';
import moment from 'moment';

type Props = {
  totalItems: number,
  getCurrentPosition: (selectedPosition: number) => void,
  getMaxRows: (selectedRows: number) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any
};

type State = {
  currentPage: number,
  maxRows: number
};

class AssignTabPagination extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      currentPage: 1,
      maxRows: 10
    };
  }

  setMaxRows = (maxRows: number) => {
    const { getMaxRows } = this.props;
    this.setState({ maxRows }, () => getMaxRows(maxRows));
    this.trackMatomoPaginationClicks(maxRows);
  };

  getCurrentPage = (currentPage: number) => {
    const { getCurrentPosition } = this.props;
    this.setState({ currentPage }, () => getCurrentPosition(currentPage));
  };

  trackMatomoPaginationClicks = (size: number) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.pg,
      action: `AssignTab Pagination: ${userActions.changed} Page Size To ${size}`
    });
  };

  render() {
    const { currentPage, maxRows } = this.state;
    const { totalItems } = this.props;
    let leftPaginateCount = [10, 15, 20];

    const chunks = chunk(
      [...Array.from(Array(totalItems), (_, i) => i + 1)],
      maxRows
    );

    const handleCountItems = () => {
      if (!chunks[currentPage - 1])
        return `Showing 1-${maxRows} of ${totalItems}`;
      const firstOfList = chunks[currentPage - 1][0];
      const lastOfList =
        maxRows * (currentPage - 1) + chunks[currentPage - 1].length;
      // of ${totalItems}
      return `Showing ${firstOfList}-${lastOfList} `;
    };
    return (
      <div className="cmplx" data-testid="complex-pagination">
        <div className="cmplx__rows">
          <p>Rows</p>
          <div className="cmplx__dd__container">
            <Dropwdown
              value={maxRows.toString()}
              onClick={this.setMaxRows}
              items={leftPaginateCount}
            />
          </div>
        </div>
        <p className="cmplx__items">{handleCountItems()}</p>
        <Pagination
          maxRows={maxRows}
          totalItems={totalItems}
          getCurrentPage={this.getCurrentPage}
        />
      </div>
    );
  }
}

export default MatomoHoc(AssignTabPagination);
