import IconMenuButton from 'apollo-react/components/IconMenuButton';
import React, { useState, useEffect, useRef } from 'react';
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
  onEdit
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
      newMenuItems.push({
        text: 'Edit Columns',
        onClick: handleEditColumns
      });
      newMenuItems.push({
        text: 'Edit Rows',
        onClick: handleEditRows
      });
    }

    setMenuItems(newMenuItems);
  }, [tableConfiguration]);

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      editingValues,
      result.source.index,
      result.destination.index
    );

    setEditingValues(items);
  }

  function toggleEditing(type) {
    setEditing(type);
  }

  function handleAddColumnClick(e) {
    console.log('e', e);
    onAddColumnClick();
  }

  function handleAddRowClick() {
    onAddRowClick();
  }

  function handleEditColumns() {
    toggleEditing('columns');
    setEditingValues(
      columns
        .map((column, index) => ({ ...column, index, hidden: false }))
        .filter(column => column.accessor !== 'header')
    );
  }

  function handleEditRows() {
    toggleEditing('rows');
    setEditingValues(
      rows.map((row, index) => ({ ...row, index, hidden: false }))
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
    if (valueType === 'column') {
      editedValues.unshift(columns[0]);
    }
    onEdit(valueType, editedValues);
    setEditing(null);
    setEditingValues([]);
  }

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="table-controls">
        <IconMenuButton menuItems={menuItems} size="small" ref={menuRef}>
          <CogIcon />
        </IconMenuButton>
      </div>
      <Popover
        open={editing}
        anchorEl={menuRef.current}
        onClose={() => handlePopoverClose()}
        PaperProps={{
          style: {
            borderColor: '#e9e9e9',
            boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
            padding: 12
          }
        }}
      >
        <div style={{ height: '240px', overflow: 'auto' }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {editingValues.map((item, index) => (
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
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                              paddingBottom: '1rem',
                              maxHeight: '250px'
                            }}
                          >
                            <DragIcon fontSize="small" />
                            <p
                              style={{
                                flexGrow: 1,
                                maxWidth: '100px',
                                marginRight: '1rem'
                              }}
                            >
                              {item.headerTitle}
                            </p>
                            <Checkbox
                              checked={!item.hidden}
                              onChange={() => handleCheckboxChange(item.index)}
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
