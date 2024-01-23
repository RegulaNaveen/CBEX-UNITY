import React, { useEffect, useState, useRef } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';

export default function TablePreview({ columns, rows }) {
  var totalNotHiddenColumns = columns.filter(column => !column.hidden);
  var totalNotHiddenRows = rows.filter(row => !row.hidden);

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
                    <p>{column.headerTitle}</p>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
