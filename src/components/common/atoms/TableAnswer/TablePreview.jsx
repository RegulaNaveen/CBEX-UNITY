import React from 'react';

export default function TablePreview({ columns, rows }) {
  return (
    <div style={{ 'overflow-x': 'auto' }}>
      <table className="custom-answer-table">
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
                  <td>{row[column.accessor] ? row[column.accessor] : ''}</td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
