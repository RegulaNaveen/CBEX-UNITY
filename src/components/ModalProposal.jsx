// @flow
import React, { PureComponent } from 'react';
import Modal from './common/Modal';
import { CloseButton, OkayButton } from './common/Button';
import Checkbox from './common/Checkbox';

type Props = {
  showModal: boolean
};

type State = {
  hideModal: boolean,
  checked: boolean
};

class ModalProposal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      hideModal: false,
      checked: false
    };
  }

  handleChecked = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  };

  handleCancel = () => {};

  render() {
    const { showModal } = this.props;
    const { checked } = this.state;
    const handleShowModal = showModal
      ? 'modal display-bloc'
      : 'modal display-none';
    return (
      <div className={handleShowModal}>
        <Modal>
          <div className="header-content">
            <header className="modal-title">
              <div className="question-segment-title">
                <p className="question-title">Add New Question</p>
                <div className="hide-modal-icon">X</div>
              </div>
              <div className="question-subtitle">Optional Subtitle</div>
            </header>
            <div className="body-wrapper">
              <div className="question-segment">Text input</div>
              <div className="question-segment">
                <div className="question-segment-row">
                  <div>dropdown</div>
                  <div>picker</div>
                </div>
              </div>
              <div className="question-segment">
                <div className="question-segment-row">dropdown</div>
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
                  onClick={this.handleCancel}
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
