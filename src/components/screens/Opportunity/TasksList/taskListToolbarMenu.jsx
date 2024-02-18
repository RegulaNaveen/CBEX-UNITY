import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from 'apollo-react/components/Modal';
import Button from 'apollo-react/components/Button';
import Plus from 'apollo-react-icons/Plus';
import TrashIcon from 'apollo-react-icons/Trash';
import UserIcon from 'apollo-react-icons/User';
// import TextField from 'apollo-react/components/TextField';
import Autocomplete from 'apollo-react/components/Autocomplete';
import { API } from '../../../../constants';
import { debounce } from 'lodash';
import { getData } from '../../../../api/proposal';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../SessionHandler';
import { getQuestion } from '../../../../redux/selectors';
import { useSelector } from 'react-redux';
import { selectSections } from '../../../../redux/selectors';
import { selectActiveTeamQuestions } from '../../../../redux/selectors/proposal';
import { updateTaskListApi } from '../../../../api/tasksList';
import {
  addUser,
  deleteUser,
  updateTaskById
} from '../../../../redux/actions/tasksList-actions';
import { useDispatch } from 'react-redux';
import { selectTasksList } from '../../../../redux/selectors/tasks';
import { fetchTasksList } from '../../../../redux/actions/tasksList-actions';
import { TASKS } from '../../../../constants/types';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const TaskListToolbarMenu = ({
  isModalOpen,
  closeModal,
  setIsModalOpen,
  taskId
}) => {
  const [taskDescriptions, setTaskDescriptions] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const previousController = useRef(null);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [getNoOptionsText, setNoOptionsText] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [handlePayload, setHandlePayload] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const proposalTeamQuestions = useSelector(selectActiveTeamQuestions);
  const tasks = useSelector(selectTasksList);
  const dispatch = useDispatch();
  const autocompleteField = useRef(null);

  useEffect(() => {
    const task = tasks.find(task => task?.task_id === taskId);
    if (task) {
      const roles = [];
      task?.task_role?.forEach(role => {
        if (role.type === 'roles') {
          const { questionText, data: question_answers } = processRole(
            role.question_id
          );
          for (let answer = 0; answer < question_answers?.length; answer++) {
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
            name: role.name,
            email: role.email,
            type: role.type
          });
        }
      });
      setSelectedUsers(roles);
      setSelectedTask(task);
    }
  }, [taskId, isModalOpen]);

  const processRole = value => {
    const data = [];
    const question = proposalTeamQuestions.find(
      question => question.questionId === value
    );
    let questionText = '';
    if (question) {
      const answer = question.answers;
      if (answer && answer.length) {
        const lastAnswer = answer[answer.length - 1];
        const answerData = lastAnswer.answer;
        questionText = question.questionText;

        if (answerData && answerData.length) {
          try {
            const splitAnswer = answerData?.split(',');
            if (Array.isArray(splitAnswer)) {
              for (let i = 0; i < splitAnswer.length; i++) {
                const splitName = splitAnswer[i]?.split('(');
                if (splitName) {
                  const name = splitName[0].trim();
                  const email = splitName[1]
                    .substring(0, splitName[1].length - 1)
                    .trim();
                  data.push({ name, email });
                }
              }
            }
          } catch (error) {
            console.log('error', error);
          }
        }
      }
    }
    return { data, questionText };
  };

  const handleChange = (event, newValue) => {
    const splitName = newValue.label.split('(');
    const name = splitName[0].trim();
    const email = splitName[1].substring(0, splitName[1].length - 1).trim();
    setSelectedUsers([...selectedUsers, { name, email, type: 'user' }]);
    setHandlePayload([
      ...handlePayload,
      { name, email, type: 'user', event: 'add' }
    ]);
    setUserData(newValue);
    setValue(null);
    setShowInput(false);
    setButtonDisabled(false); // Enable the button after a user is added
  };

  if (isModalOpen) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }

  const handleSave = () => {
    const payload = {
      addrole: [],
      deleterole: []
    };
    const { id, proposal_id, task_id } = selectedTask;
    handlePayload.forEach(user => {
      if (user.event === 'add') {
        payload.addrole.push({
          task_list_id: id,
          proposal_id: proposal_id,
          task_id: task_id,
          name: user.name,
          email: user.email,
          type: user.type,
          updated_by: 'varsha kumari',
          updated_by_email: 'varsha.kumari2@iqvia.com'
        });
      } else {
        payload.deleterole.push({
          id: user.id,
          type: user.type
        });
      }
    });
    dispatch(updateTaskById(proposal_id, id, payload)).then(() => {
      setIsModalOpen(false);
      setSelectedTask(null);
      setHandlePayload([]);
      selectedUsers([]);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setButtonDisabled(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setButtonDisabled(false);
  };

  const handleCloseInnerModal = () => {
    setShowWarningModal(false);
  };

  useEffect(() => {
    const task = tasks.find(task => task?.task_id === taskId);
    if (task) {
      setTaskDescriptions(task.description);
    }
  }, [taskId, tasks]);

  const getData = async searchTerm => {
    if (previousController.current) {
      previousController.current.abort();
    }
    var controller = new AbortController();
    var signal = controller.signal;
    previousController.current = controller;
    let updatedOptions = [];
    try {
      await fetch(`${USER_API_URL}/${searchTerm}`, {
        signal,
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': getAccessToken()
        }
      })
        .then(response => response.json())
        .then(myJson => {
          updatedOptions = myJson.data.map(p => {
            return {
              label: `${p.first_name} ${p.last_name}(${p.email.toLowerCase()})`,
              mail: `${p.email.toLowerCase()}`
            };
          });
          setOptions(updatedOptions);
          updatedOptions.length > 0 ? setNoOptionsText(1) : setNoOptionsText(0);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
    if (value) {
      getData(value);
    }
  };

  const handleRemoveUser = index => {
    console.log('index', index);
    setShowWarningModal(true);
    console.log('task', selectedTask);
    const users = [...selectedUsers]; // creates a new array users copy of selectedUsers
    const removedUser = users.splice(index, 1); // removes user at given index from the users array& assign to removed user
    if (removedUser[0].id) {
      // check if removed user has id property
      const updatedPayload = [...handlePayload]; // creates a new array updatedPayload copy of handlePayload
      updatedPayload.push({
        // adds a new object to updatedPayload array object contain id, type, event properties
        id: removedUser[0].id,
        type: removedUser[0].type,
        event: 'delete'
      });
      setHandlePayload(updatedPayload); // updates handlePayload with updatedPayload
    } else {
      console.log('removedUser', removedUser);
      const removedUserIndex = handlePayload.findIndex(
        // finds the index of removed user in handlePayload array based on name, email, type, event
        user =>
          user.name === removedUser[0].name &&
          user.email === removedUser[0].email &&
          user.type === removedUser[0].type
        // user.event === removedUser[0].event
      );
      console.log('removedUserIndex', removedUserIndex);
      const payloadUsers = [...handlePayload]; //// creates a new array payloadUsers copy of handlePayload
      const updatedPayload = payloadUsers.splice(removedUserIndex, 1); // removes user at the found index from the payloadUsers array& assign to updatedPayload
      setHandlePayload(updatedPayload); // updates handlePayload with updatedPayload

      const matchingUsers = selectedUsers.filter(
        user => user.question_id === removedUser[0].question_id
      );
      if (matchingUsers.length > 0) {
        const matchingUserIndex = selectedUsers.findIndex(
          user => user.question_id === removedUser[0].question_id
        );
        const updatedUsers = selectedUsers.splice(matchingUserIndex, 1);
        setSelectedUsers(updatedUsers);
      }
    }
    setSelectedUsers(users); // This line updates the selectedUsers state with the users array (which had the user removed earlier).
  };
  useEffect(() => {
    console.log('Updated selectedUsers:', selectedUsers);
  }, [selectedUsers]);
  useEffect(() => {
    console.log('Updated handlePayload:', handlePayload);
  }, [handlePayload]);
  return (
    <>
      {isModalOpen && (
        <div id="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <div className="modal-content">
              <h2>Task Owners</h2>
              <div className="description" title={taskDescriptions}>
                {taskDescriptions}
              </div>
              <div className="modal-content-common modal-content-2a">
                <p>Users assigned this task</p>
                <Button
                  disabled={isButtonDisabled}
                  onClick={() => {
                    setShowInput(true);
                    setButtonDisabled(true);
                    setTimeout(() => {
                      autocompleteField.current.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }, 0);
                  }}
                >
                  <Plus fontSize="small" />
                  Add Owner
                </Button>
              </div>
              <div className="modal-content-2b">
                <div className="user-list">
                  {selectedUsers?.map(
                    (item, index) =>
                      item && (
                        <div key={item.id} className="user-item">
                          <div className="user-details">
                            <UserIcon className="user-icon" />
                            <div className="user-info">
                              <span>{item.name}</span>
                              <span>{item.questionText}</span>
                            </div>
                          </div>
                          <div
                            className="remove-user"
                            onClick={() => handleRemoveUser(index)}
                          >
                            <TrashIcon fontSize="small" />
                          </div>
                        </div>
                      )
                  )}
                </div>
                {showInput && (
                  <div className="add-user-input">
                    <hr className="input-divider" />
                    <div className="autocomplete-container">
                      <Autocomplete
                        ref={autocompleteField}
                        placeholder="Add user"
                        open={inputValue && inputValue?.length}
                        options={options || []}
                        fullWidth
                        value={value}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                        popupIcon
                        noOptionsText={
                          getNoOptionsText === 0
                            ? 'No Matches Found'
                            : 'Loading...'
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-buttons">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showWarningModal && (
        <div className="warning-modal">
          <Modal
            open={showWarningModal}
            onClose={handleCloseInnerModal}
            message="This Task will no longer reflect the settings in the Teams section"
            buttonProps={[
              {
                label: 'Cancel',
                onClick: handleCloseInnerModal
              },
              { label: 'Continue' }
            ]}
            disableBackdropClick
            // width={400}
          />
        </div>
      )}
    </>
  );
};

export default TaskListToolbarMenu;
