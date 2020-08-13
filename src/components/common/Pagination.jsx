// @flow
import React, { PureComponent } from "react";
import classnames from "classnames";
import { chunk } from "lodash";

import { ArrowLeft, ArrowRight, More } from "../svg";

type Props = {
  maxRows: number,
  totalItems: number,
  getCurrentPage: Function
};

type State = {
  currentPage: number,
  currentChunk: number
};

class Pagination extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      currentPage: 1,
      currentChunk: 0
    };
  }

  setCurrentPage = (value: number) => {
    const { getCurrentPage } = this.props;
    this.setState({ currentPage: value });
    getCurrentPage(value);
  };

  handlePreviousChunk = () => {
    const { currentChunk } = this.state;
    if (currentChunk - 1 >= 0)
      this.setState({ currentChunk: currentChunk - 1 });
  };

  handleNextChunk = () => {
    const { currentChunk } = this.state;
    const { totalItems, maxRows } = this.props;

    const chunks = chunk(
      [...Array.from(Array(Math.ceil(totalItems / maxRows)), (_, i) => i + 1)],
      4
    );

    if (currentChunk + 1 < chunks.length)
      this.setState({ currentChunk: currentChunk + 1 });
  };

  renderLeftControls() {
    const { currentChunk } = this.state;
    if (currentChunk !== 0)
      return [
        <button
          type="button"
          className="pagination__arrow"
          onClick={this.handlePreviousChunk}
        >
          <ArrowLeft className="pagination__svg" />
        </button>,
        <More className="pagination__svg" />
      ];

    return [<div />, <div />];
  }

  renderRightControls() {
    const { currentChunk } = this.state;
    const { totalItems, maxRows } = this.props;

    const chunks = chunk(
      [...Array.from(Array(Math.ceil(totalItems / maxRows)), (_, i) => i + 1)],
      4
    );

    if (currentChunk !== chunks.length - 1)
      return [
        <More className="pagination__svg" />,
        <button
          type="button"
          className="pagination__arrow"
          onClick={this.handleNextChunk}
        >
          <ArrowRight className="pagination__svg" />
        </button>
      ];

    return [<div />, <div />];
  }

  render() {
    const { currentPage, currentChunk } = this.state;
    const { maxRows, totalItems } = this.props;

    const chunks = chunk(
      [...Array.from(Array(Math.ceil(totalItems / maxRows)), (_, i) => i + 1)],
      4
    );

    return (
      <div className="pagination">
        {this.renderLeftControls()}
        {chunks[currentChunk].map(page => (
          <button
            type="button"
            className={classnames("pagination__page", {
              selected: page === currentPage
            })}
            onClick={this.setCurrentPage.bind(this, page)}
          >
            {page}
          </button>
        ))}
        {this.renderRightControls()}
      </div>
    );
  }
}

export default Pagination;
