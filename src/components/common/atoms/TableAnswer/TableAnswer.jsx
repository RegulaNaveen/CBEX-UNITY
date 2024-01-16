import React, { useState, useEffect, useCallback, useRef } from 'react';
import TableIcon from '../../../svg/Table';
import Typography from 'apollo-react/components/Typography';
import classNames from 'classnames';
import Modal from 'apollo-react/components/Modal';
import ApolloTable from 'apollo-react/components/Table';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import Popover from 'apollo-react/components/Popover';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import { diffArrays } from 'diff';
import TableCell from './TableCell';
import { cloneDeep } from 'lodash';
import TableControls from './TableControls';
import TextField from 'apollo-react/components/TextField';
import TablePreview from './TablePreview';
import Tooltip from 'apollo-react/components/Tooltip';
import { DEFAULT, TABLEANSWER } from '../../../../constants/app';
import CustomModal from '../../CustomModal';

function Title({ questionText, questionHint, questionHintJSON }) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleQuestionHintRef(ref) {
    setTimeout(() => {
      // updating question hint with decorators
      if (ref.current !== null) {
        const { editorState } = ref.current.state;
        const newEditorState = EditorState.set(editorState, {
          decorator: compositeDecorator
        });
        ref.current.setState({ editorState: newEditorState });
      }
    }, 700);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Typography variant="h6">{questionText}</Typography>
      {questionHint && (
        <div className="question-hint">
          <IconButton
            data-testid="question-tooltip-button"
            color="primary"
            size="small"
            className="question-tooltip-icon"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <InfoIcon className="info-icon" />
          </IconButton>
          <Popover
            data-testid="question-popover"
            className="popover-strategy-question"
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            PaperProps={{
              style: {
                borderColor: '#e9e9e9',
                boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
                padding: 10,
                maxInlineSize: '300px'
              }
            }}
          >
            <Typography>
              {questionHintJSON ? (
                <RichTextEditor
                  variant="view"
                  defaultValue={JSON.parse(questionHintJSON)}
                  ref={handleQuestionHintRef}
                />
              ) : (
                <div>{questionHint}</div>
              )}
            </Typography>
          </Popover>
        </div>
      )}
    </div>
  );
}

function Header({
  index,
  title,
  onTitleChange,
  canEdit,
  disabled,
  setSaveDisable,
  allExpanded
}) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [tooltipValue, setTooltipValue] = useState('');

  const columnRef = useRef(null);

  useEffect(() => {
    if (
      columnRef?.current?.lastChild?.children[0]?.scrollWidth >
      columnRef?.current?.lastChild?.children[0]?.clientWidth + 1
    ) {
      setTooltipValue(title);
    } else {
      setTooltipValue('');
    }
  }, [title]);

  const handleValueChange = useCallback(event => {
    setCurrentTitle(event.target.value);
  }, []);

  const handleInputBlur = useCallback(
    e => {
      onTitleChange(index, currentTitle);
      if (currentTitle.length === 0) {
        setSaveDisable(true);
      }
      if (
        columnRef?.current?.lastChild?.children[0]?.scrollWidth >
        columnRef?.current?.lastChild?.children[0]?.clientWidth + 1
      ) {
        setTooltipValue(currentTitle);
      } else {
        setTooltipValue('');
      }
    },
    [currentTitle]
  );

  if (index === 0) {
    return <p></p>;
  }

  return canEdit && !disabled ? (
    <Tooltip title={tooltipValue}>
      <TextField
        ref={columnRef}
        margin="none"
        value={currentTitle}
        multiline={allExpanded}
        onChange={handleValueChange}
        onBlur={handleInputBlur}
        InputProps={{ inputProps: { maxLength: 1000 } }}
        error={currentTitle.length === 0}
        helperText={currentTitle.length === 0 ? 'Please add a name' : ''}
        fullWidth
      />
    </Tooltip>
  ) : (
    <Tooltip title={currentTitle}>
      <Typography variant="bodyDefault" gutterBottom noWrap>
        {currentTitle}
      </Typography>
    </Tooltip>
  );
}

function TableAnswer({
  questionText,
  tableConfiguration,
  questionHint,
  questionHintJSON,
  sectionName,
  answers,
  answered,
  lastAnswer,
  onChange,
  disabled,
  forceBlur,
  onCascadeChange,
  toggleWatch,
  onFocus,
  onBlur
}) {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [warning, setWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const [saveDisable, setSaveDisable] = useState(true);
  const [allExpanded, setAllExpanded] = useState(false);

  function handleExpandAll(expanded) {
    setAllExpanded(expanded);
  }

  const tableRef = useRef(null);

  function onHeaderTitleChange(index, title) {
    setColumns(cols =>
      cols.map((column, i) =>
        i === index ? { ...column, headerTitle: title.trim() } : column
      )
    );
  }

  function handleAddColumnClick() {
    let nextColumnsWithExtra = cloneDeep(columns);

    if (nextColumnsWithExtra.length === 0) {
      nextColumnsWithExtra.push({
        header: ``,
        accessor: `header`,
        alwaysVisible: true,
        customCell: cellProps => (
          <TableCell
            {...cellProps}
            disabled={disabled}
            setSaveDisable={setSaveDisable}
          />
        ),
        header: (
          <Header
            index={nextColumnsWithExtra.length}
            title=""
            onTitleChange={onHeaderTitleChange}
            canEdit={true}
            disabled={disabled}
            allExpanded={allExpanded}
          />
        ),
        canEdit: true,
        headerTitle: ''
      });
    }

    const newColumn = {
      accessor: `column-${nextColumnsWithExtra.length}`,
      customCell: cellProps => (
        <TableCell
          {...cellProps}
          disabled={disabled}
          setSaveDisable={setSaveDisable}
        />
      ),
      header: (
        <Header
          index={nextColumnsWithExtra.length}
          title=""
          onTitleChange={onHeaderTitleChange}
          canEdit={true}
          disabled={disabled}
          allExpanded={allExpanded}
        />
      ),
      canEdit: true,
      headerTitle: ''
    };

    setColumns([...nextColumnsWithExtra, newColumn]);
    setRows(rows.map(row => ({ ...row, [newColumn.accessor]: '' })));

    setTimeout(() => {
      tableRef.current.horizontalScrollRef.current.children[0].scrollIntoView({
        behaviour: 'smooth',
        inline: 'end'
      });
    }, 700);
    if (onCascadeChange) onCascadeChange();
  }

  function handleAddRowClick() {
    let nextRowsWithExtra = cloneDeep(rows);

    let nextColumnsWithExtra = cloneDeep(columns);

    if (nextColumnsWithExtra.length === 0) {
      nextColumnsWithExtra.push({
        header: ``,
        accessor: `header`,
        alwaysVisible: true,
        customCell: cellProps => (
          <TableCell
            {...cellProps}
            disabled={disabled}
            setSaveDisable={setSaveDisable}
          />
        ),
        header: (
          <Header
            index={nextColumnsWithExtra.length}
            title=""
            onTitleChange={onHeaderTitleChange}
            canEdit={true}
            disabled={disabled}
            allExpanded={allExpanded}
          />
        ),
        canEdit: true,
        headerTitle: ''
      });
    }

    nextRowsWithExtra.push(
      columns.reduce(
        (acc, column) => {
          if (column.accessor !== 'header') {
            acc[column.accessor] = '';
          }
          return acc;
        },
        {
          header: ``,
          canEdit: true,
          rowId: `row-${nextRowsWithExtra.length}`
        }
      )
    );

    setColumns([...nextColumnsWithExtra]);
    setRows([...nextRowsWithExtra]);

    setTimeout(() => {
      tableRef.current.horizontalScrollRef.current.children[0].scrollIntoView({
        behaviour: 'smooth',
        block: 'end'
      });
    }, 700);
    if (onCascadeChange) onCascadeChange();
  }

  function handleModalClose() {
    if (toggleWatch) toggleWatch(false);
    if (onBlur) onBlur();
    toggleModal(false);
  }

  useEffect(() => {
    if (Array.isArray(tableConfiguration.rows)) {
      setRows(
        tableConfiguration.rows.map(row => ({
          ...row
        }))
      );
    }
    if (Array.isArray(tableConfiguration.columns)) {
      setColumns(
        tableConfiguration.columns.map((column, index) => ({
          ...column,
          customCell: cellProps => (
            <TableCell
              {...cellProps}
              disabled={disabled}
              setSaveDisable={setSaveDisable}
            />
          ),
          header: (
            <Header
              index={index}
              title={column.header}
              onTitleChange={onHeaderTitleChange}
              canEdit={column.canEdit}
              disabled={disabled}
              setSaveDisable={setSaveDisable}
              allExpanded={allExpanded}
            />
          ),
          headerTitle: column.header
        }))
      );
    }
  }, [showModal, tableConfiguration]);

  function removeDuplicates(array) {
    return array.reduce((acc, current) => {
      if (!acc.includes(current)) {
        acc.push(current);
      }
      return acc;
    }, []);
  }

  function duplicateCheck(rows, columns) {
    const duplicateRows = rows.filter(
      (value, index) => rows.indexOf(value) !== index
    );
    const duplicateColumns = columns.filter(
      (value, index) => columns.indexOf(value) !== index
    );
    if (duplicateRows.length > 0 || duplicateColumns.length > 0) {
      setWarning(true);
      setWarningTitle('Alert');
      setWarningText(
        duplicateRows.length > 0 && duplicateColumns.length > 0
          ? `${TABLEANSWER.DUPLICATE_ROWS} ${removeDuplicates(
              duplicateRows
            ).join(', ')}
              ${TABLEANSWER.DUPLICATE_COLUMNS} ${removeDuplicates(
                duplicateColumns
              ).join(', ')}`
          : duplicateRows.length > 0
            ? `${TABLEANSWER.DUPLICATE_ROWS} ${removeDuplicates(
                duplicateRows
              ).join(', ')}`
            : `${TABLEANSWER.DUPLICATE_COLUMNS} ${removeDuplicates(
                duplicateColumns
              ).join(', ')}`
      );
    }
  }

  useEffect(() => {
    setColumns(columns =>
      columns.map((column, index) => ({
        ...column,
        header: (
          <Header
            index={index}
            title={column.header}
            onTitleChange={onHeaderTitleChange}
            canEdit={column.canEdit}
            disabled={disabled}
            setSaveDisable={setSaveDisable}
            allExpanded={allExpanded}
          />
        )
      }))
    );
  }, [allExpanded]);

  useEffect(() => {
    if (rows.length > 0 && columns.length > 1) {
      let rowEmptyCheck;
      if (tableConfiguration.rows.length === 0) {
        rowEmptyCheck = rows.map(row => row[columns[0].accessor]);
      }
      const rowHeaders = rows.map(row => row.header);
      const columnHeaders = columns.map(column => column.headerTitle);
      const colDiff = diffArrays(
        tableConfiguration.columns.map(column => column.header),
        columns.map(column => column.headerTitle)
      );
      const colHiddenDiff = diffArrays(
        tableConfiguration.columns.map(column => column.hidden),
        columns.map(column => column.hidden)
      );
      const rowHiddenDiff = diffArrays(
        tableConfiguration.rows.map(row => row.hidden),
        rows.map(row => row.hidden)
      );
      const rowDiff = tableConfiguration.columns.map(
        column =>
          diffArrays(
            tableConfiguration.rows.map(row => row[column.accessor]),
            rows.map(row => row[column.accessor])
          ).length > 1
      );
      if (
        columnHeaders.includes('', 1) ||
        (rowEmptyCheck && rowEmptyCheck.includes('')) ||
        (rowHeaders.includes('') &&
          tableConfiguration.columns.length !== 0 &&
          tableConfiguration.rows.length !== 0)
      ) {
        setSaveDisable(true);
      } else if (
        colDiff.length > 1 ||
        rowDiff.includes(true) ||
        colHiddenDiff.length > 1 ||
        rowHiddenDiff.length > 1 ||
        (tableConfiguration.columns.length === 0 &&
          tableConfiguration.rows.length === 0)
      ) {
        setSaveDisable(false);
      } else {
        setSaveDisable(true);
      }
    }
  }, [rows, columns]);

  useEffect(() => {
    if (forceBlur === true) {
      handleSaveClick();
      if (toggleWatch) toggleWatch(false);
      if (onBlur) onBlur();
    }
  }, [forceBlur]);

  const toggleModal = useCallback(show => {
    setShowModal(show);
  }, []);

  const editRow = useCallback((rowIndex, key, value) => {
    setRows(rows =>
      rows.map((row, index) =>
        index === rowIndex ? { ...row, [key]: value.trim() } : row
      )
    );
    if (onCascadeChange) onCascadeChange();
  }, []);

  function handleSaveClick() {
    if (toggleWatch) toggleWatch(false);
    toggleModal(false);
    const newColumns = [];
    const rowHeaders = rows.map(row => row.header);
    const columnHeaders = columns.map(column => column.headerTitle);
    cloneDeep(columns).forEach(column => {
      delete column.header;
      column.header = column.headerTitle;
      delete column.customCell;
      delete column.headerTitle;
      newColumns.push(column);
    });
    if (
      rows.some(row => !row.header) ||
      newColumns.some((column, colIndex) => colIndex > 0 && !column.header)
    ) {
      return;
    }
    onChange({ rows, columns: newColumns }, lastAnswer);
    duplicateCheck(rowHeaders, columnHeaders);
  }

  function handleEdit(valueType, values) {
    if (valueType === 'column') {
      setColumns(values);
    } else {
      setRows(values);
    }
    if (onCascadeChange) onCascadeChange();
  }

  return (
    <React.Fragment>
      <div className="table-answer-container">
        <div
          data-testid="togglebtn"
          className={classNames({
            'table-answer': true,
            answered: answered,
            disabled: disabled
          })}
          onClick={() => {
            if (!disabled) {
              toggleModal(!showModal);
              if (!showModal) {
                if (toggleWatch) toggleWatch(true);
                if (onFocus) onFocus();
              } else {
                if (toggleWatch) toggleWatch(false);
                if (onBlur) onBlur();
              }
            }
          }}
        >
          <TableIcon
            className="table-icon"
            color={answered && !disabled ? '#0768fd' : '#595959'}
          />
          <Typography className="label" variant="body1">
            Edit Table Data
          </Typography>
        </div>
        {rows.length > 0 || columns.length > 0 ? (
          <TablePreview rows={rows} columns={columns} />
        ) : (
          ''
        )}
      </div>
      <Modal
        data-testid="tableAnswer-modal"
        disableBackdropClick
        open={showModal}
        variant="default"
        onClose={() => handleModalClose()}
        title={
          <Title
            questionText={questionText}
            questionHint={questionHint}
            questionHintJSON={questionHintJSON}
          />
        }
        subtitle={sectionName}
        className={'table-answer-modal'}
        id="table-answer-modal"
        buttonProps={[
          {
            label: 'Cancel',
            'data-testid': 'cancelButton',
            onClick: () => handleModalClose()
          },
          {
            label: 'Save',
            'data-testid': 'saveButton',
            onClick: () => handleSaveClick(),
            disabled: saveDisable
          }
        ]}
      >
        {!disabled ? (
          <TableControls
            data-testid="editTable"
            columns={columns}
            rows={rows}
            onAddColumnClick={handleAddColumnClick}
            onAddRowClick={handleAddRowClick}
            onEdit={handleEdit}
            tableConfiguration={tableConfiguration}
            allExpanded={allExpanded}
            onExpandAll={handleExpandAll}
          />
        ) : null}
        <ApolloTable
          rows={rows
            .map((row, rowIndex) => ({
              ...row,
              rowIndex,
              editRow,
              allExpanded
            }))
            .filter(row => !row.hidden)}
          columns={columns.map(column => ({
            ...column,
            fixedWidth: false
          }))}
          hidePagination
          defaultPageSize={'All'}
          ref={tableRef}
          classes={{
            root: 'answer-table'
          }}
        />
      </Modal>
      {warning && (
        <CustomModal
          open={warning}
          title={warningTitle}
          message={warningText}
          variant="error"
          onClose={() => setWarning(false)}
          buttonProps={[{ className: 'hidden' }, { label: DEFAULT.OK }]}
          id="error"
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </React.Fragment>
  );
}

export default TableAnswer;
