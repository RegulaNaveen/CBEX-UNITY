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
import Tooltip from 'apollo-react/components/Tooltip';

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

function Header({ index, title, onTitleChange, canEdit, disabled }) {
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleValueChange = useCallback(event => {
    setCurrentTitle(event.target.value);
  }, []);

  const handleInputBlur = useCallback(
    e => {
      onTitleChange(index, currentTitle);
    },
    [currentTitle]
  );

  if (index === 0) {
    return <p></p>;
  }

  return canEdit && !disabled ? (
    <TextField
      margin="none"
      value={currentTitle}
      onChange={handleValueChange}
      onBlur={handleInputBlur}
      InputProps={{ inputProps: { maxLength: 100 } }}
      error={currentTitle.length === 0}
      helperText={currentTitle.length === 0 ? 'Please add a name' : ''}
      fullWidth
    />
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
  disabled
}) {
  const [showModal, setShowModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const tableRef = useRef(null);

  function onHeaderTitleChange(index, title) {
    setColumns(cols =>
      cols.map((column, i) =>
        i === index ? { ...column, headerTitle: title } : column
      )
    );
  }

  function handleAddColumnClick() {
    let nextColumnsWithExtra = cloneDeep(columns);

    const newColumn = {
      accessor: `column-${nextColumnsWithExtra.length}`,
      customCell: cellProps => <TableCell {...cellProps} disabled={disabled} />,
      header: (
        <Header
          index={nextColumnsWithExtra.length}
          title=""
          onTitleChange={onHeaderTitleChange}
          canEdit={true}
          disabled={disabled}
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
  }

  function handleAddRowClick() {
    let nextRowsWithExtra = cloneDeep(rows);

    let nextColumnsWithExtra = cloneDeep(columns);

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
          canEdit: true
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
            <TableCell {...cellProps} disabled={disabled} />
          ),
          header: (
            <Header
              index={index}
              title={column.header}
              onTitleChange={onHeaderTitleChange}
              canEdit={column.canEdit}
              disabled={disabled}
            />
          ),
          headerTitle: column.header
        }))
      );
    }
  }, [showModal, tableConfiguration]);

  const toggleModal = useCallback(show => {
    setShowModal(show);
  }, []);

  const editRow = useCallback((rowIndex, key, value) => {
    console.log('rowIndex', rowIndex, key, value);
    setRows(rows =>
      rows.map((row, index) =>
        index === rowIndex ? { ...row, [key]: value } : row
      )
    );
  }, []);

  function handleSaveClick() {
    const newColumns = [];
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
    toggleModal(false);
  }

  function handleEdit(valueType, values) {
    if (valueType === 'column') {
      setColumns(values);
    } else {
      setRows(values);
    }
  }

  return (
    <React.Fragment>
      <div
        className={classNames({
          'table-answer': true,
          answered: answered,
          disabled: disabled
        })}
        onClick={() => !disabled && toggleModal(!showModal)}
      >
        <TableIcon
          className="table-icon"
          color={answered && !disabled ? '#0768fd' : '#595959'}
        />
        <Typography className="label" variant="body1">
          {answered ? 'Edit' : 'Add'} Table Data
        </Typography>
      </div>
      <Modal
        disableBackdropClick
        open={showModal}
        variant="default"
        onClose={() => toggleModal(false)}
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
          { label: 'Cancel', onClick: () => toggleModal(false) },
          {
            label: 'Save',
            onClick: () => handleSaveClick()
          }
        ]}
      >
        {!disabled ? (
          <TableControls
            columns={columns}
            rows={rows}
            onAddColumnClick={handleAddColumnClick}
            onAddRowClick={handleAddRowClick}
            onEdit={handleEdit}
            tableConfiguration={tableConfiguration}
          />
        ) : null}
        <ApolloTable
          rows={rows
            .map((row, rowIndex) => ({
              ...row,
              rowIndex,
              editRow
            }))
            .filter(row => !row.hidden)}
          columns={columns}
          hidePagination
          defaultPageSize={'All'}
          ref={tableRef}
        />
      </Modal>
    </React.Fragment>
  );
}

export default TableAnswer;
