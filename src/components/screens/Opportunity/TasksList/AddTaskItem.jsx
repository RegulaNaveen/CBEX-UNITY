import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext
} from 'react';
import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import { setTask } from '../../../../redux/actions/tasksList-actions';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../../../context/SocketContext';
import Loader from 'apollo-react/components/Loader';

const AddNewTask = ({ day, proposalId, openModal }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddOwner, setShowAddOwner] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const handleAddNewTask = () => {
    setShowAddTask(true);
  };
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);

  const handleValueChange = useCallback(e => {
    const description = e.target.value;
    if (description.length > 3) {
      setShowAddOwner(true);
    } else if (description.length <= 3) {
      setShowAddOwner(false);
    }
  }, []);

  const handleInputBlur = async e => {
    const inputValue = e.target.value;
    if (inputValue !== '') {
      const taskData = {
        no_of_units: Number(day),
        description: inputValue
      };
      setShowLoader(true);
      const result = await dispatch(
        setTask(proposalId, taskData, socketContext)
      );

      if (result) {
        setTaskId(result.task_id);
        setShowAddTask(false);
        // setShowAddOwner(false);
        setShowLoader(false);
      }
    } else {
      setShowAddTask(false);
    }
  };

  const handleShowOwner = () => {
    if (showAddOwner && taskId) {
      // openModal(taskId);
    }
  };

  return (
    <>
      {showAddTask && (
        <>
          <div>
            <Grid container>
              <Grid xs={8}>
                <TextField
                  onChange={handleValueChange}
                  onBlur={handleInputBlur}
                  fullWidth
                  InputProps={{
                    inputProps: { maxLength: 200 }
                  }}
                />
              </Grid>
              <Grid xs={2} className="addOwnerButton">
                <Button
                  variant="secondary"
                  disabled={!showAddOwner}
                  onClick={() => handleShowOwner()}
                >
                  Add Owner
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
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <div>
        <Button
          icon={<PlusIcon />}
          size="small"
          style={{ marginRight: 10 }}
          onClick={handleAddNewTask}
          disabled={showAddTask}
        >
          Add new task
        </Button>
      </div>
    </>
  );
};

export default AddNewTask;
