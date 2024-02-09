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

export default function TablePreview({ columns, rows }) {
  const tableColumnRef = useRef(null);
  const tableRowRef = useRef(null);
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const prevSearchResult = useSelector(selectPrevSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );

  useEffect(() => {
    var totalNotHiddenColumns = columns.filter(column => !column.hidden);
    var totalNotHiddenRows = rows.filter(row => !row.hidden);
    if (currentSearchResult !== null && tableColumnRef.current !== null) {
      totalNotHiddenColumns.map((column, index) => {
        if (currentSearchResult.inputText === column.headerTitle) {
          setTimeout(() => {
            tableColumnRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
            dispatch(autoNavigationCompletedAction());
          }, 400);
        }
      });
    }

    if (currentSearchResult !== null && tableRowRef.current !== null) {
      totalNotHiddenRows.map(row => {
        totalNotHiddenColumns.map((column, index) => {
          if (currentSearchResult.inputText === row[column.accessor]) {
            setTimeout(() => {
              tableRowRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
              });
              dispatch(autoNavigationCompletedAction());
            }, 400);
          }
        });
      });
    }
  }, [
    currentSearchResult,
    tableColumnRef.current,
    tableRowRef.current,
    prevSearchResult,
    autoNavigatedToCurrentResult,
    query
  ]);

  return (
    <div className="custom-answer-table-container">
      <table className="custom-answer-table">
        <thead>
          <tr>
            {columns.length > 1 &&
              columns.map(
                column =>
                  !column.hidden && (
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
                      ref={tableColumnRef}
                    >
                      <Tooltip
                        title={column.headerTitle}
                        placement="top"
                        id="table-tooltip"
                      >
                        <p>{column.headerTitle}</p>
                      </Tooltip>
                    </th>
                  )
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
                          <>
                            <td
                              ref={tableRowRef}
                              style={{
                                color:
                                  currentSearchResult !== null &&
                                  currentSearchResult.inputText ===
                                    row[column.accessor]
                                    ? '#fff'
                                    : '',
                                backgroundColor:
                                  currentSearchResult !== null &&
                                  currentSearchResult.inputText ===
                                    row[column.accessor]
                                    ? '#0557d559'
                                    : ''
                              }}
                            >
                              <Tooltip
                                title={row[column.accessor]}
                                placement="top"
                                id="table-tooltip"
                              >
                                <p>{row[column.accessor]}</p>
                              </Tooltip>
                            </td>
                          </>
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
