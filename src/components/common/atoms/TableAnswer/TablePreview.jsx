import React, { useEffect, useState, useRef } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import {
  selectQuery,
  selectCurrentSearchResult,
  selectAutoNavigatedToCurrentResult,
  selectPrevSearchResult
} from '../../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';

// TablePreviewCell component
function TablePreviewCell({ row, column }) {
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const prevSearchResult = useSelector(selectPrevSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );

  const dispatch = useDispatch();

  const cellRef = useRef(null);

  useEffect(() => {
    if (
      currentSearchResult !== null &&
      currentSearchResult.inputText === row[column.accessor] &&
      cellRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      const delay =
        prevSearchResult && prevSearchResult.tab !== currentSearchResult.tab
          ? 700
          : 1400;
      setTimeout(() => {
        cellRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        dispatch(autoNavigationCompletedAction());
      }, delay);
    }
  }, [currentSearchResult, autoNavigatedToCurrentResult, cellRef.current]);

  return (
    <td
      ref={cellRef}
      style={{
        color:
          currentSearchResult !== null &&
          currentSearchResult.inputText === row[column.accessor]
            ? '#fff'
            : '',
        backgroundColor:
          currentSearchResult !== null &&
          currentSearchResult.inputText === row[column.accessor]
            ? '#0557d559'
            : ''
      }}
    >
      <Tooltip title={row[column.accessor]} placement="top" id="table-tooltip">
        <p>{row[column.accessor]}</p>
      </Tooltip>
    </td>
  );
}
// TablePreviewColumnCell component

function TablePreviewColumnCell({ column }) {
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const prevSearchResult = useSelector(selectPrevSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );

  const dispatch = useDispatch();

  const cellRef = useRef(null);

  useEffect(() => {
    if (
      currentSearchResult !== null &&
      currentSearchResult.inputText === column.headerTitle &&
      cellRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      const delay =
        prevSearchResult && prevSearchResult.tab !== currentSearchResult.tab
          ? 700
          : 1400;
      setTimeout(() => {
        cellRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        dispatch(autoNavigationCompletedAction());
      }, delay);
    }
  }, [currentSearchResult, autoNavigatedToCurrentResult, cellRef.current]);

  return (
    <th
      style={{
        color:
          currentSearchResult !== null &&
          currentSearchResult.inputText === column.headerTitle
            ? '#fff'
            : '',
        backgroundColor:
          currentSearchResult !== null &&
          currentSearchResult.inputText === column.headerTitle
            ? '#0557d559'
            : ''
      }}
      ref={cellRef}
    >
      <Tooltip title={column.headerTitle} placement="top" id="table-tooltip">
        <p>{column.headerTitle}</p>
      </Tooltip>
    </th>
  );
}

export default function TablePreview({ columns, rows }) {
  return (
    <div className="custom-answer-table-container">
      <table className="custom-answer-table">
        <thead>
          <tr>
            {columns.length > 1 &&
              columns.map(
                column =>
                  !column.hidden && <TablePreviewColumnCell column={column} />
              )}
          </tr>
        </thead>
        <tbody>
          {rows.map(
            row =>
              !row.hidden && (
                <>
                  <tr>
                    {columns.map(column => (
                      <>
                        {row[column.accessor] ? (
                          <TablePreviewCell row={row} column={column} />
                        ) : (
                          <td className="blankRow"> - </td>
                        )}
                      </>
                    ))}
                  </tr>
                </>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
