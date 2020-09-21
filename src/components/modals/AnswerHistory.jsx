// @flow
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import classNames from 'classnames';
import _, { isEmpty, flatten, uniqWith } from 'lodash';
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
    const answers = question.get('answers').reverse();

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
          if (questionType === 'text') {
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

          return <p>{answer}</p>;
        }

        if (isEmpty(answer.toJS())) return <p>All answers deleted</p>;

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
