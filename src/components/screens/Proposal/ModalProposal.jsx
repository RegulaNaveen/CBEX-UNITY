// @flow
import React, { PureComponent } from 'react';
import Modal from '../../common/Modal';
import { PrimaryButton } from '../../common/Button';
import Checkbox from '../../common/Checkbox';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
import SelectTeam from '../../common/SelectTeam';
import Close from '../../svg/Close';

type Props = {
  showModal: boolean
};

type State = {
  hideModal: boolean,
  isChecked: boolean,
  isCollapsed: boolean,
  location: Array<Object>,
  inputText: string
};

class ModalProposal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      // hideModal: false,
      isChecked: false,
      isCollapsed: false,
      inputText: '',
      location: [
        {
          id: 0,
          title: 'New York',
          selected: false,
          key: 'location'
        },
        {
          id: 1,
          title: 'Dublin',
          selected: false,
          key: 'location'
        },
        {
          id: 2,
          title: 'California',
          selected: false,
          key: 'location'
        },
        {
          id: 3,
          title: 'Istanbul',
          selected: false,
          key: 'location'
        }
      ]
    };
  }

  handleisChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  handleCancel = () => {};

  handleOkay = () => {};

  handleInputText = (text: SyntheticInputEvent<EventTarget>) => {
    this.setState({ inputText: text.target.value });
  };

  toggleList = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  render() {
    const { showModal } = this.props;
    const { isChecked, isCollapsed, location, inputText } = this.state;
    const handleShowModal = showModal
      ? 'modal display-bloc'
      : 'modal display-none';
    return (
      <div className={handleShowModal}>
        <Modal>
          <div className="modal-content">
            <header className="modal-title">
              <div className="question-segment-title">
                <p className="question-title">Add New Question</p>
                <div
                  className="close-modal-icon"
                  role="presentation"
                  onClick={this.handleCloseModal}
                >
                  <Close className="close-icon" />
                </div>
              </div>
              <div className="question-subtitle">Optional Subtitle</div>
            </header>
            <div className="body-wrapper">
              <p className="dd-title">Enter Question Text</p>
              <div className="question-segment">
                <TextArea
                  id="question-text-area"
                  className="modal-text-area"
                  value={inputText}
                  onChange={this.handleInputText}
                  placeholder="Hint text..."
                />
              </div>
              <div className="question-segment">
                <div className="dd-answer-type">
                  <p className="dd-title">Answer Type</p>
                  <Dropdown
                    id="dd-andwer-type"
                    title="Select"
                    isCollapsed={isCollapsed}
                    items={location}
                    onClick={this.toggleList}
                  />
                </div>
                <div className="question-picker">
                  <p className="dd-title">Label</p>
                  <div>picker</div>
                </div>
              </div>
              <p className="dd-title">Which team member roles will answer</p>
              <div className="question-segment">
                <Dropdown
                  id="dd-team-member"
                  title="Select"
                  isCollapsed={isCollapsed}
                  items={location}
                  onClick={this.toggleList}
                />
              </div>
              <div className="question-segment">
                <SelectTeam
                  id="selected-team-item"
                  onClick={this.handleCloseTeam}
                >
                  Business Analyst
                </SelectTeam>
              </div>
              <div className="question-segment">
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
            <footer className="question-segment-footer">
              <div className="question-button-cancel">
                <PrimaryButton
                  className="close-button"
                  id="cancel-button"
                  onClick={this.handleCancel}
                >
                  Cancel
                </PrimaryButton>
              </div>
              <div className="question-button-okay">
                <PrimaryButton
                  className="okay-button"
                  id="okay-button"
                  onClick={this.handleOkay}
                >
                  Okay
                </PrimaryButton>
              </div>
            </footer>
            <div className="modal-content" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalProposal;
