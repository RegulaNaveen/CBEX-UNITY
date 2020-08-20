// @flow
import React, { Component } from 'react';
import { chunk } from 'lodash';
import Dropwdown from './Dropdown';
import Pagination from './Pagination';

type Props = {
  totalItems: number,
  getCurrentPosition: (selectedPosition: number) => void,
  getMaxRows: (selectedRows: number) => void
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
  };

  getCurrentPage = (currentPage: number) => {
    const { getCurrentPosition } = this.props;
    this.setState({ currentPage }, () => getCurrentPosition(currentPage));
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
      <div className="cmplx">
        <div className="cmplx__rows">
          <p>Rows</p>
          <div className="cmplx__dd__container">
            <Dropwdown
              value={maxRows.toString()}
              onClick={this.setMaxRows}
              items={[15, 20, 50, 100]}
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

export default ComplexPagination;
