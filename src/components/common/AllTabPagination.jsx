// @flow
import React, { Component, PureComponent } from 'react';
import Dropwdown from './atoms/inputs/Dropdown';
import AnalyticsHOC from '../HOC/AnalyticsHOC';
import classnames from 'classnames';
import { chunk, last } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft, ArrowRight, More } from '../svg';

type Props = {
  totalItems: number,
  getCurrentPosition: (selectedPosition: number) => void,
  getMaxRows: (selectedRows: number) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  count: number,
  from: number,
  paginationSize: number
  // setPaginationSize: any
};

type State = {
  currentPage: number,
  maxRows: number
};

class AllTabPagination extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      currentPage: 1,
      maxRows: 15
    };
  }

  //   setMaxRows = (maxRows: number) => {
  //     const { getMaxRows, setPaginationSize } = this.props;
  //     this.setState({ maxRows }, () => getMaxRows(maxRows));
  //     this.trackPaginationClicks(maxRows);
  //     setPaginationSize(maxRows);
  //   };

  handleDropdownClick = (newSize: number) => {
    const { getMaxRows, setPaginationSize, fetchProposals } = this.props;
    const { currentPage } = this.state;
    setPaginationSize(newSize);
    this.setState({ maxRows: newSize }, () => {
      getMaxRows(this.state.maxRows);
      this.trackPaginationClicks(newSize);
    });
  };

  getCurrentPage = (currentPage: number) => {
    const { getCurrentPosition, fetchProposals } = this.props;
    this.setState({ currentPage }, () => getCurrentPosition(currentPage));
  };

  trackPaginationClicks = (size: number) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.pg,
      action: `Pagination: ${userActions.changed} Page Size To ${size}`
    });
  };

  render() {
    const { currentPage, maxRows } = this.state;
    const { totalItems, count } = this.props;
    const showCount = () => {
      return `Showing ${currentPage * maxRows - maxRows + 1}-${currentPage *
        maxRows} of ${count}`;
    };

    return (
      <div className="cmplx" data-testid="complex-pagination">
        <div className="cmplx__rows">
          <p>Show</p>
          <div className="cmplx__dd__container">
            <Dropwdown
              value={maxRows}
              //   onClick={this.setMaxRows}
              onClick={this.handleDropdownClick}
              items={[15, 30, 45]}
            />
          </div>
          <span style={{ paddingLeft: 5 }}>Opportunities per page</span>
        </div>
        <p className="cmplx__items">{showCount()}</p>
        <Pagination
          maxRows={maxRows}
          totalItems={count}
          getCurrentPage={this.getCurrentPage}
        />
      </div>
    );
  }
}

export default AnalyticsHOC(AllTabPagination);

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

  // let pagesize =  15;
  // let count =  495;
  // let totalpageno = count/pagesize; //5
  // let temp = []
  // let tempvar=null
  // for (let index = 0; index < totalpageno; index++) {
  //   if(index == 0 ){
  //     temp.push({
  //       from: index,
  //       to:pagesize
  //     })
  //   }else{
  //     temp.push({
  //       from: tempvar + 1,
  //       to:pagesize * (index+1)
  //     })
  //   }
  //   tempvar = pagesize * index
  // }

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

// export default AnalyticsHOC(Pagination);
