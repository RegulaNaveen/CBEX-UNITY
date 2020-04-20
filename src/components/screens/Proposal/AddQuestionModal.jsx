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
  onClose: Function,
  onSave: Function,
  items: Array<Object>,
  teams: Array<Object>
};

type State = {
  isChecked: boolean,
  questionText: string
};

class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isChecked: false,
      questionText: ''
    };
  }

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  handleDeleteTeam = () => {
    // TODO: Delete a team item
  };

  handleQuestionText = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ questionText: event.target.value });
  };

  render() {
    const { isChecked, questionText } = this.state;
    const { onClose, onSave, items, teams } = this.props;

    return (
      <Modal>
        <div className="modal-content">
          <div className="modal-wrapper-title">
            <div className="modal-segment-title">
              <p className="modal-title">Add New Question</p>
              <div
                className="close-modal-icon"
                role="presentation"
                onClick={onClose}
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
              {teams &&
                teams.map(team => {
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
                onChange={this.handleIsChecked}
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
                onClick={onClose}
              >
                Cancel
              </PrimaryButton>
            </div>
            <div className="modal-button-okay">
              <PrimaryButton
                className="okay-button"
                id="okay-button"
                onClick={onSave}
              >
                Okay
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddQuestionModal;
