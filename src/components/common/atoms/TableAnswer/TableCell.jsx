import React, { useState, useEffect, useCallback } from 'react';
import Typography from 'apollo-react/components/Typography';
import TextField from 'apollo-react/components/TextField';

function TableCell({
  row,
  row: { rowIndex, editRow, canEdit },
  column,
  type,
  disabled
}) {
  const [value, setValue] = useState(row[column.accessor] || '');

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
      if (column.accessor === 'header') {
        return (
          <div className="table-cell">
            {canEdit && !disabled ? (
              <TextField
                margin="none"
                value={value}
                onChange={handleValueChange}
                onBlur={handleInputBlur}
                InputProps={{ inputProps: { maxLength: 100 } }}
                error={value.length === 0}
                helperText={value.length === 0 ? 'Please add a name' : ''}
                fullWidth
              />
            ) : (
              <Typography variant="bodyDefault" gutterBottom noWrap>
                {value}
              </Typography>
            )}
          </div>
        );
      }
      return (
        <div className="table-cell">
          <TextField
            margin="none"
            value={value}
            onChange={handleValueChange}
            onBlur={handleInputBlur}
            fullWidth
            disabled={disabled}
          />
        </div>
      );
  }
}

TableCell.defaultProps = {
  type: 'text',
  defaultValue: ''
};

export default TableCell;
