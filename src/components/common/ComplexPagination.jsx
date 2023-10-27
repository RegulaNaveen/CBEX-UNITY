// @flow
import React, { Component } from 'react';
import { chunk } from 'lodash';
import Dropwdown from './atoms/inputs/Dropdown';
import Pagination from './atoms/Pagination';
import AnalyticsHOC from '../HOC/AnalyticsHOC';

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

class ComplexPagination extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      currentPage: 1,
      maxRows: 15
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
      action: `Pagination: ${userActions.changed} Page Size To ${size}`
    });
  };

  render() {
    const { currentPage, maxRows } = this.state;
    const { totalItems } = this.props;

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

      return `Showing ${firstOfList}-${lastOfList} of ${totalItems}`;
    };

    return (
      <div className="cmplx" data-testid="complex-pagination">
        <div className="cmplx__rows">
          <p>Show</p>
          <div className="cmplx__dd__container">
            <Dropwdown
              value={maxRows.toString()}
              onClick={this.setMaxRows}
              items={[15, 30, 45]}
            />
          </div>
          <span style={{ paddingLeft: 5 }}>Opportunities per page</span>
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

export default AnalyticsHOC(ComplexPagination);
