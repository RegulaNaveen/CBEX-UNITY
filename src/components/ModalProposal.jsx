// @flow
import React, { PureComponent } from 'react';
import Modal from './common/Modal';
import { CloseButton, OkayButton } from './common/Button';
import Checkbox from './common/Checkbox';
import Dropdown from './common/Dropdown';
import closeIcon from '../../img/close.svg';
import TextArea from './common/TextArea';

type Props = {
  showModal: boolean
};

type State = {
  hideModal: boolean,
  checked: boolean,
  listOpen: boolean,
  location: Array<Object>,
  inputText: string
};

class ModalProposal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      hideModal: false,
      checked: false,
      listOpen: false,
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

  handleChecked = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  };

  handleCancel = () => {};

  handleOkay = () => {};

  handleInputText = (text: SyntheticInputEvent<EventTarget>) => {
    this.setState({ inputText: text.target.value });
  };

  toggleList = () => {
    const { listOpen } = this.state;
    this.setState({ listOpen: !listOpen });
  };

  render() {
    const { showModal } = this.props;
    const { checked, listOpen, location, inputText } = this.state;
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
                <div className="close-modal-icon">
                  <button
                    id="close-icon"
                    className="close-icon"
                    onClick={this.handleCancel}
                    onKeyPress={this.handleCancel}
                    type="button"
                    tabIndex={0}
                  >
                    <img src={closeIcon} alt="close modal" />
                  </button>
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
                    listOpen={listOpen}
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
                  listOpen={listOpen}
                  items={location}
                  onClick={this.toggleList}
                />
              </div>
              <div className="question-segment">selectedTeams</div>
              <div className="question-segment">
                <Checkbox
                  id="send-notification-checkbox"
                  value="notification"
                  name="notification"
                  onChange={this.handleChecked}
                  checked={checked}
                >
                  Send notification now
                </Checkbox>
              </div>
            </div>
            <footer className="question-segment-footer">
              <div className="question-button-cancel">
                <CloseButton
                  type="submit"
                  id="cancel-button"
                  onClick={this.handleCancel}
                >
                  Cancel
                </CloseButton>
              </div>
              <div className="question-button-okay">
                <OkayButton
                  type="submit"
                  id="okay-button"
                  onClick={this.handleOkay}
                >
                  Okay
                </OkayButton>
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
