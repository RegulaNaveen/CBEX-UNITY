import IconMenuButton from 'apollo-react/components/IconMenuButton';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CogIcon from 'apollo-react-icons/Cog';
import Popover from 'apollo-react/components/Popover';
import DragIcon from 'apollo-react-icons/Drag';
import Checkbox from 'apollo-react/components/Checkbox';
import Button from 'apollo-react/components/Button';
import { cloneDeep } from 'lodash';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function TableControls({
  tableConfiguration,
  columns,
  rows,
  onAddColumnClick,
  onAddRowClick,
  onEdit,
  allExpanded,
  onExpandAll
}) {
  const [editing, setEditing] = useState(null);
  const [editingValues, setEditingValues] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const menuRef = useRef(null);

  useEffect(() => {
    const newMenuItems = [];
    if (tableConfiguration) {
      if (tableConfiguration.canAddColumn) {
        newMenuItems.push({
          text: 'Add Column',
          onClick: handleAddColumnClick
        });
      }
      if (tableConfiguration.canAddRow) {
        newMenuItems.push({
          text: 'Add Row',
          onClick: handleAddRowClick
        });
      }
      if (tableConfiguration.canEditColumn || tableConfiguration.canAddColumn) {
        newMenuItems.push({
          text: 'Edit Columns',
          onClick: handleEditColumns
        });
      }
      if (tableConfiguration.canEditRow || tableConfiguration.canAddRow) {
        newMenuItems.push({
          text: 'Edit Rows',
          onClick: handleEditRows
        });
      }
    }

    setMenuItems(newMenuItems);
  }, [rows, columns, tableConfiguration]);

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    let nonEditablesCount = 0;

    if (editing === 'columns') {
      nonEditablesCount = editingValues.filter(
        val => val.accessor === 'header' || !val.canEdit
      ).length;
    } else {
      nonEditablesCount = editingValues.filter(val => !val.canEdit).length;
    }

    const items = reorder(
      editingValues,
      result.source.index + nonEditablesCount,
      result.destination.index + nonEditablesCount
    );

    setEditingValues(items);
  }

  function toggleEditing(type) {
    setEditing(type);
  }

  function handleAddColumnClick(e) {
    onAddColumnClick();
  }

  function handleAddRowClick() {
    onAddRowClick();
  }

  function handleEditColumns() {
    toggleEditing('columns');
    setEditingValues(
      columns.map((column, index) => ({
        ...column,
        index,
        hidden: !!column.hidden
      }))
    );
  }

  function handleEditRows() {
    toggleEditing('rows');
    setEditingValues(
      rows.map((row, index) => ({ ...row, index, hidden: !!row.hidden }))
    );
  }

  function handleCheckboxChange(index) {
    setEditingValues(
      editingValues.map((item, i) => {
        if (item.index === index) {
          return { ...item, hidden: !item.hidden };
        }
        return item;
      })
    );
  }

  function handlePopoverClose() {
    setEditing(null);
    setEditingValues([]);
  }

  function handleApplyClick() {
    const valueType = editing === 'columns' ? 'column' : 'row';
    const editedValues = cloneDeep(editingValues);
    onEdit(valueType, editedValues);
    setEditing(null);
    setEditingValues([]);
  }

  // if (menuItems.length === 0) {
  //   return null;
  // }

  return (
    <React.Fragment>
      <div className="table-controls">
        <Checkbox
          label="Expand all"
          checked={allExpanded}
          onChange={() => onExpandAll(!allExpanded)}
        />
        {useMemo(
          () =>
            menuItems.length !== 0 ? (
              <IconMenuButton
                id="table-settings-menu-btn"
                data-testid="settingsMenuButton"
                menuItems={menuItems}
                size="small"
                ref={menuRef}
              >
                <CogIcon />
              </IconMenuButton>
            ) : null,
          [menuItems]
        )}
      </div>
      <Popover
        open={!!editing}
        anchorEl={menuRef.current}
        data-testid="popover"
        onClose={() => handlePopoverClose()}
        PaperProps={{
          style: {
            borderColor: '#e9e9e9',
            boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
            padding: 12
          },
          'data-testid': 'popoverTrigger'
        }}
      >
        <div style={{ height: '240px', overflow: 'auto' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {editingValues
                    .filter(val => {
                      if (editing === 'columns') {
                        return val.accessor !== 'header' && val.canEdit;
                      }
                      return val.canEdit;
                    })
                    .map((item, index) => (
                      <Draggable
                        key={`drag${index}`}
                        draggableId={`drag${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            data-testid={`draggable-${index}`}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                paddingBottom: '1rem'
                                // maxHeight: '250px'
                              }}
                            >
                              <DragIcon fontSize="small" />
                              <p
                                style={{
                                  flexGrow: 1,
                                  maxWidth: '100px',
                                  marginRight: '1rem',
                                  wordBreak: 'break-word'
                                }}
                              >
                                {editing === 'columns'
                                  ? item.headerTitle
                                  : item.header}
                              </p>
                              <Checkbox
                                checked={!item.hidden}
                                data-testid="checkboxChange"
                                onChange={() =>
                                  handleCheckboxChange(item.index)
                                }
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="primary" onClick={handleApplyClick}>
            Apply
          </Button>
        </div>
      </Popover>
    </React.Fragment>
  );
}

export default TableControls;
