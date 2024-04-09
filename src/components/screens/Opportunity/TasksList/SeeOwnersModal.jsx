import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from 'apollo-react/components/Modal';
import Button from 'apollo-react/components/Button';
import Plus from 'apollo-react-icons/Plus';
import TrashIcon from 'apollo-react-icons/Trash';
import UserIcon from 'apollo-react-icons/User';
// import TextField from 'apollo-react/components/TextField';
import Autocomplete from 'apollo-react/components/Autocomplete';
import { API } from '../../../../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../SessionHandler';
import { useSelector } from 'react-redux';
import { selectActiveTeamQuestions } from '../../../../redux/selectors/proposal';
import { updateTaskById } from '../../../../redux/actions/tasksList-actions';
import { useDispatch } from 'react-redux';
import { selectTasksList } from '../../../../redux/selectors/tasks';
import Loader from 'apollo-react/components/Loader';
import { processRole } from './utils';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const SeeOwners = ({
  isModalOpen,
  closeModal,
  setIsModalOpen,
  ownersCount,
  setIsNewTask,
  isNewTask,
  task,
  setAddOwnerBtn,
  addOwnerBtn,
  editable
}) => {
  const description = isNewTask?.isNew
    ? isNewTask?.result?.description
    : task?.description;

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
  const [isLoading, setIsLoading] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  const proposalTeamQuestions = useSelector(selectActiveTeamQuestions);
  const tasks = useSelector(selectTasksList);
  const dispatch = useDispatch();
  const previousController = useRef(null);
  const autocompleteField = useRef(null);
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const len = selectedUsers.filter(value => !value?.new)?.length;
  useEffect(() => {
    const roles = [];
    if (task && Array.isArray(task.task_role)) {
      task?.task_role.forEach(role => {
        const { questionText, data: question_answers } = processRole(
          role?.question_id,
          proposalTeamQuestions
        );
        if (role.type === 'roles' && questionText) {
          if (question_answers?.length > 0) {
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
              questionText,
              question_id: role.question_id,
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

      setSelectedUsers(roles);
      setSelectedTask(task);
    } else if (isNewTask && isNewTask?.isNew) {
      setSelectedTask(isNewTask?.result);
    } else {
      setSelectedTask(task);
    }
  }, [proposalTeamQuestions, task, isModalOpen, isNewTask]);

  const handleChange = (event, newValue) => {
    const splitName = newValue.label.split('(');
    const name = splitName[0].trim();
    const email = splitName[1].substring(0, splitName[1].length - 1).trim();
    const usersList = [
      ...selectedUsers,
      { name, email, type: 'user', new: true }
    ];
    setSelectedUsers(usersList);
    setHandlePayload([
      ...handlePayload,
      { name, email, type: 'user', event: 'add' }
    ]);
    setButtonDisabled(false);
    setValue('');
    setInputValue('');
    setShowInput(false);
    setUserSelected(true);
    setAddOwnerBtn(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    setSaveBtnDisabled(true);
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
      setSaveBtnDisabled(false);
      setIsLoading(false);
      setSelectedTask(null);
      setHandlePayload([]);
      setSelectedUsers([]);
      if (isNewTask && isNewTask?.isNew) {
        setIsNewTask({ result: {}, isNew: false });
      }
      setUserSelected(true);
      setIsModalOpen(false);
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedTask(null);
    }
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setButtonDisabled(false);
    if (isNewTask && isNewTask?.isNew) {
      setIsNewTask({ result: isNewTask?.result, isNew: false });
      setInputValue('');
    }
    setInputValue('');
    setSelectedUsers([]); // clear selectedUsers state
    setHandlePayload([]);
    setUserSelected(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setButtonDisabled(false);
    if (isNewTask && isNewTask?.isNew) {
      setIsNewTask({ result: {}, isNew: false });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowInput(false);
    setButtonDisabled(false);
    setSelectedTask(null);
    setSelectedUsers([]);
    closeModal();
    if (isNewTask && isNewTask?.isNew) {
      setIsNewTask({ result: {}, isNew: false });
    }
    setUserSelected(false);
  };

  const handleCloseInnerModal = () => {
    setShowWarningModal(false);
  };

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
  };

  const handleCancelRemoveUser = () => {
    setShowWarningModal(false);
    setUserToRemoveIndex(null);
  };

  useEffect(() => {
    if (showInput || (isNewTask && isNewTask?.isNew)) {
      if (autocompleteField.current) {
        autocompleteField.current.querySelector('input').focus();
      }
    }
  });
  const checkDisable = () => {
    if (isNewTask && isNewTask?.isNew) {
      return selectedUsers.some(value => value?.new) ? false : true;
    } else if (
      !isNewTask &&
      !isNewTask?.isNew &&
      (selectedUsers.some(value => value?.new) || len != ownersCount)
    ) {
      return false;
    } else if (isNewTask && isNewTask?.result) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if ((isNewTask && isNewTask?.isNew) || ownersCount === 0) {
      setShowInput(true);
    } else {
      setShowInput(false);
      setUserSelected(true);
    }
  }, [isNewTask, ownersCount, isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div id="modal-overlay">
          <div className="modal">
            <button
              className="close-button"
              onClick={handleClose}
              data-testid="close-button"
            >
              X
            </button>
            <div className="modal-content">
              <h2>Task Owners</h2>
              <div className="description" title={description}>
                {description}
              </div>
              <div className="modal-content-common modal-content-2a">
                <p>Users assigned this task</p>
                <Button
                  disabled={
                    isButtonDisabled ||
                    task?.is_completed ||
                    addOwnerBtn ||
                    !editable ||
                    !userSelected
                  }
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
                        <div key={index} className="user-item">
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
                            {!task?.is_completed && editable && (
                              <TrashIcon
                                fontSize="small"
                                data-testid="trash-icon"
                              />
                            )}
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
                        data-testid="autocomplete-owner"
                        ref={autocompleteField}
                        placeholder="Add user"
                        open={inputValue && inputValue?.length}
                        options={options || []}
                        fullWidth
                        value={value}
                        onInputChange={handleInputChange}
                        onChange={handleChange}
                        forcePopupIcon={false}
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
                {task?.is_completed || !editable ? (
                  <Button onClick={handleOk}>OK</Button>
                ) : (
                  <Button onClick={handleCancel}>Cancel</Button>
                )}
                <Button
                  onClick={handleSave}
                  disabled={checkDisable() || saveBtnDisabled}
                >
                  Save
                  {isLoading && (
                    <>
                      <div className="loader-container">
                        <div
                          style={{
                            display: 'flex',
                            height: '24px',
                            marginRight: '30px'
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
                                height: '20px',
                                color: '#FFF'
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </>
                  )}
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
