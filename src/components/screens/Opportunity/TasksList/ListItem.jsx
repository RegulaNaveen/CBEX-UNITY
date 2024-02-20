import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from 'apollo-react/components/Checkbox';
import DragIcon from 'apollo-react-icons/Drag';
import Tooltip from 'apollo-react/components/Tooltip';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import TextField from 'apollo-react/components/TextField';
import EllipsisHorizontal from 'apollo-react-icons/EllipsisHorizontal';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import User2Icon from 'apollo-react-icons/User2';
import CalendarIcon from 'apollo-react-icons/Calendar';
import PencilIcon from 'apollo-react-icons/Pencil';
import TrashIcon from 'apollo-react-icons/Trash';
import classNames from 'classnames';
import Typography from 'apollo-react/components/Typography';
import { useDispatch } from 'react-redux';
import {
  updateTaskDesc,
  editTask
} from '../../../../redux/actions/tasksList-actions';
import { updateTaskDescApi } from '../../../../api/tasksList';
import Loader from 'apollo-react/components/Loader';
import DeleteAlert from './DeleteAlert';

function OverflowEllipsis({ desc, show }) {
  return (
    <span
      className={classNames({
        ellipsis: true,
        show: show
      })}
    >
      <Tooltip placement="top" title={desc}>
        <EllipsisHorizontal />
      </Tooltip>
    </span>
  );
}

function ListItem({ index, task, dayDiffFromToday }) {
  const [overflowed, setOverflowed] = useState(false);
  const [descRef, setDescRef] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingDesc, setEditingDesc] = useState('');
  const [descEditRef, setDescEditRef] = useState(null);
  const [updatingDesc, setUpdatingDesc] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useDispatch();

  const handleResize = useCallback(() => {
    if (descRef) {
      setOverflowed(descRef.clientHeight > 48);
    }
  }, [descRef]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      handleResize();
    });

    if (descRef) {
      resizeObserver.observe(descRef);
    }

    return () => {
      if (descRef) {
        resizeObserver.unobserve(descRef);
      }
    };
  }, [descRef]);

  useEffect(() => {
    if (descEditRef) {
      const descInput = descEditRef.querySelector('input');
      if (descInput) {
        descInput.focus();
      }
    }
  }, [descEditRef]);

  const handleClick = label => () => {
    console.log(`You picked ${label}.`);
  };

  const handleEditClick = useCallback(() => {
    setEditingDesc(task.description);
    setEditing(true);
  }, [task, descEditRef]);

  const updateDesc = async () => {
    if (editingDesc === task.description) {
      return;
    }
    setUpdatingDesc(true);
    const updateDescResponse = await updateTaskDescApi(
      task.proposal_id,
      task.task_id,
      editingDesc
    );
    if (updateDescResponse.status === 200) {
      if (updateDescResponse.data) {
        if (updateDescResponse.data.result) {
          await dispatch(
            updateTaskDesc(
              task.task_id,
              updateDescResponse.data.result.description
            )
          );
        }
      }
    }
    setUpdatingDesc(false);
  };

  const handleEditBlur = useCallback(() => {
    if (editingDesc.length === 0) {
      // focus back to the input
      descEditRef.querySelector('input').focus();
    } else {
      setEditing(false);
      setDescEditRef(null);
      updateDesc();
    }
  }, [descEditRef, editingDesc, task]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteAlert(true);
  }, []);

  const handleDeleteAlertClose = useCallback(() => {
    setShowDeleteAlert(false);
  }, []);

  const menuItems = [
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <User2Icon fontSize="small" />
          <Typography className="menu-item-label">See Owners</Typography>
        </div>
      ),
      onClick: handleClick('See Owners'),
      disabled: true
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <CalendarIcon fontSize="small" />
          <Typography className="menu-item-label">History</Typography>
        </div>
      ),
      onClick: handleClick('History'),
      disabled: true
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <PencilIcon fontSize="small" />
          <Typography className="menu-item-label">Edit</Typography>
        </div>
      ),
      onClick: handleEditClick
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <TrashIcon fontSize="small" />
          <Typography className="menu-item-label">Delete</Typography>
        </div>
      ),
      onClick: handleDeleteClick,
      destructiveAction: true
    }
  ];

  const handleCheckboxClick = task => {
    setShowLoader(true);
    const taskData = {
      is_completed: !task.is_completed
    };
    dispatch(editTask(task.proposal_id, task.task_id, taskData)).then(() => {
      setShowLoader(false);
    });
  };

  if (editing || updatingDesc) {
    return (
      <div className={classNames(['edit-container'])}>
        <TextField
          ref={_ref => setDescEditRef(_ref)}
          value={editingDesc}
          onBlur={handleEditBlur}
          onChange={e => setEditingDesc(e.target.value)}
          InputProps={{
            inputProps: { maxLength: 200 }
          }}
          error={editingDesc.length === 0}
          helperText={
            editingDesc.length === 0 ? 'Description cannot be left blank' : ''
          }
          disabled={updatingDesc}
        />
        <div className="loader-container">
          <div style={{ display: 'flex', height: '24px', width: '24px' }}>
            {updatingDesc ? (
              <span
                style={{
                  marginLeft: '0px',
                  marginTop: '6px',
                  position: 'relative',
                  top: '15px'
                }}
              >
                <Loader
                  isInner
                  size={20}
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Draggable
        key={`drag-group-1-item-${index}`}
        draggableId={`drag-group-1-item-${index}`}
        index={index}
      >
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              className="task-item-drag-container"
              {...provided.draggableProps}
            >
              <span {...provided.dragHandleProps}>
                <DragIcon fontSize="small" />
              </span>
              <Checkbox
                checked={task.is_completed}
                style={{
                  marginLeft: '0.01rem',
                  marginTop: '-0.25rem'
                }}
                onClick={() => handleCheckboxClick(task)}
              />
              <div className="task-desc">
                <p
                  ref={_ref => setDescRef(_ref)}
                  className={classNames({
                    'font-red': dayDiffFromToday < 0 && !task.is_completed,
                    'font-bold': task.is_completed
                  })}
                >
                  {task.description}
                  <OverflowEllipsis show={overflowed} desc={task.description} />
                </p>
              </div>
              {showLoader && (
                <>
                  <div className="loader-container">
                    <div
                      style={{
                        display: 'flex',
                        height: '24px',
                        marginRight: '20px'
                      }}
                    >
                      <span
                        style={{
                          marginLeft: '0px',
                          position: 'relative',
                          top: '15px'
                        }}
                      >
                        <Loader
                          isInner
                          size={20}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </>
              )}

              <Tooltip disableFocusListener id="task-list-menu-btn-tooltip">
                <IconMenuButton
                  menuItems={menuItems}
                  size="small"
                  id="task-list-item-menu-btn"
                >
                  <EllipsisVertical />
                </IconMenuButton>
              </Tooltip>
            </div>
          </div>
        )}
      </Draggable>
      <DeleteAlert
        task={task}
        open={showDeleteAlert}
        onClose={handleDeleteAlertClose}
      />
    </>
  );
}

export default ListItem;
