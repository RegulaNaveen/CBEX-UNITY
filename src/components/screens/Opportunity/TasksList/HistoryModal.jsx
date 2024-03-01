import React, { useEffect, useState } from 'react';
import { Close } from '../../../svg';
import { useDispatch } from 'react-redux';
import { getTaskHistory } from '../../../../redux/actions/tasksList-actions';
import { useSelector } from 'react-redux';
import { getUserInitials } from '../../../../utils/utils';
import { parseMomentDate } from '../../../../utils/DateUtils';
import { BID_TYPES } from '../../../../constants/app';
import Loader from 'apollo-react/components/Loader';

const HistoryModal = ({
  isHistoryModalOpen,
  closeHistoryModal,
  taskId,
  proposalId
}) => {
  const dispatch = useDispatch();
  const taskHistory = useSelector(state => state.tasks.taskHistory);
  const taskHistoryLoading = useSelector(
    state => state.tasks.taskHistoryLoading
  );
  console.log('taskHistory', taskHistory);
  const [headerTitle, setHeaderTitle] = useState('');
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
      return `Moved from day ${item?.value?.oldValue?.no_of_units} to day ${item?.value?.newValue?.no_of_units}`;
    }
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
      return <div className="no-history">No History Available</div>;
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
                    {item.updated_by} - {getTaskStatus(item)}
                  </p>
                  {item.action !== 'reorder' &&
                    item.action === 'description' && (
                      <p>
                        <span className="red">{item?.value?.oldValue} </span>
                        <span className="text">{item?.value?.newValue}</span>
                      </p>
                    )}
                  {/* {item?.action === 'task_role' && (
                    <p>
                      <span className="red">
                        {item?.value?.newValue[0]?.name} {'  '}(
                        {item?.value?.newValue[0]?.email})
                      </span>
                      <span className="text">
                        {item?.value?.oldValue[0]?.name} {'  '}(
                        {item?.value?.oldValue[0]?.email})
                      </span>
                    </p>
                  )} */}
                  {item?.action === 'task_created' && (
                    <p>
                      <span className="text">
                        {item?.value?.newValue?.description}
                      </span>
                    </p>
                  )}
                  {item.action === 'reorder' && (
                    <p>
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
        setHeaderTitle(
          lastDescription?.[lastDescription.length - 1]?.value?.oldValue
        );
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
            {taskHistoryLoading && (
              <Loader
                isInner
                size={20}
                style={{
                  width: '20px',
                  height: '20px'
                }}
              />
            )}
            <div className="modal-header">
              <div className="header-titles">
                <h1>History</h1>
                <p>{headerTitle}</p>
                {/* <p>
                  {taskHistory &&
                    taskHistory.length > 0 &&
                    taskHistory[taskHistory.length - 1]?.value.oldValue}
                </p> */}
              </div>
              <button
                type="button"
                onClick={() => {
                  closeHistoryModal();
                }}
              >
                <Close />
              </button>
            </div>
            <div className="modal-body">
              {!taskHistoryLoading && renderContent()}
              {/* <div>
                <div className="answer-container">
                  <div className="main-container">
                    <span className="avatar">MS</span>
                    <div>
                      <p>John Doe - Complete Task</p>
                      <p>
                        <span className="text">Customanswer13182 </span>
                      </p>
                    </div>
                  </div>
                  <div className="answer-meta-data">
                    <p className="answer-history-para">14-Dec-2023</p>
                    <p className="answer-history-para">Early Engagement 1</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="answer-container">
                  <div className="main-container">
                    <span className="avatar">MS</span>
                    <div>
                      <p>John Doe - Complete Task</p>
                      <p>
                        <span className="red">Customanswer13182 </span>
                        <span className="text">Customanswer13182 </span>
                      </p>
                    </div>
                  </div>
                  <div className="answer-meta-data">
                    <p className="answer-history-para">14-Dec-2023</p>
                    <p className="answer-history-para">Early Engagement 1</p>
                  </div>
                </div>
              </div> */}
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
