// @flow
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import { getLookupUsers } from '../../selectors';
import { Close } from '../svg';

type Props = {
  question: Map,
  users: Object,
  closeModal: () => void
};

class AnswerHistory extends Component<Props> {
  componentDidMount() {
    if (document.body) document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    if (document.body) document.body.classList.remove('no-scroll');
  }

  renderContent = () => {
    const { question } = this.props;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const answers = question.get('answers');

    return answers.reverse().map(_answer => {
      const userEmail = _answer.get('user');
      const date = _answer.get('date');
      const answer = _answer.get('answer');
      const userInitials = 'AS';
      const parsedDate = moment(date).format('DD-MMM-YYYY');
      const avatarRandomColor = randomColor({ luminosity: 'dark' });

      const renderAnswers = () => {
        if (questionType !== 'picklist') return <p>{answer}</p>;
        return (
          <ul>
            {answer.map(singleAnswer => {
              return <li>{singleAnswer}</li>;
            })}
          </ul>
        );
      };

      return (
        <div className="answer-container" key={uuidv4()}>
          <div className="main-container">
            <span style={{ backgroundColor: avatarRandomColor }}>
              {userInitials}
            </span>
            <div>
              <p>{userEmail}</p>
              {renderAnswers()}
            </div>
          </div>
          <p className="date">{parsedDate}</p>
        </div>
      );
    });
  };

  closeModal = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  stopPropagation = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation();
  };

  onModalKeyPress = (event: SyntheticKeyboardEvent<EventTarget>) => {
    if (event.key === 'Escape') {
      const { closeModal } = this.props;
      closeModal();
    }
  };

  render() {
    const { question, closeModal } = this.props;
    const questionTitle = question.get('questionText');

    return (
      <section
        id="answer-history-modal"
        onClick={this.closeModal}
        role="button"
        tabIndex={0}
        onKeyUp={this.onModalKeyPress}
      >
        <div
          className="modal-content"
          role="presentation"
          onClick={this.stopPropagation}
        >
          <div className="modal-header">
            <div className="header-titles">
              <h1>History</h1>
              <p>{questionTitle}</p>
            </div>
            <button type="button" onClick={closeModal}>
              <Close />
            </button>
          </div>

          <div className="modal-body">{this.renderContent()}</div>

          <div className="modal-actions">
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  users: getLookupUsers(state)
});

export default connect(mapStateToProps)(AnswerHistory);
