// @flow
import React, { Component, PureComponent } from 'react';
import AnalyticsHOC from '../HOC/AnalyticsHOC';
import classnames from 'classnames';
import { chunk, last } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft, ArrowRight, More } from '../svg';

class Pagination extends PureComponent {
  chunks;

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      currentChunk: 0
    };
  }

  setCurrentPage = event => {
    const value = Number(event.target.id);
    const { getCurrentPage } = this.props;
    this.setState({ currentPage: value }, () => getCurrentPage(value));
    this.trackPaginationClicks(`Page No. ${value}`);
  };

  handlePreviousChunk = () => {
    const { currentChunk } = this.state;
    const { getCurrentPage } = this.props;

    if (currentChunk - 1 >= 0) {
      const lastItem = last(this.chunks[currentChunk - 1]);
      this.setState(
        { currentChunk: currentChunk - 1, currentPage: lastItem },
        () => getCurrentPage(lastItem)
      );
    }
    this.trackPaginationClicks('Left Arrow');
  };

  handleNextChunk = () => {
    const { currentChunk } = this.state;
    const { getCurrentPage } = this.props;

    if (currentChunk + 1 < this.chunks.length) {
      const [first] = this.chunks[currentChunk + 1];
      this.setState(
        { currentChunk: currentChunk + 1, currentPage: first },
        () => getCurrentPage(first)
      );
    }
    this.trackPaginationClicks('Right Arrow');
  };

  trackPaginationClicks = (type: string) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.pg,
      action: `Pagination: ${userActions.click} On ${type}`
    });
  };

  renderLeftControls() {
    const { currentChunk } = this.state;
    if (currentChunk === 0) return null;

    return (
      <>
        <button
          type="button"
          className="pagination__arrow arrow__left"
          onClick={this.handlePreviousChunk}
        >
          <ArrowLeft className="pagination__svg" />
        </button>
        <More className="pagination__svg more__left" />
      </>
    );
  }

  renderRightControls() {
    const { currentChunk } = this.state;
    if (currentChunk === this.chunks.length - 1) return null;
    return (
      <>
        <More className="pagination__svg more__right" />
        <button
          type="button"
          className="pagination__arrow arrow__right"
          onClick={this.handleNextChunk}
        >
          <ArrowRight className="pagination__svg" />
        </button>
      </>
    );
  }

  render() {
    const { currentPage, currentChunk } = this.state;
    const { maxRows, totalItems, getCurrentPage } = this.props;

    // every 4 page is a chunk
    this.chunks = chunk(
      [...Array.from(Array(Math.ceil(totalItems / maxRows)), (_, i) => i + 1)],
      4
    );

    // page in an array
    const pages = chunk(
      [...Array.from(Array(totalItems), (_, i) => i + 1)],
      maxRows
    );

    let current = currentChunk;
    if (!pages[currentPage - 1]) {
      current = 0;
      this.setState({ currentChunk: 0, currentPage: 1 }, () =>
        getCurrentPage(1)
      );
    }

    return (
      <div className="pagination">
        {this.renderLeftControls()}
        {this.chunks[current]?.map((page, index) => (
          <button
            id={page}
            key={uuidv4()}
            type="button"
            style={{ gridColumn: `${index + 3}/${index + 4}` }}
            className={classnames('pagination__page', {
              selected: page === currentPage
            })}
            onClick={this.setCurrentPage}
          >
            {page}
          </button>
        ))}
        {this.renderRightControls()}
      </div>
    );
  }
}

export default AnalyticsHOC(Pagination);
