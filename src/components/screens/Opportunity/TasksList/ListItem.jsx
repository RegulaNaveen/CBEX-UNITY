import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';
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
import IconButton from 'apollo-react/components/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTaskDesc,
  editTask
} from '../../../../redux/actions/tasksList-actions';
import { updateTaskDescApi } from '../../../../api/tasksList';
import Loader from 'apollo-react/components/Loader';
import DeleteAlert from './DeleteAlert';
import { SocketContext } from '../../../../context/SocketContext';
import {
  selectCurrentSearchResult,
  selectAutoNavigatedToCurrentResult
} from '../../../../redux/selectors/search';
import SeeOwners from './SeeOwnersModal';
import { selectActiveTeamQuestions } from '../../../../redux/selectors/proposal';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';
import { selectCanTaskReorder } from '../../../../redux/selectors/tasks';
import { processRole } from './utils';

function OverflowEllipsis({ show }) {
  return (
    <span
      className={classNames({
        ellipsis: true,
        show: show
      })}
    >
      <EllipsisHorizontal />
    </span>
  );
}

const TaskListToolbarMenuPortal = props => {
  const modalRoot = document.getElementById('tasklist-modal-wrapper');
  return ReactDOM.createPortal(props.children, modalRoot);
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
  ...draggableStyle
});

function ListItem({
  index,
  task,
  day,
  dayDiffFromToday,
  editable,
  openHistoryModal
}) {
  const [overflowed, setOverflowed] = useState(false);
  const [descRef, setDescRef] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editingDesc, setEditingDesc] = useState('');
  const [descEditRef, setDescEditRef] = useState(null);
  const [updatingDesc, setUpdatingDesc] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );
  const canReorder = useSelector(selectCanTaskReorder);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState({
    count: 0,
    mounted: false
  });
  const [taskId, setTaskId] = useState(null);
  const proposalTeamQuestions = useSelector(selectActiveTeamQuestions);
  const locked = !!task.locked;
  const lockedBy = locked ? task.lockedBy : null;
  const taskDescRef = useRef(null);
  const dispatch = useDispatch();

  const { lockTaskWrapper, unlockTaskWrapper } = useContext(SocketContext);

  const handleResize = useCallback(() => {
    if (descRef) {
      setOverflowed(descRef.clientHeight > 48);
    }
  }, [descRef]);
  useEffect(() => {
    if (
      currentSearchResult !== null &&
      taskDescRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      if (currentSearchResult.searchIndex === task.id) {
        setTimeout(() => {
          taskDescRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 700);
      }
    }
  }, [taskDescRef.current, currentSearchResult, autoNavigatedToCurrentResult]);

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

  const handleHistoryClick = () => {
    openHistoryModal(task.task_id);
  };

  const handleSeeOwners = text => () => {
    setTaskId(task.task_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskId(null);
    setIsModalOpen(false);
  };

  const handleEditClick = useCallback(() => {
    lockTaskWrapper({
      taskId: task.task_id,
      userEmail: localStorage.getItem('userEmail'),
      userId: localStorage.getItem('userId'),
      proposalId: task.proposal_id,
      userName: localStorage.getItem('userName'),
      oppNo: localStorage.getItem('oppNo') || ''
    });
    setEditingDesc(task.description);
    setEditing(true);
  }, [task, descEditRef]);

  const updateDesc = async () => {
    if (editingDesc === task.description) {
      unlockTaskWrapper({
        taskId: task.task_id,
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userId'),
        proposalId: task.proposal_id,
        userName: localStorage.getItem('userName'),
        oppNo: localStorage.getItem('oppNo') || ''
      });
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
    unlockTaskWrapper({
      taskId: task.task_id,
      userEmail: localStorage.getItem('userEmail'),
      userId: localStorage.getItem('userId'),
      proposalId: task.proposal_id,
      userName: localStorage.getItem('userName'),
      oppNo: localStorage.getItem('oppNo') || ''
    });
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
    lockTaskWrapper({
      taskId: task.task_id,
      userEmail: localStorage.getItem('userEmail'),
      userId: localStorage.getItem('userId'),
      proposalId: task.proposal_id,
      userName: localStorage.getItem('userName'),
      oppNo: localStorage.getItem('oppNo') || ''
    });
    setShowDeleteAlert(true);
  }, [task]);

  const handleDeleteAlertClose = useCallback(() => {
    unlockTaskWrapper({
      taskId: task.task_id,
      userEmail: localStorage.getItem('userEmail'),
      userId: localStorage.getItem('userId'),
      proposalId: task.proposal_id,
      userName: localStorage.getItem('userName'),
      oppNo: localStorage.getItem('oppNo') || ''
    });
    setShowDeleteAlert(false);
  }, []);

  const menuItems = [
    {
      text: (
        <div
          className="task-list-menu-item-wrapper"
          data-testid={`task-see-owners-modal-${index}`}
        >
          <User2Icon fontSize="small" />
          <Typography className="menu-item-label">
            See Owners ({isComponentMounted.count})
          </Typography>
        </div>
      ),
      onClick: handleSeeOwners()
    },
    {
      text: (
        <div
          className="task-list-menu-item-wrapper"
          data-testid={`task-history-${index}`}
        >
          <CalendarIcon fontSize="small" />
          <Typography className="menu-item-label">History</Typography>
        </div>
      ),
      onClick: handleHistoryClick
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <PencilIcon fontSize="small" />
          <Typography className="menu-item-label">Edit</Typography>
        </div>
      ),
      onClick: handleEditClick,
      disabled: locked || !editable
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <TrashIcon fontSize="small" />
          <Typography className="menu-item-label">Delete</Typography>
        </div>
      ),
      onClick: handleDeleteClick,
      destructiveAction: true,
      disabled: locked || !editable
    }
  ];

  const handleCheckboxClick = task => {
    setShowLoader(true);
    setCheckboxDisabled(true);
    const taskData = {
      is_completed: !task.is_completed
    };
    dispatch(editTask(task.proposal_id, task.task_id, taskData)).then(() => {
      setShowLoader(false);
      setCheckboxDisabled(false);
    });
  };

  if ((editing || updatingDesc) && !locked && editable) {
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

  const calculateOwnersCount = () => {
    const roles = [];
    if (task && Array.isArray(task.task_role)) {
      task?.task_role.forEach(role => {
        const { questionText, data: question_answers } = processRole(
          role?.question_id,
          proposalTeamQuestions
        );
        if (questionText) {
          // Check if questionText is not empty
          if (role.type === 'roles') {
            if (question_answers?.length > 0) {
              for (
                let answer = 0;
                answer < question_answers?.length;
                answer++
              ) {
                roles.push({
                  id: role.id,
                  name: question_answers[answer]?.name,
                  email: question_answers[answer]?.email,
                  questionText,
                  question_id: role.question_id,
                  type: role.type
                });
              }
            } else {
              roles.push({
                id: role.id,
                questionText,
                question_id: role.question_id,
                type: role.type
              });
            }
          } else {
            roles.push({
              id: role.id,
              name: role.name,
              email: role.email,
              type: role.type
            });
          }
        } else if (role.type === 'user') {
          roles.push({
            id: role.id,
            name: role.name,
            email: role.email,
            type: role.type
          });
        }
      });
    }
    const count = roles.length; // Calculate count
    setIsComponentMounted({ count, mounted: true });
  };

  return (
    <>
      <Draggable
        key={`drag-group-${day}-item-${index}`}
        draggableId={`drag-group-${day}-item-${index}`}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            className={
              currentSearchResult !== null &&
              currentSearchResult.searchIndex === task.id
                ? 'search-result-highlight'
                : ''
            }
          >
            <div
              ref={provided.innerRef}
              className="task-item-drag-container"
              {...provided.draggableProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              {canReorder && (
                <span
                  {...provided.dragHandleProps}
                  className={classNames({
                    disabled: locked || !editable,
                    'drag-btn-wrapper': true
                  })}
                  data-testid={`drag-group-${day}-item-${index}`}
                  style={{ height: '24px' }}
                >
                  <IconButton disabled={locked || !editable} size="small">
                    <DragIcon className="drag-icon" />
                  </IconButton>
                </span>
              )}
              <Checkbox
                checked={task?.is_completed}
                style={{
                  marginTop: '0rem'
                }}
                onClick={() => handleCheckboxClick(task)}
                disabled={locked || !editable || checkboxDisabled}
                data-testid={`task-checkbox-${index}`}
              />
              <div
                className={classNames({
                  'task-desc': true,
                  disabled: locked || !editable
                })}
                ref={taskDescRef}
              >
                <Tooltip placement="top" title={task?.description}>
                  <p
                    ref={_ref => setDescRef(_ref)}
                    className={classNames({
                      'font-red': dayDiffFromToday < 0 && !task?.is_completed,
                      'font-bold': task?.is_completed
                    })}
                  >
                    {task?.description}
                    <OverflowEllipsis show={overflowed} />
                  </p>
                </Tooltip>
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
                  className="task-list-item-menu-btn"
                  onMouseEnter={() => {
                    calculateOwnersCount(); // Trigger calculation of owners count
                  }}
                >
                  <EllipsisVertical
                    data-testid={`ellipsis-vertical-${index}`}
                  />
                </IconMenuButton>
              </Tooltip>
            </div>
            {locked ? (
              <p className="who-is-typing">{lockedBy.userName} is typing...</p>
            ) : null}
          </div>
        )}
      </Draggable>

      {showDeleteAlert ? (
        <DeleteAlert
          task={task}
          open={showDeleteAlert}
          onClose={handleDeleteAlertClose}
        />
      ) : null}
      {isComponentMounted && (
        <TaskListToolbarMenuPortal>
          <SeeOwners
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            setIsModalOpen={setIsModalOpen}
            taskId={task.task_id}
            task={task}
            ownersCount={isComponentMounted.count}
            editable={editable}
          />
        </TaskListToolbarMenuPortal>
      )}
    </>
  );
}

export default ListItem;
