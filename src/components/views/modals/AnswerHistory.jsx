/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, fromJS, List } from 'immutable'; // NOSONAR
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import { isEmpty, isString, unionBy, isObject } from 'lodash';
import { diffWordsWithSpace } from 'diff';
import Loader from 'apollo-react/components/Loader';
import {
  getProposalTeamAssignedRoles,
  getSelectedBid,
  getUserData
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
import {
  getProposalAnswerHistory,
  setProposalAnswerData
} from '../../../redux/actions/proposal-actions';
import { SocketContext } from '../../../context/SocketContext';
import MatomoHOC from '../../HOC/MatomoHOC';
import withIdleStateDetection from '../../HOC/IdleStateDetector';
import { getLastAnswer } from '../../screens/Approvals/utils';

type Props = {
  question: Map,
  proposalTeamAnswers: Object,
  opportunityData: Object,
  closeModal: () => void,
  getAnsHistory: Function,
  selectedBid: Object,
  userData: Object,
  setProposalAnswer: Function,
  trackEvent: any,
  eventCategories: any,
  events: any,
  tab: any,
  isQuesFreezed: any,
  onCascadeChange: any
};
let lockQuestion;
let conditionBlankPredicted;
let indexNo;
let questionIdentifier;
let bidNo = '';
let isCurrentBid = '';

function handleUserMentionInAnswer(formattedAnswer = null, answer = '') {
  let finalAnswer = '';
  try {
    const formattedAnswerJSON = JSON.parse(formattedAnswer);
    let mentions = [];
    let offset = 0;
    let lastText = '';
    formattedAnswerJSON.value.blocks.forEach(block => {
      let { entityRanges } = block;
      const { text } = block;
      if (Array.isArray(entityRanges) && entityRanges.length > 0) {
        entityRanges = entityRanges.reverse();
        entityRanges.forEach(entity => {
          if (
            formattedAnswerJSON.value.entityMap &&
            formattedAnswerJSON.value.entityMap[entity.key] &&
            formattedAnswerJSON.value.entityMap[entity.key].type === 'MENTION'
          ) {
            mentions.push({
              start: offset + entity.offset,
              end: offset + entity.offset + entity.length
            });
          }
        });
      }

      mentions = mentions.sort((a, b) => a.start - b.start);
      const mentionsStartList = mentions.map(m => m.start);
      for (let i = 0; i < text.length; i += 1) {
        const mentionIndex = mentionsStartList.findIndex(m => m === i + offset);
        if (mentionIndex > -1) {
          if (lastText.length > 0) {
            finalAnswer += lastText;
            lastText = '';
          }
          finalAnswer += `@${text.slice(
            mentions[mentionIndex].start - offset,
            mentions[mentionIndex].end - offset
          )}`;
          i = mentions[mentionIndex].end - offset - 1;
          continue;
        }
        finalAnswer += text[i];
      }
      finalAnswer += ' ';
      offset += text.length;
    });
  } catch (e) {
    console.log(
      '[AnswerHistory: handleUserMentionInAnswer] Error in parsing formattedAnswer for user tags',
      e
    );
    finalAnswer = answer;
  }
  return finalAnswer;
}

// function to check both answers are same
function areBothAnswersSame(answer1, answer2) {
  if (List.isList(answer1)) {
    return answer1.equals(answer2);
  } else if (typeof answer1 === 'string') {
    return answer1.trim() === answer2.trim();
  }
  return answer1 === answer2;
}

function isAnswerEmpty(answer) {
  if (List.isList(answer)) {
    return answer.size === 0;
  } else if (answer === ' ') {
    return true;
  } else {
    return answer === '';
  }
}

class AnswerHistory extends Component<Props> {
  static contextType = SocketContext;

  constructor(props: Object) {
    super(props);
    const { question, isQuesFreezed } = this.props;
    this.state = {
      question: !isQuesFreezed ? question.set('answers', fromJS([])) : question,
      lastAnswer: getLastAnswer(question.toJS()),
      loading: false
    };
    this.setMouseMove = this.setMouseMove.bind(this);
  }

  componentDidMount() {
    const {
      question,
      getAnsHistory,
      selectedBid,
      isQuesFreezed,
      opportunityData,
      toggleWatch
    } = this.props;
    const { lastAnswer } = this.state;
    const { questionLockWrapper } = this.context;
    const questionID = question?.toJS()?.questionId;
    const proposalID = selectedBid?.toJS()?.id;
    bidNo = opportunityData?.get(proposalID)?.toJS().proposal.proposalDetails
      .bidNo;
    isCurrentBid =
      opportunityData?.get(proposalID)?.toJS().isCurrent === true
        ? opportunityData?.get(proposalID)?.toJS().proposal.proposalDetails
            .bidNo
        : 'NA';
    if (
      isCurrentBid === bidNo &&
      lastAnswer?.userName === 'UnityPredictedAnswer'
    ) {
      questionLockWrapper(questionIdentifier);
      if (toggleWatch) {
        toggleWatch(true);
      }
    }
    // Set History List form Api
    if (questionID && proposalID && !isQuesFreezed) {
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

  componentDidUpdate(prevProps, prevState) {
    const { forceBlur, toggleWatch } = this.props;
    const { questionUnlockWrapper } = this.context;
    if (forceBlur === true) {
      if (toggleWatch) toggleWatch(false);
      if (questionUnlockWrapper) questionUnlockWrapper(questionIdentifier);
      this.closeModalWindow();
    }
  }

  componentWillUnmount() {
    if (document.body) document.body.classList.remove('no-scroll');
  }

  setMouseMove(e) {
    const { onCascadeChange } = this.props;
    if (onCascadeChange) onCascadeChange();
  }

  handleVerifyPredictedAnsClick = predictedAnswer => {
    const {
      trackEvent,
      eventCategories,
      events,
      opportunityData,
      tab
    } = this.props;
    const { question } = this.state;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const answers = question.get('answers').reverse();
    const questions = question.reverse();
    const questionId = questions.get('questionId');
    const questionText = questions.get('questionText');
    const proposalId = answers.get(0).get('proposalId');
    const { sectionName } = question.get('section').toJS();
    const answer = answers.get(0).get('answer');
    const questionHTML = questions.get('questionHtml');
    const questionJSON = questions.get('questionJSON');
    const questionHintJSON = questions.get('questionHintJSON');
    const proposalDetail =
      proposalId &&
      opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails;
    const { setProposalAnswer, userData } = this.props;
    const answerType = questionType;
    // picklist value should not be converted to string while saving
    if (
      answerType === ANSWER_TYPES.PICKLIST ||
      answerType === ANSWER_TYPES.PICKLIST_LOOKUP ||
      answerType === ANSWER_TYPES.CHECKBOX
    ) {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        predictedAnswer.get('answer'),
        userData
      );
    } else {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        String(predictedAnswer.get('answer')).trim(),
        userData,
        '',
        false
      );
    }
    let action = 'Answer History';
    if (tab && tab === 'Approval') {
      action = 'Approval Answer History';
    }
    if (tab && tab === 'UnityTab') {
      action = 'UnityTab Answer History';
    }
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `${action} Event: ${questionText} (${sectionName})`,
      name: `Verified Answer: ${answer} by ${userData.name} ${userData.email}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer,
            sectionName,
            questionText,
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId,
            proposalDetail
          })
        },
        {
          events: events || []
        }
      ]
    });
    this.closeModalWindow();
  };

  handleRejectPredictedAnsClick = () => {
    const {
      trackEvent,
      eventCategories,
      events,
      opportunityData,
      userData,
      tab
    } = this.props;
    const { question } = this.state;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const answers = question.get('answers').reverse();
    const questions = question.reverse();
    const questionId = questions.get('questionId');
    const questionText = questions.get('questionText');
    const proposalId = answers.get(0).get('proposalId');
    const answer = answers.get(0).get('answer');
    const { sectionName } = question.get('section').toJS();
    const questionHTML = questions.get('questionHtml');
    const questionJSON = questions.get('questionJSON');
    const questionHintJSON = questions.get('questionHintJSON');
    const proposalDetail =
      proposalId &&
      opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails;
    const { setProposalAnswer } = this.props;
    const answerType = questionType;
    // picklist value should not be converted to string while saving
    if (
      answerType === ANSWER_TYPES.PICKLIST ||
      answerType === ANSWER_TYPES.PICKLIST_LOOKUP ||
      answerType === ANSWER_TYPES.CHECKBOX
    ) {
      setProposalAnswer(this.context, proposalId, questionId, [], userData);
    } else {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        ' ',
        userData,
        '',
        false
      );
    }
    let action = 'Answer History';
    if (tab && tab === 'Approval') {
      action = 'Approval Answer History';
    }
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `${action} Event: ${questionText} (${sectionName})`,
      name: `Rejected Answer: ${answer} by ${userData.name} ${userData.email}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer,
            sectionName,
            questionText,
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId,
            proposalDetail
          })
        },
        {
          events: events || []
        }
      ]
    });
    this.closeModalWindow();
  };

  onAcceptCarryForwardAnswer = (carryForwardAnswer, cfProposalId = '') => {
    const {
      trackEvent,
      eventCategories,
      events,
      opportunityData,
      tab,
      selectedBid
    } = this.props;
    const { question } = this.state;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const answers = question.get('answers').reverse();
    const questions = question.reverse();
    const questionId = questions.get('questionId');
    const questionText = questions.get('questionText');
    const proposalId = answers.get(0).get('proposalId');
    const { sectionName } = question.get('section').toJS();
    const answer = answers.get(0).get('answer');
    const questionHTML = questions.get('questionHtml');
    const questionJSON = questions.get('questionJSON');
    const questionHintJSON = questions.get('questionHintJSON');
    const proposalDetail =
      proposalId &&
      opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails;
    const { setProposalAnswer, userData } = this.props;
    const answerType = questionType;
    // picklist value should not be converted to string while saving
    if (
      answerType === ANSWER_TYPES.PICKLIST ||
      answerType === ANSWER_TYPES.PICKLIST_LOOKUP ||
      answerType === ANSWER_TYPES.CHECKBOX
    ) {
      setProposalAnswer(
        this.context,
        selectedBid.get('id'),
        questionId,
        carryForwardAnswer.get('answer'),
        userData,
        false,
        cfProposalId
      );
    } else {
      setProposalAnswer(
        this.context,
        selectedBid.get('id'),
        questionId,
        String(carryForwardAnswer.get('answer')).trim(),
        userData,
        '',
        false,
        cfProposalId
      );
    }
    let action = 'Answer History';
    if (tab && tab === 'Approval') {
      action = 'Approval Answer History';
    }
    if (tab && tab === 'UnityTab') {
      action = 'UnityTab Answer History';
    }
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `${action} Event: ${questionText} (${sectionName})`,
      name: `Verified Answer: ${answer} by ${userData.name} ${userData.email}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer,
            sectionName,
            questionText,
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId,
            proposalDetail
          })
        },
        {
          events: events || []
        }
      ]
    });
    this.closeModalWindow();
  };

  onRejectCarryForwardAnswer = () => {
    const {
      trackEvent,
      eventCategories,
      events,
      opportunityData,
      userData,
      tab,
      selectedBid
    } = this.props;
    const { question } = this.state;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const answers = question.get('answers').reverse();
    const questions = question.reverse();
    const questionId = questions.get('questionId');
    const questionText = questions.get('questionText');
    const proposalId = answers.get(0).get('proposalId');
    const answer = answers.get(0).get('answer');
    const { sectionName } = question.get('section').toJS();
    const questionHTML = questions.get('questionHtml');
    const questionJSON = questions.get('questionJSON');
    const questionHintJSON = questions.get('questionHintJSON');
    const proposalDetail =
      proposalId &&
      opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails;
    const { setProposalAnswer } = this.props;
    const answerType = questionType;
    // picklist value should not be converted to string while saving
    if (
      answerType === ANSWER_TYPES.PICKLIST ||
      answerType === ANSWER_TYPES.PICKLIST_LOOKUP ||
      answerType === ANSWER_TYPES.CHECKBOX
    ) {
      setProposalAnswer(
        this.context,
        selectedBid.get('id'),
        questionId,
        [],
        userData
      );
    } else {
      setProposalAnswer(
        this.context,
        selectedBid.get('id'),
        questionId,
        ' ',
        userData,
        '',
        false
      );
    }
    let action = 'Answer History';
    if (tab && tab === 'Approval') {
      action = 'Approval Answer History';
    }
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `${action} Event: ${questionText} (${sectionName})`,
      name: `Rejected Answer: ${answer} by ${userData.name} ${userData.email}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer,
            sectionName,
            questionText,
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId,
            proposalDetail
          })
        },
        {
          events: events || []
        }
      ]
    });
    this.closeModalWindow();
  };

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

  parseJson = str => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  };

  extractName = str => {
    const splirt_array = str.split('.');
    return splirt_array // check null
      ? splirt_array.length > 0
        ? splirt_array[0].trim()
        : ''
      : '';
  };

  renderContent = () => {
    const { opportunityData, selectedBid, isQuesFreezed } = this.props;
    const { question } = this.state;
    const questionType = question.getIn(['answerConfiguration', 'type']);
    const sectionName = question.getIn(['section', 'sectionName']);
    let answers = question.get('answers').reverse();
    const questionId = answers.get('questionId');
    if (questionId) answers = question.getIn(['answers', 'answers']).reverse();
    if (answers.isEmpty()) return this.renderAnswerResponsables();
    const questions = question.reverse();
    questionIdentifier = questions.get('questionId');
    lockQuestion = questionIdentifier;
    const lastAnswer = answers.get(0).toJS();
    answers.forEach((_answer, index) => {
      const currentAnswer =
        isObject(answers?.get(index)?.get('answer')) &&
        answers?.get(index)?.get('answer').size === 0
          ? ' '
          : answers?.get(index)?.get('answer');
      conditionBlankPredicted =
        answers.size &&
        isString(currentAnswer) &&
        isEmpty(currentAnswer.trim()) &&
        answers?.get(index + 1)?.get('userName') === 'UnityPredictedAnswer';
      if (conditionBlankPredicted) {
        answers = answers.delete(index).delete(index);
      }
    });

    return answers.map((_answer, index) => {
      const userName = _answer.get('userName') || 'Default User';
      const cfProposalId = _answer.get('cfProposalId');
      let cfBidNo = null;
      const date = _answer.get('date');
      // get formattedAnswer if present or fallback to answer
      const answerCheck = _answer.get('formattedAnswer');
      let answer = _answer.get('answer');
      if (!isEmpty(answerCheck)) {
        answer =
          handleUserMentionInAnswer(answerCheck, _answer.get('answer')) ||
          _answer.get('answer');
      } else {
        answer = _answer.get('answer');
      }
      const proposalId = _answer.get('proposalId');
      indexNo = index;
      if (
        proposalId &&
        opportunityData.get(proposalId)?.toJS()?.proposal?.proposalDetails
          ?.bidNo
      ) {
        bidNo = opportunityData.get(proposalId).toJS().proposal.proposalDetails
          .bidNo;
        isCurrentBid =
          opportunityData.get(proposalId).toJS().isCurrent === true
            ? opportunityData.get(proposalId).toJS().proposal.proposalDetails
                .bidNo
            : 'NA';
      }

      if (
        cfProposalId &&
        opportunityData.get(cfProposalId).toJS().proposal.proposalDetails?.bidNo
      ) {
        cfBidNo = opportunityData.get(cfProposalId).toJS().proposal
          .proposalDetails.bidNo;
      }

      const nextAnswerCheck = answers?.get(index + 1)?.get('formattedAnswer');
      let nextAnswer = answers.get(index + 1)
        ? answers.get(index + 1).get('answer')
        : answer;

      if (answers.get(index + 1)) {
        // nextAnswer = answers.get(index + 1).get('answer');
        if (!isEmpty(nextAnswerCheck)) {
          nextAnswer =
            handleUserMentionInAnswer(nextAnswerCheck, nextAnswer) ||
            answers.get(index + 1).get('answer');
        } else {
          nextAnswer = answers.get(index + 1)
            ? answers.get(index + 1).get('answer')
            : answer;
        }
      }

      const isValidatedUnityPredictedAnswer =
        questionType !== ANSWER_TYPES.PICKLIST &&
        questionType !== ANSWER_TYPES.PICKLIST_LOOKUP &&
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'UnityPredictedAnswer' &&
        answer === nextAnswer;

      const isAcceptedCarryForwardedAnswer =
        questionType !== ANSWER_TYPES.PICKLIST &&
        questionType !== ANSWER_TYPES.PICKLIST_LOOKUP &&
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'CarryForwardAnswer' &&
        !isAnswerEmpty(answer) &&
        areBothAnswersSame(answer, nextAnswer);

      const isRejectedCarryForwardedAnswer =
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'CarryForwardAnswer' &&
        isAnswerEmpty(answer);

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

      const doesPicklistAcceptedCarryForwardAnswer =
        (questionType === ANSWER_TYPES.PICKLIST ||
          questionType === ANSWER_TYPES.PICKLIST_LOOKUP) &&
        answers &&
        answers.get(index + 1) &&
        answers.get(index + 1).get('userName') === 'CarryForwardAnswer' &&
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

      const userInitials = getUserInitials(userName, cfBidNo);
      const parsedDate = parseMomentDate(date);
      const avatarRandomColor = randomColor({ luminosity: 'dark' });
      const renderAnswers = () => {
        const isFirstItem = index === 0;
        const isLastItem = index === answers.toJS().length - 1;
        const isOnlyOneAnswer = answers.toJS().length === 1;
        if (isValidatedUnityPredictedAnswer) {
          return (
            <span key={uuidv4()} className="unity-predicted-section">
              {answers.get(index).get('userName') === 'UnityPredictedAnswer' &&
              answers.get(index + 1).get('userName') ===
                'UnityPredictedAnswer' ? (
                questionType === 'date' ? (
                  `${parseMomentDate(_answer.get('answer'))}`
                ) : (
                  `${_answer.get('answer')}`
                )
              ) : (
                <b>Validated Unity Predicted Answer</b>
              )}
            </span>
          );
        }
        if (isPicklistValidUnityPredAns) {
          return (
            <span key={uuidv4()} className="unity-predicted-section">
              {answers.get(index).get('userName') === 'UnityPredictedAnswer' &&
              answers.get(index + 1).get('userName') ===
                'UnityPredictedAnswer' ? (
                _answer.get('answer').map(singleAnswer => (
                  <li key={uuidv4()} className="multi-select-answer-history">
                    {singleAnswer}
                  </li>
                ))
              ) : (
                <b>Validated Unity Predicted Answer</b>
              )}
            </span>
          );
        }

        if (isAcceptedCarryForwardedAnswer) {
          let cfBidNoPrevAnswer = null;
          const cfProposalIdPrevAnswer = answers
            .get(index + 1)
            .get('cfProposalId');
          if (
            cfProposalIdPrevAnswer &&
            opportunityData.get(cfProposalIdPrevAnswer).toJS().proposal
              .proposalDetails?.bidNo
          ) {
            cfBidNoPrevAnswer = opportunityData
              .get(cfProposalIdPrevAnswer)
              .toJS().proposal.proposalDetails.bidNo;
          }

          return (
            <span key={uuidv4()} className="carry-forwarded-section">
              {answers.get(index).get('userName') === 'CarryForwardAnswer' &&
              answers.get(index + 1).get('userName') ===
                'CarryForwardAnswer' ? (
                questionType === 'date' ? (
                  `${parseMomentDate(_answer.get('answer'))}`
                ) : (
                  `${_answer.get('answer')}`
                )
              ) : (
                <b>
                  Validated{' '}
                  {getUserName(
                    'CarryForwardAnswer',
                    cfBidNoPrevAnswer
                  ).toLowerCase()}
                </b>
              )}
            </span>
          );
        }

        if (doesPicklistAcceptedCarryForwardAnswer) {
          let cfBidNoPrevAnswer = null;
          const cfProposalIdPrevAnswer = answers
            .get(index + 1)
            .get('cfProposalId');
          if (
            cfProposalIdPrevAnswer &&
            opportunityData.get(cfProposalIdPrevAnswer).toJS().proposal
              .proposalDetails?.bidNo
          ) {
            cfBidNoPrevAnswer = opportunityData
              .get(cfProposalIdPrevAnswer)
              .toJS().proposal.proposalDetails.bidNo;
          }

          return (
            <span key={uuidv4()} className="carry-forwarded-section">
              {answers.get(index).get('userName') === 'CarryForwardAnswer' &&
              answers.get(index + 1).get('userName') ===
                'CarryForwardAnswer' ? (
                _answer.get('answer').map(singleAnswer => (
                  <li key={uuidv4()} className="multi-select-answer-history">
                    {singleAnswer}
                  </li>
                ))
              ) : (
                <b>
                  Validated{' '}
                  {getUserName(
                    'CarryForwardAnswer',
                    cfBidNoPrevAnswer
                  ).toLowerCase()}
                </b>
              )}
            </span>
          );
        }

        if (isRejectedCarryForwardedAnswer) {
          let cfBidNoPrevAnswer = null;
          const cfProposalIdPrevAnswer = answers
            .get(index + 1)
            .get('cfProposalId');
          if (
            cfProposalIdPrevAnswer &&
            opportunityData.get(cfProposalIdPrevAnswer).toJS().proposal
              .proposalDetails?.bidNo
          ) {
            cfBidNoPrevAnswer = opportunityData
              .get(cfProposalIdPrevAnswer)
              .toJS().proposal.proposalDetails.bidNo;
          }

          return (
            <span key={uuidv4()} className="carry-forwarded-section">
              {
                <b>
                  Rejected{' '}
                  {getUserName(
                    'CarryForwardAnswer',
                    cfBidNoPrevAnswer
                  ).toLowerCase()}
                </b>
              }
            </span>
          );
        }

        if (
          questionType !== ANSWER_TYPES.PICKLIST &&
          questionType !== ANSWER_TYPES.PICKLIST_LOOKUP &&
          questionType !== ANSWER_TYPES.CHECKBOX
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
            if (indx + 1 === tmp.length) {
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
                  : nextAnswer === ''
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
        <div>
          <div className="answer-container">
            <div className="main-container">
              <span
                style={{ backgroundColor: avatarRandomColor }}
                className="avatar"
              >
                {userInitials}
              </span>
              <div>
                <p>{getUserName(userName, cfBidNo, isAnswerEmpty(answer))}</p>
                {renderAnswers()}
              </div>
            </div>
            <div className="answer-meta-data">
              <p className="answer-history-para">{parsedDate}</p>
              {bidNo ? (
                <p className="answer-history-para">Bid {bidNo}</p>
              ) : null}
              {indexNo === 0 &&
              !isQuesFreezed &&
              isCurrentBid === bidNo &&
              lastAnswer?.userName === 'UnityPredictedAnswer' &&
              userName === 'UnityPredictedAnswer' ? (
                <div className="answer-meta-buttons">
                  <button
                    size="small"
                    type="button"
                    className="answer-history-reject"
                    onClick={() => this.handleRejectPredictedAnsClick()}
                  >
                    Reject
                  </button>
                  <button
                    size="small"
                    type="button"
                    className="answer-history-accept"
                    onClick={() => this.handleVerifyPredictedAnsClick(_answer)}
                  >
                    Accept
                  </button>
                </div>
              ) : null}
              {indexNo === 0 &&
              !isQuesFreezed &&
              selectedBid.get('isCurrent', false) &&
              lastAnswer?.userName === 'CarryForwardAnswer' &&
              isAnswerEmpty(answer) &&
              userName === 'CarryForwardAnswer' ? (
                <div className="answer-meta-buttons">
                  <button
                    size="small"
                    type="button"
                    className="answer-history-reject"
                    onClick={() => this.onRejectCarryForwardAnswer()}
                  >
                    Reject
                  </button>
                  <button
                    size="small"
                    type="button"
                    className="answer-history-accept"
                    onClick={() =>
                      this.onAcceptCarryForwardAnswer(_answer, cfProposalId)
                    }
                  >
                    Accept
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
  };

  closeModalWindow = () => {
    const { closeModal, toggleWatch } = this.props;
    const { questionUnlockWrapper } = this.context;
    if (toggleWatch) toggleWatch(false);
    if (questionUnlockWrapper) questionUnlockWrapper(lockQuestion);
    closeModal();
  };

  stopPropagation = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation();
  };

  onModalKeyPress = (event: SyntheticKeyboardEvent<EventTarget>) => {
    if (event.key === 'Escape') {
      this.closeModalWindow();
    }
  };

  render() {
    const { question, loading } = this.state;
    const answers = question.get('answers');
    const questionTitle = question.get('questionText');
    return (
      <section
        id="answer-history-modal"
        onClick={this.closeModalWindow}
        role="button" // eslint-disable-line
        tabIndex={0}
        onMouseMove={e => this.setMouseMove(e)}
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
            <button type="button" onClick={this.closeModalWindow}>
              <Close />
            </button>
          </div>
          <div className="modal-body">{!loading && this.renderContent()}</div>
          <div className="modal-actions">
            <button type="button" onClick={this.closeModalWindow}>
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
  userData: getUserData(state),
  opportunityData: getOpportunityData(state),
  selectedBid: getSelectedBid(state)
});
const mapDispatchToProps = {
  getAnsHistory: getProposalAnswerHistory,
  setProposalAnswer: setProposalAnswerData
};
const MemoizedAnswerHistory = React.memo(AnswerHistory);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatomoHOC(withIdleStateDetection(MemoizedAnswerHistory)));
