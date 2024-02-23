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
import { updateTaskById } from '../../../../redux/actions/tasksList-actions';
import { useDispatch } from 'react-redux';
import { selectTasksList } from '../../../../redux/selectors/tasks';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const SeeOwners = ({
  isModalOpen,
  closeModal,
  setIsModalOpen,
  taskId,
  updateOwnersCount,
  showInputImmediately,
  setShowInputImmediately,
  setAreButtonsDisabled,
  areButtonsDisabled,
  autocompleteValue,
  setAutocompleteValue
}) => {
  const [taskDescriptions, setTaskDescriptions] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [getNoOptionsText, setNoOptionsText] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [handlePayload, setHandlePayload] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [userToRemoveIndex, setUserToRemoveIndex] = useState(null);

  const proposalTeamQuestions = useSelector(selectActiveTeamQuestions);
  const tasks = useSelector(selectTasksList);
  const dispatch = useDispatch();
  const previousController = useRef(null);
  const autocompleteField = useRef(null);
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const task = tasks.find(task => task?.task_id === taskId);
    const roles = [];
    if (task && Array.isArray(task.task_role)) {
      task?.task_role.forEach(role => {
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
    } else if (task) {
      setSelectedTask(task);
    }
  }, [taskId, isModalOpen, tasks, proposalTeamQuestions]);

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
    if (autocompleteValue) {
      setAutocompleteValue(newValue);
    }

    setAreButtonsDisabled(false);
    setValue(null);
    setShowInput(false);
    setShowInputImmediately(false);
    setButtonDisabled(false); // Enable the button after a user is added
  };

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
          updated_by: userName,
          updated_by_email: email
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
      setSelectedUsers([]);
      updateOwnersCount(task_id, selectedUsers.length);
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      // Reset state variables when the modal is closed
      setTaskDescriptions('');
      setSelectedTask(null);
      setAreButtonsDisabled(true);
    }
  }, [isModalOpen, taskId]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setShowInputImmediately(false);
    setButtonDisabled(false);
    setAreButtonsDisabled(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setShowInputImmediately(false);
    setButtonDisabled(false);
    setAreButtonsDisabled(true);
    setSelectedTask(null);
    setSelectedUsers([]);
    closeModal();
  };

  const handleCloseInnerModal = () => {
    setShowWarningModal(false);
  };

  useEffect(() => {
    const task = tasks.find(task => task?.task_id === taskId);
    if (task) {
      setTaskDescriptions(task.description);
      updateOwnersCount(task?.task_id, selectedUsers.length);
    }
  }, [
    taskId,
    tasks,
    isModalOpen,
    taskDescriptions,
    selectedTask,
    selectedUsers
  ]);

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
    setAreButtonsDisabled(false);
    const users = [...selectedUsers];

    const user = users[index];

    if (user.type === 'roles') {
      setUserToRemoveIndex(index);
      setShowWarningModal(true);
    } else {
      const removedUser = users.splice(index, 1);
      if (removedUser[0] && !removedUser[0].id) {
        // Find the user in the handlePayload array and add the delete event
        const payloadUser = handlePayload.find(
          user =>
            user.name === removedUser[0].name &&
            user.email === removedUser[0].email &&
            user.type === removedUser[0].type
        );
        if (payloadUser) {
          payloadUser.event = 'delete';
        }

        // Now find the index of the user in the handlePayload array
        const removedUserIndex = handlePayload.findIndex(
          user => user === payloadUser
        );

        const payloadUsers = [...handlePayload];
        const updatedPayload = payloadUsers.splice(removedUserIndex, 1);

        setHandlePayload(updatedPayload);
      } else {
        const updatedPayload = [...handlePayload]; // creates a new array updatedPayload copy of handlePayload
        updatedPayload.push({
          // adds a new object to updatedPayload array object contain id, type, event properties
          id: removedUser[0].id,
          type: removedUser[0].type,
          event: 'delete'
        });
        setHandlePayload(updatedPayload);
      }

      setSelectedUsers(users);
    }
  };

  const handleConfirmRemoveUser = () => {
    setShowWarningModal(false);
    setAreButtonsDisabled(false);
    // if (userToRemoveIndex != null) {
    const users = [...selectedUsers];
    const user = users[userToRemoveIndex];
    const removedUser = users.splice(userToRemoveIndex, 1);
    if (removedUser[0] && removedUser[0].id) {
      const updatedPayload = [...handlePayload];
      updatedPayload.push({
        id: removedUser[0].id,
        type: removedUser[0].type,
        event: 'delete'
      });

      if (removedUser[0].question_id) {
        const matchingUsers = users.filter(
          user => user.question_id === removedUser[0].question_id
        );
        if (matchingUsers.length > 0) {
          matchingUsers.forEach(user => {
            updatedPayload.push({
              name: user.name,
              email: user.email,
              type: 'user',
              event: 'add'
            });
          });
        }
      }
      setHandlePayload(updatedPayload);
    }

    setSelectedUsers(users);
    setUserToRemoveIndex(null);
    // }
  };

  const handleCancelRemoveUser = () => {
    setShowWarningModal(false);
    setUserToRemoveIndex(null);
  };

  useEffect(() => {
    if (showInput || showInputImmediately) {
      if (autocompleteField.current) {
        autocompleteField.current.querySelector('input').focus();
      }
    }
  });

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
                    setShowInputImmediately(false);
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
                {(showInput || showInputImmediately) && (
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
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} disabled={areButtonsDisabled}>
                  Save
                </Button>
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
                onClick: handleCancelRemoveUser
              },
              {
                label: 'Continue',
                onClick: handleConfirmRemoveUser
              }
            ]}
            disableBackdropClick
          />
        </div>
      )}
    </>
  );
};

export default SeeOwners;
