import React, { useEffect, useState, useRef } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';
import { useSelector } from 'react-redux';
import { getPanelStatus } from '../../../../redux/selectors/proposal';

export default function TablePreview({ columns, rows }) {
  const panelStatus = useSelector(state => getPanelStatus(state));

  return (
    <div className="custom-answer-table-container">
      <table className="custom-answer-table">
        <thead>
          <tr>
            {columns.length > 0 &&
              columns.map(column => (
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
          {rows.map(row => (
            <>
              <tr>
                {columns.map(column => (
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
