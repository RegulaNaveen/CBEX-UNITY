import React, { useState, useEffect, useCallback, useRef } from 'react';
import Typography from 'apollo-react/components/Typography';
import TextField from 'apollo-react/components/TextField';
import Tooltip from 'apollo-react/components/Tooltip';

function TableCell({
  row,
  row: { rowIndex, editRow, canEdit },
  column,
  type,
  disabled,
  setSaveDisable
}) {
  const [value, setValue] = useState(row[column.accessor] || '');
  const [tooltipValue, setTooltipValue] = useState('');

  const rowRef = useRef(null);

  useEffect(() => {
    if (column.accessor && row[column.accessor]) {
      setValue(row[column.accessor]);
    }
    if (
      rowRef?.current?.lastChild?.children[0]?.scrollWidth >
      rowRef?.current?.lastChild?.children[0]?.clientWidth + 1
    ) {
      setTooltipValue(value);
    } else {
      setTooltipValue('');
    }
  }, [row, column]);

  const handleValueChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  const handleInputBlur = useCallback(
    e => {
      editRow(rowIndex, column.accessor, value);
      if (value.length === 0) {
        setSaveDisable(true);
      }
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
              <Tooltip title={tooltipValue}>
                <TextField
                  ref={rowRef}
                  className="row-header"
                  margin="none"
                  value={value}
                  multiline={row.allExpanded}
                  onChange={handleValueChange}
                  onBlur={handleInputBlur}
                  InputProps={{
                    inputProps: { maxLength: 1000 }
                  }}
                  error={value.length === 0}
                  helperText={value.length === 0 ? 'Please add a name' : ''}
                  fullWidth
                />
              </Tooltip>
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
          <Tooltip title={tooltipValue}>
            <TextField
              ref={rowRef}
              margin="none"
              value={value}
              multiline={row.allExpanded}
              onChange={handleValueChange}
              onBlur={handleInputBlur}
              fullWidth
              disabled={disabled}
              InputProps={{ inputProps: { maxLength: 1000 } }}
            />
          </Tooltip>
        </div>
      );
  }
}

TableCell.defaultProps = {
  type: 'text',
  defaultValue: ''
};

export default TableCell;
