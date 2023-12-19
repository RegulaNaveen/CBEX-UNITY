import React, { useState, useEffect, useCallback } from 'react';
import Typography from 'apollo-react/components/Typography';
import TextField from 'apollo-react/components/TextField';

function TableCell({ row, row: { rowIndex, editRow }, column, type }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (column.accessor && row[column.accessor]) {
      setValue(row[column.accessor]);
    }
  }, [row, column]);

  const handleValueChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  const handleInputBlur = useCallback(
    e => {
      editRow(rowIndex, column.accessor, value);
    },
    [value]
  );

  switch (type) {
    case 'text':
    default:
      return (
        <div className="table-cell">
          {column.accessor === 'header' ? (
            <Typography variant="bodyDefault" gutterBottom noWrap>
              {value}
            </Typography>
          ) : (
            <TextField
              margin="none"
              value={value}
              onChange={handleValueChange}
              onBlur={handleInputBlur}
            />
          )}
        </div>
      );
  }
}

TableCell.defaultProps = {
  type: 'text',
  defaultValue: ''
};

export default TableCell;
