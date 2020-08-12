// @flow
import React, { PureComponent } from 'react';
import { chunk } from 'lodash';
import Dropwdown from './Dropdown';
import Pagination from './Pagination';

type Props = {
  totalItems: number,
  currentPage: number,
  maxRows: number
};

type State = {
  currentChunk: number
};

class ComplexPagination extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      currentChunk: 0
    };
  }

  setCurrentChunk = (value: number) => {
    this.setState({ currentChunk: value });
  };

  render() {
    const { currentChunk } = this.state;
    const { totalItems, currentPage, maxRows } = this.props;

    const chunks = chunk(
      [...Array.from(Array(totalItems), (_, i) => i + 1)],
      maxRows
    );

    const handleCountItems = () => {
      const firstOfList = chunks[currentPage - 1][0];
      const lastOfList =
        maxRows * (currentPage - 1) + chunks[currentPage - 1].length;
      return `Showing ${firstOfList}-${lastOfList} of ${totalItems}`;
    };

    return (
      <div className="cmplx">
        <div className="cmplx__rows">
          <p>Rows</p>
          <div style={{ width: '52px' }}>
            <Dropwdown
              placeholder="Test"
              value="10"
              onClick={val => console.log(val)}
              items={['10', '20', '50', '100']}
            />
          </div>
        </div>
        <p className="cmplx__items">{handleCountItems()}</p>
        <Pagination
          currentPage={currentPage}
          maxRows={maxRows}
          totalItems={totalItems}
          currentChunk={currentChunk}
          setCurrentChunk={this.setCurrentChunk}
        />
      </div>
    );
  }
}

export default ComplexPagination;
