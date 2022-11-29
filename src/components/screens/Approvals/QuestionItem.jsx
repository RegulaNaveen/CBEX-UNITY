import React, { useContext, useMemo, useState } from 'react';
import Grid from 'apollo-react/components/Grid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Box from 'apollo-react/components/Box';
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
import { getLastAnswer } from './utils';

const QuestionItem = ({
  question = {},
  approvalSectionTitle = '',
  disabled,
  eventCategories,
  trackEvent
}) => {
  const socketContext = useContext(SocketContext);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const proposalId = selectedBid?.id;
  const opportunityData = allOppData[proposalId];

  const getUserData = () => ({
    email: getUserName(),
    name: getUserEmail(),
    role: getUserId()
  });

  const prepareAnswerHistoryData = questionData => {
    let questionMap = fromJS(questionData);

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
    const isQuestionLocked = () => {
      return question?.questionLockInfo && question?.questionLockInfo?.userInfo;
    };

    const isQuestionLockedByOther = () => {
      return (
        isQuestionLocked() &&
        getUserEmail() !== question?.questionLockInfo?.userInfo
      );
    };

    const checkDisableFlag = () => {
      if (isQuestionLockedByOther()) return true;

      return false;
    };
    const inputProps = {
      question,
      lastAnswer,
      disabled,
      userData: getUserData(),
      socketContext,
      trackMatomoEventSubmitAnswer,
      checkDisableFlag
    };

    if (question?.section?.sectionName === 'Proposal Team') {
      return <ProposalTeamQuestion {...inputProps} />;
    }

    const ComponentMapper = {
      [ANSWER_TYPES.TEXT]: <TextQuestion {...inputProps} />,
      [ANSWER_TYPES.NUMBER]: <NumberQuestion {...inputProps} />,
      [ANSWER_TYPES.DATE]: <DateQuestion {...inputProps} />,
      [ANSWER_TYPES.RADIO]: <RadioQuestion {...inputProps} />,
      [ANSWER_TYPES.SELECT_LOOKUP]: <SelectQuestion {...inputProps} />,
      [ANSWER_TYPES.SELECT]: <SelectQuestion {...inputProps} />,
      [ANSWER_TYPES.PICKLIST]: <MultiSelectQuestion {...inputProps} />,
      [ANSWER_TYPES.PICKLIST_LOOKUP]: <MultiSelectQuestion {...inputProps} />,
      [ANSWER_TYPES.YES_NO]: <YesNoQuestion {...inputProps} />,
      [ANSWER_TYPES.CHECKBOX]: <CheckBoxQuestion {...inputProps} />
    };

    const SFNestedAnswerItem = () => {
      return (
        <SFAnswerValidationWrapper
          hasDifferentSFanswer={question.hasDifferentSFanswer}
          sfObject={question.sfObject}
        >
          {ComponentMapper[question?.answerConfiguration?.type]}
        </SFAnswerValidationWrapper>
      );
    };

    return ComponentMapper[question?.answerConfiguration?.type] ? (
      <SFNestedAnswerItem />
    ) : (
      <FallbackComponent />
    );
  };

  return useMemo(
    () =>
      !isEmpty(question) && (
        <>
          <Box mt={2}>
            <Grid container>
              <Grid item xs={10} className="ques-title-cover">
                <QuestionLabel questionLabel={question?.questionText || ''} />
              </Grid>
              <Grid item xs={2} className="answer-actions">
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
                <CustomLoader questionId={question.questionId} />
              </Grid>
            </Grid>
          </Box>
          {isShowHistory && (
            <AnswerHistory
              question={prepareAnswerHistoryData(question)}
              tab="Approval"
              closeModal={() => {
                setIsShowHistory(false);
              }}
            />
          )}
        </>
      ),
    [question, isShowHistory]
  );
};

QuestionItem.defaultProps = {
  disabled: false
};
QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  approvalSectionTitle: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  eventCategories: PropTypes.object.isRequired,
  trackEvent: PropTypes.func.isRequired
};

export default MatomoHOC(QuestionItem);
