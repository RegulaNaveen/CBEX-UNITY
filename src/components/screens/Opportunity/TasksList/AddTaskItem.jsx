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
import { useSelector } from 'react-redux';
import { selectTasksList } from '../../../../redux/selectors/tasks';
import { setTaskDataApi } from '../../../../api/tasksList';

const AddNewTask = ({ day, proposalId, openModal }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddOwner, setShowAddOwner] = useState(false);
  const [taskId, setTaskId] = useState(null);

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
      const result = setTaskDataApi(proposalId, taskData);
      await dispatch(setTask(proposalId, taskData, socketContext));
      if (result && result.task_id) {
        setTaskId(result.task_id);
        // setShowAddTask(false);
      }
    } else {
      setShowAddTask(false);
    }
  };

  const handleShowOwner = () => {
    console.log('I am here', taskId);
    if (showAddOwner && taskId) {
      openModal(taskId);
      setShowAddOwner(false);
      setShowAddTask(false);
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
                  onClick={() => handleShowOwner()} // Wrap handleShowOwner call in an arrow function
                >
                  Add Owner
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
