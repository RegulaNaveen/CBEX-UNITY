import React, { useEffect, useState, useRef } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import {
  selectQuery,
  selectCurrentSearchResult,
  selectAutoNavigatedToCurrentResult
} from '../../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';

export default function TablePreview({ columns, rows }) {
  var totalNotHiddenColumns = columns.filter(column => !column.hidden);
  var totalNotHiddenRows = rows.filter(row => !row.hidden);
  const tableColumnRef = useRef(null);
  const tableRowRef = useRef(null);
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );

  useEffect(() => {
    if (
      currentSearchResult !== null &&
      tableColumnRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      totalNotHiddenColumns.map((column, index) => {
        if (currentSearchResult.inputText === column.headerTitle) {
          setTimeout(() => {
            tableColumnRef.current.scrollIntoView({
              behavior: 'auto',
              block: 'center',
              inline: 'nearest'
            });
            dispatch(autoNavigationCompletedAction());
          }, 700);
        }
      });
      totalNotHiddenRows.map(row => {
        totalNotHiddenColumns.map((column, index) => {
          if (currentSearchResult.inputText === row[column.accessor]) {
            setTimeout(() => {
              tableRowRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'nearest'
              });
              dispatch(autoNavigationCompletedAction());
            }, 700);
          }
        });
      });
    }
  }, [
    currentSearchResult,
    tableColumnRef.current,
    autoNavigatedToCurrentResult
  ]);

  return (
    <div className="custom-answer-table-container">
      <table className="custom-answer-table">
        <thead>
          <tr>
            {totalNotHiddenColumns.length > 1 &&
              totalNotHiddenColumns.map(column => (
                <th>
                  <Tooltip
                    title={column.headerTitle}
                    placement="top"
                    id="table-tooltip"
                  >
                    <p ref={tableColumnRef}>
                      <Highlighter
                        searchWords={[
                          `${
                            currentSearchResult !== null &&
                            currentSearchResult.inputText ===
                              column.headerTitle &&
                            query !== null
                              ? query
                              : ''
                          }`
                        ]}
                        autoEscape={true}
                        textToHighlight={column.headerTitle}
                        highlightClassName="search-highlight"
                      />
                    </p>
                  </Tooltip>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {totalNotHiddenRows.map(row => (
            <>
              <tr>
                {totalNotHiddenColumns.map(column => (
                  <>
                    {row[column.accessor] ? (
                      <>
                        <td>
                          <Tooltip
                            title={row[column.accessor]}
                            placement="top"
                            id="table-tooltip"
                          >
                            <p ref={tableRowRef}>
                              <Highlighter
                                searchWords={[
                                  `${
                                    currentSearchResult !== null &&
                                    currentSearchResult.inputText ===
                                      row[column.accessor] &&
                                    query !== null
                                      ? query
                                      : ''
                                  }`
                                ]}
                                autoEscape={true}
                                textToHighlight={row[column.accessor]}
                                highlightClassName="search-highlight"
                              />
                            </p>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
