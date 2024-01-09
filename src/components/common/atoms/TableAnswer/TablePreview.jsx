import React, { useEffect, useState, useRef } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';
import { set } from 'lodash';

export default function TablePreview({ columns, rows }) {
  const [useTableSize, setUseTableSize] = useState(226);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      var useTableSize = document.getElementById('table1').clientWidth;
      setUseTableSize(useTableSize);
    }
    isInitialRender.current = false;
  });

  return (
    <div className="custom-answer-table-container">
      <table className="custom-answer-table" id="table1">
        <thead>
          <tr>
            {columns.length > 0 &&
              columns.map(column => <th>{column.headerTitle}</th>)}
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
                          {row[column.accessor].length < 40 ? (
                            row[column.accessor]
                          ) : (
                            <>
                              {useTableSize == 226 ? (
                                <Tooltip
                                  title={row[column.accessor]}
                                  placement="top"
                                  id="table-tooltip"
                                >
                                  <p>{row[column.accessor].substring(0, 40)}</p>
                                </Tooltip>
                              ) : (
                                <p> {row[column.accessor]}</p>
                              )}
                            </>
                          )}
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
