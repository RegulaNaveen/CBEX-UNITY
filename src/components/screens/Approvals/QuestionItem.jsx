import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import Grid from 'apollo-react/components/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Box from 'apollo-react/components/Box';
import Typography from 'apollo-react/components/Typography';
import IconButton from 'apollo-react/components/IconButton';
import { Map, List, fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import CalendarIcon from './CalendarIcon';
import QuestionLabel from './QuestionLabel';
import AnswerHistory from '../../views/modals/AnswerHistory';
import ANSWER_TYPES from '../../../constants/answerTypes';
import { getCountriesNameForCode } from '../../../utils/utils';
import TextQuestion from './InputComponents/TextQuestion';
import NumberQuestion from './InputComponents/NumberQuestion';
import DateQuestion from './InputComponents/DateQuestion';
import RadioQuestion from './InputComponents/RadioQuestion';
import SelectQuestion from './InputComponents/SelectQuestion';
import MultiSelectQuestion from './InputComponents/MultiSelectQuestion';
import YesNoQuestion from './InputComponents/YesNoQuestion';
import CheckBoxQuestion from './InputComponents/CheckBoxQuestion';
import ProposalTeamQuestion from './InputComponents/ProposalTeamQuestion';
import { getUserName, getUserEmail, getUserId } from '../../../SessionHandler';
import { SocketContext } from '../../../context/SocketContext';
import SFAnswerValidationWrapper from '../../common/SFAnswerValidationWrapper';
import MatomoHOC from '../../HOC/MatomoHOC';
import {
  getOpportunityData,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import CustomLoader from './CustomLoader';
import { getLastAnswer, shouldShowQuestion } from './utils';
import { getQuestion } from '../../../redux/selectors';
import { selectCurrentSearchResult } from '../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';
import withIdleStateDetection from '../../HOC/IdleStateDetector';

const DateQuestionWithIdleStateDetection = withIdleStateDetection(DateQuestion);
const SelectQuestionWithIdleStateDetection = withIdleStateDetection(
  SelectQuestion
);
const MultiSelectQuestionWithIdleStateDetection = withIdleStateDetection(
  MultiSelectQuestion
);
const YesNoQuestionWithIdleStateDetection = withIdleStateDetection(
  YesNoQuestion
);

const CheckBoxQuestionWithIdleStateDetection = withIdleStateDetection(
  CheckBoxQuestion
);

const QuestionItem = ({
  questionId = '',
  approvalSectionTitle = '',
  disabled,
  isQuesFreezed,
  archivedQuestion,
  eventCategories,
  trackEvent,
  updateQuestionVisibility,
  highlightQuestionId
}) => {
  const [locked, setLocked] = useState(false);
  const question = isQuesFreezed
    ? archivedQuestion
    : useSelector(getQuestion(questionId));
  const activeQuestionInfo = useSelector(getQuestion(questionId));
  const approvalFilters = useSelector(state => state.approvals.filters);
  const isShowQuestion = shouldShowQuestion(question, approvalFilters);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const questionTextRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !isQuesFreezed &&
      activeQuestionInfo &&
      activeQuestionInfo.questionLockInfo
    ) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [isQuesFreezed, activeQuestionInfo]);

  useEffect(() => {
    if (currentSearchResult !== null && questionTextRef.current !== null) {
      if (currentSearchResult.searchIndex === highlightQuestionId) {
        setTimeout(() => {
          questionTextRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 700);
      }
    }
  }, [questionTextRef.current, currentSearchResult, highlightQuestionId]);

  useEffect(() => {
    // Calculates the no of visibile questions
    // Used to decide the visibility of a Section
    if (!isQuesFreezed) {
      updateQuestionVisibility(questionId, isShowQuestion);
    }
  }, [approvalFilters]);

  const socketContext = useContext(SocketContext);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const proposalId = selectedBid?.id;
  const opportunityData = allOppData[proposalId];

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  const prepareAnswerHistoryData = questionData => {
    let questionMap = fromJS(questionData);
    try {
      // This Logic was copy pasted from src/components/screens/opportunity/Questions.jsx
      // It prepares answer data for a specific answer type.
      // If possible move this logic inside AnswerHistory component to avoid duplication of code
      const answerConfigType = questionMap
        .get('answerConfiguration', Map({ type: '' }))
        .get('type', '');
      const sfObject = questionMap.get('sfObject', '');
      const sfField = questionMap.get('sfField', '');
      if (
        answerConfigType === ANSWER_TYPES.PICKLIST &&
        (sfObject === 'Bid_History__c' ||
          sfObject === 'Apttus__APTS_Agreement__c') &&
        sfField === 'Targeted_Countries__c'
      ) {
        let newAnswers = questionMap.get('answers', List());
        const questionId = newAnswers.get('questionId');

        if (questionId) newAnswers = newAnswers.getIn(['answers', 'answers']);
        if (newAnswers) {
          newAnswers = newAnswers.map(ans => {
            const newAns = getCountriesNameForCode(ans.get('answer', List()));
            return ans.set('answer', newAns);
          });
          questionMap = questionMap.set('answers', newAnswers);
        }
      }
      // END of copied Logic
      return questionMap;
    } catch (error) {
      console.error(error);
      return questionMap;
    }
  };

  const FallbackComponent = () => {
    return <div>Question type not found</div>;
  };

  const trackMatomoEventSubmitAnswer = answer => {
    const {
      section,
      questionText,
      questionHTML,
      questionJSON,
      questionHintJSON,
      questionId
    } = question;
    const { sectionName } = section;
    const proposalDetail = opportunityData?.proposal?.proposalDetails;
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval Question: ${questionText} (${sectionName}) (${approvalSectionTitle})`,
      name: `Answer: ${answer}`,
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
            proposalDetail,
            approvalSectionTitle
          })
        }
      ]
    });
  };

  const renderQuestion = () => {
    const lastAnswer = getLastAnswer(question);

    const checkDisableFlag = () => locked;
    const inputProps = {
      question,
      lastAnswer,
      disabled,
      userData: getUserData(),
      socketContext,
      trackMatomoEventSubmitAnswer,
      checkDisableFlag
    };
    if (
      inputProps.lastAnswer &&
      inputProps.lastAnswer.userName === 'UnityPredictedAnswer'
    ) {
      trackMatomoEventSubmitAnswer(inputProps.lastAnswer.answer);
    }
    if (question?.section?.sectionName === 'Proposal Team') {
      return <ProposalTeamQuestion {...inputProps} />;
    }

    if (
      !Object.values(ANSWER_TYPES).includes(question?.answerConfiguration?.type)
    ) {
      return <FallbackComponent />;
    }

    switch (question?.answerConfiguration?.type) {
      case ANSWER_TYPES.TEXT: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <TextQuestion {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.NUMBER: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <NumberQuestion {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.DATE: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <DateQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.RADIO: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <RadioQuestion {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.SELECT:
      case ANSWER_TYPES.SELECT_LOOKUP: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <SelectQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.PICKLIST_LOOKUP:
      case ANSWER_TYPES.PICKLIST: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <MultiSelectQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.YES_NO: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <YesNoQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.CHECKBOX: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <CheckBoxQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      default:
        return <FallbackComponent />;
    }
  };

  const questionRender = useMemo(
    () =>
      isShowQuestion ? (
        <>
          <Box
            data-testid="question-item-id"
            mt={2}
            className={classNames({
              'question-active':
                currentSearchResult !== null &&
                currentSearchResult.searchIndex === highlightQuestionId
            })}
          >
            <Grid container>
              <Grid item xs={10} className="ques-title-cover">
                <span ref={questionTextRef}>
                  <QuestionLabel questionLabel={question?.questionText || ''} />
                </span>
                {locked ? (
                  <Typography variant="subtitle1" className="status-txt">
                    {activeQuestionInfo.questionLockInfo?.userName} is typing...
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={2}>
                {' '}
              </Grid>
              <Grid item xs={10} className="answer-input">
                {renderQuestion()}
              </Grid>
              <Grid item xs={2} className="answer-actions">
                <IconButton
                  size="small"
                  onClick={() => {
                    setIsShowHistory(true);
                  }}
                >
                  <CalendarIcon question={question} />
                </IconButton>
                {!isQuesFreezed && (
                  <CustomLoader questionId={question.questionId} />
                )}
              </Grid>
            </Grid>
          </Box>

          {/* Answer History Component */}
          {isShowHistory && (
            <AnswerHistory
              question={prepareAnswerHistoryData(question)}
              tab="Approval"
              isQuesFreezed={!!isQuesFreezed}
              closeModal={() => {
                setIsShowHistory(false);
              }}
            />
          )}
        </>
      ) : null,
    [
      question,
      isShowHistory,
      isShowQuestion,
      approvalFilters,
      currentSearchResult,
      highlightQuestionId,
      locked
    ]
  );

  // Component will return null in case of empty question value
  if (isEmpty(question)) return null;

  return questionRender;
};

QuestionItem.defaultProps = {
  disabled: false,
  isQuesFreezed: false,
  archivedQuestion: {
    proposalId: '',
    questionId: '',
    questionText: '',
    answerConfiguration: {
      type: 'number'
    },
    answers: [],
    visible: false,
    active: false
  },
  updateQuestionVisibility: () => { }
};
QuestionItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  approvalSectionTitle: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  isQuesFreezed: PropTypes.any,
  eventCategories: PropTypes.object.isRequired,
  trackEvent: PropTypes.func.isRequired,
  archivedQuestion: PropTypes.any,
  updateQuestionVisibility: PropTypes.func
};

export default MatomoHOC(QuestionItem);
