// @flow
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import classNames from 'classnames';
import { isEmpty, flatten } from 'lodash';
import { getProposalTeamAssignedRoles } from '../../selectors';
import { Close } from '../svg';

type Props = {
  question: Map,
  proposalTeamAnswers: Object,
  closeModal: () => void
};

class AnswerHistory extends Component<Props> {
  componentDidMount() {
    if (document.body) document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    if (document.body) document.body.classList.remove('no-scroll');
  }

  renderAnswerResponsables = () => {
    const { question, proposalTeamAnswers } = this.props;
    const questionRoleNames = question.get('roleNames');

    const questionResponsables = proposalTeamAnswers.filter(({ role }) =>
      questionRoleNames.includes(role)
    );

    if (isEmpty(questionResponsables)) {
      return (
        <p className="question-responsible not-assigned">Not assigned yet</p>
      );
    }

    return questionResponsables.map(({ role, responsable }) => {
      return (
        <p className="question-responsible" key={uuidv4()}>
          Pending: {role} - <span>@{responsable}</span>
        </p>
      );
    });
  };

  renderContent = () => {
    const { question } = this.props;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const sectionName = question.getIn(['section', 'sectionName']);
    const answers = question.get('answers').reverse();

    if (answers.isEmpty()) return this.renderAnswerResponsables();

    return answers.map((_answer, index) => {
      const userName = _answer.get('userName') || 'Default User';
      const date = _answer.get('date');
      const answer = _answer.get('answer');
      const nextAnswer = answers.get(index + 1)
        ? answers.get(index + 1).get('answer')
        : answer;
      const userInitials =
        userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0);
      const parsedDate = moment(date).format('DD-MMM-YYYY');
      const avatarRandomColor = randomColor({ luminosity: 'dark' });

      const renderAnswers = () => {
        if (questionType !== 'picklist') {
          if (questionType === 'text' && sectionName !== 'Proposal Team') {
            const answerArray = answer.split(' ');
            const nextAnswerArray = nextAnswer.split(' ');

            const historyAnswer = answerArray.map((answer_, index_) => {
              if (answer_.includes(nextAnswerArray[index_]))
                return { answer_, status: 'normal' };

              return [
                { answer_: nextAnswerArray[index_], status: 'removed' },
                { answer_, status: 'changed' }
              ];
            });

            return (
              <p>
                {flatten(historyAnswer).map(({ answer_, status }) => (
                  <span key={uuidv4()} className={classNames(status)}>
                    {answer_}{' '}
                  </span>
                ))}
              </p>
            );
          }

          if (questionType === 'date') {
            return <p>{moment(answer).format('DD-MMM-YYYY')}</p>;
          }

          return <p>{answer}</p>;
        }

        if (answer.isEmpty()) return <p>All answers deleted</p>;

        return (
          <ul>
            {answer.map(singleAnswer => {
              const deletedAnswers = nextAnswer.filter(
                ans => !answer.includes(ans)
              );

              const deletedAnswersItems = deletedAnswers.map(ans => (
                <li className="answer-deleted" key={uuidv4()}>
                  {ans}
                </li>
              ));

              const answerItem = (
                <li
                  key={uuidv4()}
                  className={
                    !nextAnswer.includes(singleAnswer) ? 'answer-added' : ''
                  }
                >
                  {singleAnswer}
                </li>
              );

              return [deletedAnswersItems, answerItem];
            })}
          </ul>
        );
      };

      return (
        <div className="answer-container" key={uuidv4()}>
          <div className="main-container">
            <span
              style={{ backgroundColor: avatarRandomColor }}
              className="avatar"
            >
              {userInitials}
            </span>
            <div>
              <p>{userName}</p>
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
    const answers = question.get('answers');
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
              <h1>{answers.isEmpty() ? 'Responsible' : 'History'}</h1>
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
  proposalTeamAnswers: getProposalTeamAssignedRoles(state)
});

export default connect(mapStateToProps)(AnswerHistory);
