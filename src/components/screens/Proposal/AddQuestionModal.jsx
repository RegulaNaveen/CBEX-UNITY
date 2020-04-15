// @flow
import React, { PureComponent } from 'react';
import Modal from '../../common/Modal';
import { PrimaryButton } from '../../common/Buttons';
import Checkbox from '../../common/Checkbox';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
import SelectTeam from '../../common/SelectTeam';
import Close from '../../svg/Close';

type Props = {
  showModal: boolean
};

type State = {
  isChecked: boolean,
  isCollapsed: boolean,
  items: Array<Object>,
  questionText: string,
  teams: Array<Object>
};

class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isChecked: false,
      isCollapsed: false,
      questionText: '',
      items: [
        {
          id: 0,
          title: 'Item',
          selected: false,
          key: 'Item'
        },
        {
          id: 1,
          title: 'Item',
          selected: false,
          key: 'Item'
        },
        {
          id: 2,
          title: 'Item',
          selected: false,
          key: 'Item'
        },
        {
          id: 3,
          title: 'Item',
          selected: false,
          key: 'Item'
        }
      ],
      teams: [
        {
          id: 0,
          name: 'Business Analyst Business'
        },
        {
          id: 1,
          name: 'Account Executive'
        },
        {
          id: 2,
          name: 'Business Analyst'
        },
        {
          id: 3,
          name: 'Account Executive'
        }
      ]
    };
  }

  handleisChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  onClose = () => {
    // TODO: Create an action to handle close/open modal
  };

  onSave = () => {
    // TODO: Save new question functionality
  };

  handleDeleteTeam = () => {
    // TODO: Delete a team item
  };

  handleQuestionText = (text: SyntheticInputEvent<EventTarget>) => {
    this.setState({ questionText: text.target.value });
  };

  toggleList = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  render() {
    const { showModal } = this.props;
    const { isChecked, items, questionText, teams } = this.state;
    const handleShowModal = showModal
      ? 'modal display-bloc'
      : 'modal display-none';
    return (
      <div className={handleShowModal}>
        <Modal>
          <div className="modal-content">
            <div className="modal-wrapper-title">
              <div className="modal-segment-title">
                <p className="modal-title">Add New Question</p>
                <div
                  className="close-modal-icon"
                  role="presentation"
                  onClick={this.onClose}
                >
                  <Close className="close-icon" />
                </div>
              </div>
              <div className="modal-subtitle">Optional Subtitle</div>
            </div>
            <div className="modal-wrapper-body">
              <div className="modal-segment">
                <TextArea
                  id="question-text-area"
                  className="modal-text-area"
                  value={questionText}
                  onChange={this.handleQuestionText}
                  placeholder="Hint text..."
                  title="Enter Question Text"
                />
              </div>
              <div className="modal-segment">
                <div className="modal-answer-type">
                  <Dropdown
                    id="dd-andwer-type"
                    placeholder="Select"
                    items={items}
                    title="Answer Type"
                  />
                </div>
                <div className="modal-picker">
                  <p className="dd-title">Label</p>
                  <div>picker</div>
                </div>
              </div>
              <div className="modal-segment">
                <Dropdown
                  id="dd-team-member"
                  placeholder="Select"
                  items={items}
                  title="Which team member roles will answer"
                />
              </div>
              <div className="modal-segment">
                {teams.map(team => {
                  const { id, name } = team;
                  return (
                    <SelectTeam
                      key={id}
                      id="selected-team-item"
                      onClick={this.handleDeleteTeam}
                    >
                      {name}
                    </SelectTeam>
                  );
                })}
              </div>
              <div className="modal-segment">
                <Checkbox
                  id="send-notification-checkbox"
                  value="notification"
                  name="notification"
                  onChange={this.handleisChecked}
                  isChecked={isChecked}
                >
                  Send notification now
                </Checkbox>
              </div>
            </div>
            <div className="modal-wrapper-footer">
              <div className="modal-button-cancel">
                <PrimaryButton
                  className="close-button"
                  id="cancel-button"
                  onClick={this.onClose}
                >
                  Cancel
                </PrimaryButton>
              </div>
              <div className="modal-button-okay">
                <PrimaryButton
                  className="okay-button"
                  id="okay-button"
                  onClick={this.onSave}
                >
                  Okay
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddQuestionModal;
