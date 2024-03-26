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
function TablePreviewCell({ row, column, rowIndex, colIndex }) {
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
      !autoNavigatedToCurrentResult &&
      currentSearchResult.colIndex === colIndex &&
      currentSearchResult.rowIndex === rowIndex
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
  }, [currentSearchResult, cellRef.current, rowIndex, colIndex]);

  return (
    <td
      ref={cellRef}
      style={{
        color:
          currentSearchResult !== null &&
          currentSearchResult.inputText === row[column.accessor] &&
          currentSearchResult.colIndex === colIndex &&
          currentSearchResult.rowIndex === rowIndex
            ? '#fff'
            : '',
        backgroundColor:
          currentSearchResult !== null &&
          currentSearchResult.inputText === row[column.accessor] &&
          currentSearchResult.colIndex === colIndex &&
          currentSearchResult.rowIndex === rowIndex
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

function TablePreviewColumnCell({ column, colIndex }) {
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
      !autoNavigatedToCurrentResult &&
      currentSearchResult.colIndex === colIndex &&
      currentSearchResult.rowIndex === null
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
  }, [
    currentSearchResult,
    autoNavigatedToCurrentResult,
    cellRef.current,
    colIndex
  ]);

  return (
    <th
      key={colIndex}
      ref={cellRef}
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
                (column, colIndex) =>
                  !column.hidden && (
                    <TablePreviewColumnCell
                      column={column}
                      colIndex={colIndex}
                    />
                  )
              )}
          </tr>
        </thead>
        <tbody>
          {rows.map(
            (row, rowIndex) =>
              !row.hidden && (
                <>
                  <tr>
                    {columns.map(
                      (column, colIndex) =>
                        !column.hidden && (
                          <>
                            {row[column.accessor] ? (
                              <TablePreviewCell
                                row={row}
                                column={column}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                              />
                            ) : (
                              <td className="blankRow"> - </td>
                            )}
                          </>
                        )
                    )}
                  </tr>
                </>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
