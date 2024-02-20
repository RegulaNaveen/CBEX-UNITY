import React, { useState, useCallback, useMemo } from 'react';
import CustomModal from '../../../common/CustomModal';
import { DEFAULT, TASKS } from '../../../../constants/app';
import Loader from 'apollo-react/components/Loader';
import { deleteTask as deleteTaskAction } from '../../../../redux/actions/tasksList-actions';
import { deleteTaskApi } from '../../../../api/tasksList';
import { useDispatch } from 'react-redux';

export default function DeleteAlert({ task, open, onClose }) {
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();

  const deleteTask = async () => {
    setDeleting(true);
    try {
      const deleteTaskResponse = await deleteTaskApi(
        task.proposal_id,
        task.task_id
      );
      if (deleteTaskResponse.status === 200) {
        await dispatch(deleteTaskAction(task.task_id));
      }
    } catch (e) {
      console.error('Error in deleting task', e);
    }
    setDeleting(false);
    onClose();
  };

  const handleDeleteClick = useCallback(async () => {
    if (!deleting) {
      deleteTask();
    }
  }, [deleting]);

  const alertBtnProps = useMemo(() => {
    return [
      { label: DEFAULT.CANCEL, onClick: () => onClose(), disabled: deleting },
      {
        label: deleting ? TASKS.DELETING : TASKS.DELETE_BTN_TEXT,
        onClick: () => handleDeleteClick(),
        className: 'btn-danger',
        icon: deleting ? (
          <span
            style={{
              marginLeft: '0px',
              marginTop: '0px',
              position: 'relative',
              top: '15px',
              left: '-15px',
              paddingRight: '16px'
            }}
          >
            <Loader
              isInner
              size={20}
              style={{
                width: '20px',
                height: '20px',
                color: '#FFF'
              }}
            />
          </span>
        ) : null
      }
    ];
  }, [deleting]);

  return (
    <CustomModal
      open={open}
      title={DEFAULT.ALERT}
      message={TASKS.DELETE_ALERT_MSG}
      disableBackdropClick
      variant="error"
      onClose={() => onClose()}
      buttonProps={alertBtnProps}
      className="task-delete-alert-modal"
    />
  );
}
