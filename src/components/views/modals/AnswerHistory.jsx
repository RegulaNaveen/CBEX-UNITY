// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import { isEmpty, unionBy } from 'lodash';
import { diffWordsWithSpace } from 'diff';
import { getProposalTeamAssignedRoles } from '../../../redux/selectors';
import { getOpportunityData} from '../../../redux/selectors/proposal';
import { Close } from '../../svg';
import { parseMomentDate } from '../../../utils/DateUtils';
import { rearrangeDiff, getUserInitials, getUserName } from '../../../utils/utils';
type Props = {
  question: Map,
  proposalTeamAnswers: Object,
  opportunityData: Object,
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
    const questionRoles = question
      .get('roleNames')
      .map(role => ({
        role,
        responsable: 'Not defined yet.'
      }))
      .toArray();
    const questionResponsables = proposalTeamAnswers.filter(({ role }) => {
      return !isEmpty(questionRoleNames) && questionRoleNames.includes(role);
    });

    const merged = unionBy(questionResponsables, questionRoles, 'role');

    if (isEmpty(merged)) {
      return (
        <p className="question-responsible not-assigned">Not assigned yet</p>
      );
    }

    return merged.map(({ role, responsable }) => {
      return (
        <p className="question-responsible" key={uuidv4()}>
          Pending: {role} - <span>@{responsable}</span>
        </p>
      );
    });
  };

  renderContent = () => {
    const { question, opportunityData } = this.props;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const sectionName = question.getIn(['section', 'sectionName']);
    let answers = question.get('answers').reverse();
    const questionId = answers.get('questionId');

    if (questionId) answers = question.getIn(['answers', 'answers']).reverse();
    if (answers.isEmpty()) return this.renderAnswerResponsables();

    return answers.map((_answer, index) => {
      const userName = _answer.get('userName') || 'Default User';
      const date = _answer.get('date');
      let answer = _answer.get('answer');
      let proposalId = _answer.get('proposalId');
      let bidNo = '';
      if (
        proposalId &&
        opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails
          ?.bidNo
      ) {
        bidNo = this.props.opportunityData.get(proposalId).toJS().proposal
          .proposalDetails.bidNo;
      }
      
      const nextAnswer = answers.get(index + 1)
        ? answers.get(index + 1).get('answer')
        : answer;
      
      const isValidatedUnityPredictedAnswer = (
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'UnityPredictedAnswer' &&
        answer === nextAnswer
      );

      const userInitials = getUserInitials(userName);
      const parsedDate = parseMomentDate(date);
      const avatarRandomColor = randomColor({ luminosity: 'dark' });

      const renderAnswers = () => {
        const isFirstItem = index === 0;
        const isOnlyOneAnswer = answers.toJS().length === 1
        if (isValidatedUnityPredictedAnswer) {
          return <span key={uuidv4()}><b>Validated Unity Predicted Answer</b></span>;
        }
        if (questionType == 'picklist' && answers && answers.get(index + 1) &&
           answers.get(index + 1).get('userName') === 'UnityPredictedAnswer') {
          return <span key={uuidv4()}><b>Validated Unity Predicted Answer</b></span>;
        }
        if (questionType !== 'picklist') {
          const renderWord = (word, status) => (
            <span className={status} key={uuidv4()}>
              {word}{' '}
            </span>
          );
          if (questionType === 'text' || questionType === 'number') {
            const diffAnswers = diffWordsWithSpace(nextAnswer, answer);
            
            return rearrangeDiff(diffAnswers).map(
              ({ value, added, removed }) => {
                if (removed) return renderWord(value, 'removed');
                if (added) return renderWord(value, 'changed');

                return <span key={uuidv4()}>{value} </span>;
              }
            );
          }
          const showDate = (answer, nextAnswer, indx) => {
            const tmp = answers.toJS();
            if (new Date(answer) == 'Invalid Date') {
              return renderWord('Invalid Date', 'removed');
            }
            const styleClass = isFirstItem && !isOnlyOneAnswer ? 'changed' : undefined;
            const newdate = renderWord(
              String(parseMomentDate(answer)),
              styleClass
            );
            let nextdate = '';
            if (indx + 1 == tmp.length) {
              nextdate = '';
            } else if (
              nextAnswer &&
              String(nextAnswer).trim().length &&
              tmp.length > 1
            ) {
              nextdate = renderWord(
                String(parseMomentDate(nextAnswer)),
                'removed'
              );
            }
            return (
              <>
                {nextdate} {newdate}
              </>
            );
          };

          if (questionType === 'select') {
            if(index == 0){
              const styleClass = isFirstItem && !isOnlyOneAnswer ? 'changed' : undefined;
              return renderWord(answer, styleClass);
            }else if(answers && answers.toJS().length == 2 &&  answers.get(index).get('userName') === 'UnityPredictedAnswer'){
              return <span key={uuidv4()}>{answers.get(index).get('answer')} </span>
            }else{
              return renderWord(answer, 'removed');
            }
          }

          if (questionType === 'date') {
            answer = String(answer)
              .trimStart()
              .trimEnd();
            if (!String(answer).length) {
              return renderWord(parseMomentDate(nextAnswer), 'removed');
            }
            return <p>{showDate(answer, nextAnswer, index)}</p>;
          }

          return <p>{answer}</p>;
        }

        if (answer.isEmpty()) return <p>All answers deleted</p>;

        const deletedAnswers = nextAnswer.filter(ans => !answer.includes(ans));
        const deletedAnswersItems = deletedAnswers.map(ans => (
          <li className="removed" key={uuidv4()}>
            {ans}
          </li>
        ));

        const answerItem = answer.map(singleAnswer => (
          <li
            key={uuidv4()}
            className={!nextAnswer.includes(singleAnswer) ? 'changed' : ''}
          >
            {singleAnswer}
          </li>
        ));

        return (
          <ul>
            {deletedAnswersItems}
            {answerItem}
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
              <p>
                {getUserName(userName)}
              </p>
              {renderAnswers()}
            </div>
          </div>
          <div className="answer-meta-data">
            <p>{parsedDate}</p>
            {bidNo? <p>Bid {bidNo}</p> : null}
          </div>
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
        role="button" // eslint-disable-line
        tabIndex={0}
        onKeyUp={this.onModalKeyPress}
      >
        <div
          className="modal-content"
          role="presentation"
          onClick={this.stopPropagation}
        >
          <div className="bluegrid" />
          <div className="modal-header" >
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
  proposalTeamAnswers: getProposalTeamAssignedRoles(state),
  opportunityData: getOpportunityData(state)
});

export default connect(mapStateToProps)(AnswerHistory);
