import React, { useState, useEffect, useCallback, useRef } from 'react';
import Typography from 'apollo-react/components/Typography';
import TextField from 'apollo-react/components/TextField';
import Tooltip from 'apollo-react/components/Tooltip';
import classNames from 'classnames';

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
  const [openTooltip, setOpenTooltip] = useState(false);

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

  const handleValueChange = useCallback((event, header) => {
    setValue(event.target.value);
    if (event.target.value.length === 0 && header) {
      setSaveDisable(true);
    } else {
      setSaveDisable(false);
    }
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
          <div
            className={classNames({
              'table-cell': true,
              'h-100': row.longestKey !== column.accessor
            })}
          >
            {canEdit && !disabled ? (
              <Tooltip title={tooltipValue} open={openTooltip}>
                <TextField
                  ref={rowRef}
                  data-testid="row-header"
                  className={'row-header'}
                  margin="none"
                  value={value}
                  multiline={row.allExpanded}
                  onMouseOver={() => {
                    if (rowRef.current.contains(document.activeElement)) {
                      setOpenTooltip(false);
                    } else setOpenTooltip(true);
                  }}
                  onMouseOut={() => {
                    setOpenTooltip(false);
                  }}
                  onFocus={e => {
                    setOpenTooltip(false);
                    setTimeout(() => {
                      rowRef?.current?.focus();
                    }, 100);
                  }}
                  onChange={e => handleValueChange(e, 'header')}
                  onBlur={handleInputBlur}
                  InputProps={{
                    inputProps: { maxLength: 999 }
                  }}
                  error={value.length === 0}
                  helperText={value.length === 0 ? 'Please add a name' : ''}
                  fullWidth
                />
              </Tooltip>
            ) : (
              <Tooltip title={value}>
                <Typography
                  variant="bodyDefault"
                  gutterBottom
                  noWrap
                  emphasis="high"
                >
                  {value}
                </Typography>
              </Tooltip>
            )}
          </div>
        );
      }
      return (
        <div
          className={classNames({
            'table-cell': true,
            'h-100': row.longestKey !== column.accessor
          })}
        >
          <Tooltip title={tooltipValue} open={openTooltip}>
            <TextField
              ref={rowRef}
              margin="none"
              value={value}
              data-testid="table-cell"
              multiline={row.allExpanded}
              onMouseOver={() => {
                if (rowRef.current.contains(document.activeElement)) {
                  setOpenTooltip(false);
                } else setOpenTooltip(true);
              }}
              onMouseOut={() => {
                setOpenTooltip(false);
              }}
              onFocus={e => {
                setOpenTooltip(false);
                setTimeout(() => {
                  rowRef?.current?.focus();
                }, 100);
              }}
              onChange={handleValueChange}
              onBlur={handleInputBlur}
              fullWidth
              disabled={disabled}
              InputProps={{ inputProps: { maxLength: 999 } }}
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
