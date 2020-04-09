// @flow
import React from 'react';
import Modal from './common/Modal';

type Props = {
  showModal: boolean
};

type State = {
  hideModal: boolean
};

const ModalProposal = ({ showModal }: Props, { hideModal }: State) => {
  const handleShowModal = showModal
    ? 'modal display-bloc'
    : 'modal display-none';

  return (
    <div className={handleShowModal}>
      <Modal>
        <div className="header-content">
          <header className="modal-title">
            <div className="question-segment">
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
            <div className="question-segment">checkbox</div>
          </div>
          <footer className="question-segment-footer">
            <div className="div">cancel</div>
            <div className="div">okay</div>
          </footer>
          <div className="modal-content" />
        </div>
      </Modal>
    </div>
  );
};

export default ModalProposal;
