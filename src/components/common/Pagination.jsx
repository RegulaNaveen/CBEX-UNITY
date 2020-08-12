// @flow
import React from 'react';
import classnames from 'classnames';
import { chunk } from 'lodash';

import { ArrowLeft, ArrowRight, More } from '../svg/index';

type Props = {
  currentPage: number,
  maxRows: number,
  totalItems: number,
  currentChunk: number,
  setCurrentChunk: Function
};

const Pagination = (props: Props) => {
  const {
    currentPage,
    maxRows,
    totalItems,
    currentChunk,
    setCurrentChunk
  } = props;

  const chunks = chunk(
    [...Array.from(Array(Math.ceil(totalItems / maxRows)), (_, i) => i + 1)],
    4
  );

  function handlePreviousChunk() {
    if (currentChunk - 1 >= 0) setCurrentChunk(currentChunk - 1);
  }

  function handleNextChunk() {
    console.log(setCurrentChunk);
    if (currentChunk + 1 < chunks.length) setCurrentChunk(currentChunk + 1);
  }

  function renderLeftControls() {
    if (currentChunk !== 0)
      return [
        <button
          type="button"
          className="pagination__arrow"
          onClick={handlePreviousChunk}
        >
          <ArrowLeft className="pagination__svg" />
        </button>,
        <More className="pagination__svg" />
      ];

    return [<div />, <div />];
  }

  function renderRightControls() {
    if (currentChunk !== chunks.length - 1)
      return [
        <More className="pagination__svg" />,
        <button
          type="button"
          className="pagination__arrow"
          onClick={handleNextChunk}
        >
          <ArrowRight className="pagination__svg" />
        </button>
      ];

    return [<div />, <div />];
  }

  return (
    <div className="pagination">
      {renderLeftControls()}
      {chunks[currentChunk].map(page => (
        <button
          type="button"
          className={classnames('pagination__page', {
            selected: page === currentPage
          })}
        >
          {page}
        </button>
      ))}
      {renderRightControls()}
    </div>
  );
};

export default Pagination;
