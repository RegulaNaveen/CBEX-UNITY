// @flow
import React, { Component } from "react";
import { chunk } from "lodash";
import Dropwdown from "./Dropdown";
import Pagination from "./Pagination";

type Props = {
  totalItems: number
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
      maxRows: 10
    };
  }

  setMaxRows = (maxRows: number) => {
    this.setState({ maxRows });
  };

  getCurrentPage = (currentPage: number) => {
    this.setState({ currentPage });
  };

  render() {
    const { currentPage, maxRows } = this.state;
    const { totalItems } = this.props;

    const chunks = chunk(
      [...Array.from(Array(totalItems), (_, i) => i + 1)],
      maxRows
    );

    const handleCountItems = () => {
      let firstOfList = 1;
      let lastOfList = 10;

      if (chunks[currentPage - 1]) {
        const [first] = chunks[currentPage - 1];
        firstOfList = first;
        lastOfList =
          maxRows * (currentPage - 1) + chunks[currentPage - 1].length;
      } else {
        console.log('ENTRO');
        // const chunksLength = chunks.length;
        // const [first] = chunks[chunksLength - 1];
        // firstOfList = first;
        // lastOfList =
        //   maxRows * (chunksLength - 1) + chunks[chunksLength - 1].length;
        // this.setCurrentChunk(chunks.length - 1);
      }

      return `Showing ${firstOfList}-${lastOfList} of ${totalItems}`;
    };

    return (
      <div className="cmplx">
        <div className="cmplx__rows">
          <p>Rows</p>
          <div style={{ width: "52px" }}>
            <Dropwdown
              placeholder="Test"
              value="10"
              onClick={this.setMaxRows}
              items={["10", "20", "50", "100"]}
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
