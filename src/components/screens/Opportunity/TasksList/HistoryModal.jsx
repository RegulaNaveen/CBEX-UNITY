import React, { useEffect, useState } from 'react';
import { Close } from '../../../svg';
import { useDispatch } from 'react-redux';
import { getTaskHistory } from '../../../../redux/actions/tasksList-actions';
import { useSelector } from 'react-redux';
import { getUserInitials } from '../../../../utils/utils';
import { parseMomentDate } from '../../../../utils/DateUtils';
import { BID_TYPES } from '../../../../constants/app';
import Loader from 'apollo-react/components/Loader';
import { selectTasksList } from '../../../../redux/selectors/tasks';
import moment from 'moment';

const HistoryModal = ({
  isHistoryModalOpen,
  closeHistoryModal,
  taskId,
  proposalId
}) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [taskCreatedDate, setTaskCreatedDate] = useState('');
  const taskHistory = useSelector(state => state.tasks.taskHistory);
  const taskHistoryLoading = useSelector(
    state => state.tasks.taskHistoryLoading
  );
  const tasks = useSelector(selectTasksList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) dispatch(getTaskHistory(proposalId, taskId));
    return () => {
      dispatch({ type: 'SET_TASK_HISTORY', payload: [] });
      document.body.classList.remove('no-scroll');
    };
  }, [proposalId, taskId]);

  const getTaskStatus = item => {
    switch (item?.action) {
      case 'task_created':
        return 'Task Created';
      case 'description':
        return item?.value?.newValue ? 'Edit Task' : '';
      case 'is_completed':
        return item?.value?.newValue ? 'Completed' : 'Marked as Uncompleted';
      case 'reorder':
        return 'Task Order Changed';
      case 'task_role':
        return 'Change to Owner';
      default:
        return '';
    }
  };

  const getReorderStatus = item => {
    if (
      item?.value?.newValue?.no_of_units === item?.value?.oldValue?.no_of_units
    ) {
      return '';
    } else {
      return `Moved from 'Day ${item?.value?.oldValue?.no_of_units}' to 'Day ${item?.value?.newValue?.no_of_units}'`;
    }
  };

  const renderTaskRoles = item => {
    const taskRoles = taskHistory?.filter(item => item?.action === 'task_role');
    let oldRoles = [];
    let newRoles = [];

    if (item?.value?.oldValue) {
      item?.value?.oldValue?.map((role, index) => {
        oldRoles.push({ email: role.email, name: role.name });
      });
    }

    if (item?.value?.newValue) {
      item?.value?.newValue?.map((role, index) => {
        newRoles.push({ email: role.email, name: role.name });
      });
    }

    return (
      <div className="task-roles">
        {oldRoles?.map((role, index) => {
          if (!newRoles?.some(newRole => newRole?.email === role?.email)) {
            return (
              <p key={index}>
                <span className="red">
                  {role?.name} ({role?.email}){'  '}
                </span>
              </p>
            );
          }
        })}
        {newRoles?.map((role, index) => {
          if (
            oldRoles &&
            oldRoles?.length > 0 &&
            !oldRoles?.some(oldRole => oldRole?.email === role?.email) &&
            taskRoles?.[0]?.id === item?.id
          ) {
            return (
              <p key={index}>
                <span className="text blue">
                  {role?.name} ({role?.email})
                </span>
              </p>
            );
          } else {
            return (
              <p key={index}>
                <span className="text">
                  {role?.name} ({role?.email})
                </span>
              </p>
            );
          }
        })}
      </div>
    );
  };

  const renderTaskDescription = item => {
    const taskDescriptions = taskHistory?.filter(
      item => item?.action === 'description'
    );
    return (
      <p>
        <span className="red">{item?.value?.oldValue} </span>
        {item?.id === taskDescriptions?.[0]?.id ? (
          <span className="text blue">{item?.value?.newValue}</span>
        ) : (
          <span className="text">{item?.value?.newValue}</span>
        )}
      </p>
    );
  };

  if (isHistoryModalOpen) {
    document.body.classList.add('no-scroll');
  }

  let bidType = '';
  let bidNo = '';

  const renderContent = () => {
    const winLocationSearch = window.location.search;
    bidNo = new URLSearchParams(winLocationSearch).get('bidNo');
    bidType =
      new URLSearchParams(winLocationSearch).get('bidType') || 'Clinical_Bid';
    if (BID_TYPES[bidType]) {
      bidType = BID_TYPES[bidType];
    }

    if (taskHistory.length === 0) {
      return (
        <div>
          <div className="answer-container">
            <div className="main-container">
              <span className="avatar">SC</span>
              <div>
                <p>System Created</p>
              </div>
            </div>
            <div className="answer-meta-data">
              <p className="answer-history-para">
                {moment(taskCreatedDate).format('D-MMM-yyyy')}
              </p>
              <p className="answer-history-para"></p>
            </div>
          </div>
        </div>
      );
    }

    if (taskHistory.length > 0) {
      return taskHistory.map((item, index) => {
        return (
          <div key={index}>
            <div className="answer-container">
              <div className="main-container">
                <span className="avatar">
                  {getUserInitials(item?.updated_by)}
                </span>
                <div>
                  <p>
                    {item?.updated_by} - {getTaskStatus(item)}
                  </p>
                  {item?.action !== 'reorder' &&
                    item?.action === 'description' &&
                    renderTaskDescription(item)}
                  {item?.action === 'task_role' && (
                    <div className="task-roles">{renderTaskRoles(item)}</div>
                  )}
                  {item?.action === 'task_created' && (
                    <p>
                      <span className="text">
                        {item?.value?.newValue?.description}
                      </span>
                    </p>
                  )}
                  {item?.action === 'reorder' && (
                    <p
                      className={getReorderStatus(item) === '' ? 'd-none' : ''}
                    >
                      <span className="text">{getReorderStatus(item)}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="answer-meta-data">
                <p className="answer-history-para">
                  {parseMomentDate(item?.updated_date)}
                </p>
                <p className="answer-history-para">
                  {bidType}
                  {'  '}
                  {bidNo}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    if (tasks) {
      const task = tasks?.find(task => task.task_id === taskId);
      if (task) {
        setHeaderTitle(task?.description);
        setTaskCreatedDate(task?.created_date);
      }
    }
    if (taskHistory?.length > 0) {
      const lastDescription = [];
      taskHistory?.forEach(item => {
        if (item.action === 'task_created') {
          setHeaderTitle(item?.value?.newValue?.description);
        } else {
          if (item?.action === 'description') {
            lastDescription?.push(item);
          }
        }
      });
      if (lastDescription?.length > 0) {
        setHeaderTitle(lastDescription?.[0]?.value?.newValue);
      }
    }
    return () => {
      setHeaderTitle('');
    };
  }, [taskHistory]);

  return (
    <>
      {isHistoryModalOpen && (
        <div className="history-modal" id="task-history-modal">
          <div className="modal-content">
            <div className="bluegrid"></div>
            {taskHistoryLoading && <Loader isInner />}
            <div className="modal-header">
              <div className="header-titles">
                <h1>History</h1>
                <p>{headerTitle}</p>
              </div>
              <button
                type="button"
                data-testid="close-history-modal"
                onClick={() => {
                  closeHistoryModal();
                }}
              >
                <Close />
              </button>
            </div>
            <div className="modal-body">
              {!taskHistoryLoading && renderContent()}
            </div>
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => {
                  closeHistoryModal();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryModal;
