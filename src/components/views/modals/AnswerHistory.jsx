// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable'; // NOSONAR
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import { isEmpty, isString, unionBy } from 'lodash';
import { diffWordsWithSpace } from 'diff';
import Loader from 'apollo-react/components/Loader';

import {
  getProposalTeamAssignedRoles,
  getSelectedBid
} from '../../../redux/selectors';
import { getOpportunityData } from '../../../redux/selectors/proposal';
import { Close } from '../../svg';
import { parseMomentDate } from '../../../utils/DateUtils';
import {
  rearrangeDiff,
  getUserInitials,
  getUserName
} from '../../../utils/utils';
import ANSWER_TYPES from '../../../constants/answerTypes';
import { getProposalAnswerHistory } from '../../../redux/actions/proposal-actions';

type Props = {
  question: Map,
  proposalTeamAnswers: Object,
  opportunityData: Object,
  closeModal: () => void,
  getAnsHistory: Function,
  selectedBid: Object
};

class AnswerHistory extends Component<Props> {
  constructor(props: Object) {
    super(props);

    this.state = {
      question: this.props.question.set('answers', fromJS([])),
      loading: false
    };
  }

  componentDidMount() {
    const { question, getAnsHistory, selectedBid } = this.props;
    const questionID = question?.toJS()?.questionId;
    const proposalID = selectedBid?.toJS()?.id;

    // Set History List form Api
    if (questionID && proposalID) {
      (async () => {
        let modifiedAns = question.get('answers');
        this.setState({ loading: true });
        const res = await getAnsHistory(proposalID, questionID);
        this.setState({ loading: false });
        if (res.status) {
          modifiedAns = fromJS(res.data);
        }
        this.setState(prevState => ({
          question: prevState.question.set('answers', modifiedAns)
        }));
      })();
    }

    if (document.body) document.body.classList.add('no-scroll');
  }

  componentWillUnmount() {
    if (document.body) document.body.classList.remove('no-scroll');
  }

  renderAnswerResponsables = () => {
    const { proposalTeamAnswers } = this.props;
    const { question } = this.state;
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
    const { opportunityData } = this.props;
    const { question } = this.state;
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
      const proposalId = _answer.get('proposalId');
      let bidNo = '';
      if (
        proposalId &&
        opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails
          ?.bidNo
      ) {
        bidNo = this.props.opportunityData.get(proposalId).toJS().proposal
          .proposalDetails.bidNo;
      }

      let nextAnswer = answers.get(index + 1)
        ? answers.get(index + 1).get('answer')
        : answer;

      const isValidatedUnityPredictedAnswer =
        questionType !== ANSWER_TYPES.PICKLIST &&
        questionType !== ANSWER_TYPES.PICKLIST_LOOKUP &&
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'UnityPredictedAnswer' &&
        answer === nextAnswer;

      // picklist answers are array so they require different check than other question types
      const isPicklistValidUnityPredAns =
        (questionType === ANSWER_TYPES.PICKLIST ||
          questionType === ANSWER_TYPES.PICKLIST_LOOKUP) &&
        answers &&
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'UnityPredictedAnswer' &&
        answers
          .get(index + 1)
          .get('answer')
          .toJS()
          .join(',') ===
          answers
            .get(index)
            .get('answer')
            .toJS()
            .join(',');
      const userInitials = getUserInitials(userName);
      const parsedDate = parseMomentDate(date);
      const avatarRandomColor = randomColor({ luminosity: 'dark' });
      const renderAnswers = () => {
        const isFirstItem = index === 0;
        const isLastItem = index === answers.toJS().length - 1;
        const isOnlyOneAnswer = answers.toJS().length === 1;

        if (isValidatedUnityPredictedAnswer) {
          return (
            <span key={uuidv4()}>
              {userName === 'UnityPredictedAnswer' ? (
                `${_answer.get('answer')}`
              ) : (
                <b>Validated Unity Predicted Answer</b>
              )}
            </span>
          );
        }
        if (isPicklistValidUnityPredAns) {
          return (
            <span key={uuidv4()}>
              <b>Validated Unity Predicted Answer</b>
            </span>
          );
        }
        if (
          questionType !== ANSWER_TYPES.PICKLIST &&
          questionType !== ANSWER_TYPES.PICKLIST_LOOKUP
        ) {
          const renderWord = (word, status) => (
            <span className={status} key={uuidv4()}>
              {word}{' '}
            </span>
          );
          if (questionType === 'text' || questionType === 'number') {
            if (sectionName === 'Proposal Team') {
              /**
               * Proposal Team section answers which are "text" types are emails separated with commas.
               * diffWordsWithSpace from diff package is used for highlighting changes in text type answers, but it's hard to read changes in email answers with this algo.
               * The business requested custom change highlight for emails. The below implementation doesn't use 'diff' package.
               */
              const answerTrimArr = answer.split(',').map(i => i.trim()); // Convert String answer to Array
              const nextAnswerTrimArr = nextAnswer
                .split(',')
                .map(i => i.trim()); // Convert String answer to Array
              const intersection = nextAnswerTrimArr.filter(x =>
                answerTrimArr.includes(x)
              ); // Common emails (i.e Not removed)
              const removed = nextAnswerTrimArr.filter(
                x => !answerTrimArr.includes(x)
              ); // removed emails
              const added = answerTrimArr.filter(
                x => !nextAnswerTrimArr.includes(x)
              ); // updated emails
              const allAnswers = [
                ...new Set([...nextAnswerTrimArr, ...answerTrimArr])
              ];
              return allAnswers.map(ans => {
                if (intersection.includes(ans)) return renderWord(ans, '');
                if (removed.includes(ans)) return renderWord(ans, 'removed');
                if (added.includes(ans)) return renderWord(ans, 'changed');
                return null;
              });
            }
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
            let styleClass =
              !isOnlyOneAnswer && !isLastItem ? 'changed' : undefined;

            if (new Date(answer) === 'Invalid Date') {
              return renderWord('Invalid Date', 'removed');
            }

            // Dont add styles if answers are same
            // We use .substring(0, 10) to get only the yyyy-mm-dd out of a String like '2022-04-30T00:00:00+05:30'
            if (
              String(answer).substring(0, 10) ===
              String(nextAnswer).substring(0, 10)
            ) {
              nextAnswer = '';
              styleClass = undefined;
            }
            const newdate = renderWord(
              String(
                // eslint-disable-next-line no-nested-ternary
                answer === 'N/A'
                  ? 'N/A'
                  : answer === ''
                  ? ''
                  : parseMomentDate(answer)
              ),
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
                String(
                  nextAnswer === 'N/A'
                    ? 'N/A'
                    : answer === ''
                    ? ''
                    : parseMomentDate(nextAnswer)
                ),
                'removed'
              );
            }
            return (
              <>
                {nextdate} {newdate}
              </>
            );
          };

          if (
            questionType === 'select' ||
            questionType === 'select-lookup' ||
            questionType === 'radio'
          ) {
            const prevAnswer = () => {
              const answersArr = answers.toJS();
              return answersArr[index + 1] ? answersArr[index + 1].answer : '';
            };
            const combinedAnswer = () => {
              if (
                !isOnlyOneAnswer &&
                prevAnswer() !== '' &&
                prevAnswer() !== answer
              ) {
                return (
                  <>
                    <span className="removed">{prevAnswer()} </span>
                    <span className="changed">{answer}</span>
                  </>
                );
              }
              return '';
            };
            if (index === 0) {
              const styleClass =
                isFirstItem && !isOnlyOneAnswer && prevAnswer() !== answer
                  ? 'changed'
                  : undefined;
              return combinedAnswer() || renderWord(answer, styleClass);
            }
            if (
              answers &&
              answers.get(index - 1) &&
              answers.get(index).get('userName') === 'UnityPredictedAnswer' &&
              answers.get(index - 1).get('answer') ===
                answers.get(index).get('answer')
            ) {
              // checks is this a unity answer which was validated if yes then dont add any styles
              return (
                <span key={uuidv4()}>{answers.get(index).get('answer')} </span>
              );
            }
            if (
              answers &&
              !isFirstItem &&
              answers.get(index + 1) &&
              answers.get(index + 1).get('answer') ===
                answers.get(index).get('answer')
            ) {
              // if answers are same, don't add any style. This scenario occurs when new bids SF answer is the same as the older
              return renderWord(answer, undefined);
            }
            return combinedAnswer() || renderWord(answer, '');
          }

          if (questionType === 'date') {
            answer = String(answer)
              .trimStart()
              .trimEnd();
            if (!String(answer).length) {
              return renderWord(
                nextAnswer === 'N/A'
                  ? 'N/A'
                  : answer === ''
                  ? ''
                  : parseMomentDate(nextAnswer),
                'removed'
              );
            }
            return <p>{showDate(answer, nextAnswer, index)}</p>;
          }

          return <p>{answer}</p>;
        }

        // function to convert Answer to normal JSON
        const convertAnsToJSON = ansData => {
          if (isEmpty(ansData)) return [];
          if (!isString(ansData)) return ansData?.toJS();
          return [ansData];
        };

        const modifiedAns = convertAnsToJSON(answer);
        const modifiedNxtAns = convertAnsToJSON(nextAnswer);
        const deletedAnswers = modifiedNxtAns?.filter(
          ans => !modifiedAns.includes(ans)
        );

        const deletedAnswersItems = deletedAnswers.map(ans => (
          <li className="removed" key={uuidv4()}>
            {ans}
          </li>
        ));

        const answerItem = modifiedAns.map(singleAnswer => (
          <li
            key={uuidv4()}
            className={!modifiedNxtAns.includes(singleAnswer) ? 'changed' : ''}
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
              <p>{getUserName(userName)}</p>
              {renderAnswers()}
            </div>
          </div>
          <div className="answer-meta-data">
            <p>{parsedDate}</p>
            {bidNo ? <p>Bid {bidNo}</p> : null}
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
    const { closeModal } = this.props;
    const { question, loading } = this.state;
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

          {loading && <Loader isInner />}

          <div className="modal-header">
            <div className="header-titles">
              <h1>
                {answers.isEmpty() && !loading ? 'Responsible' : 'History'}
              </h1>
              <p>{questionTitle}</p>
            </div>
            <button type="button" onClick={closeModal}>
              <Close />
            </button>
          </div>

          <div className="modal-body">{!loading && this.renderContent()}</div>

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
  opportunityData: getOpportunityData(state),
  selectedBid: getSelectedBid(state)
});

const mapDispatchToProps = {
  getAnsHistory: getProposalAnswerHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerHistory);
