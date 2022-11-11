import React, { useContext, useState } from 'react';
import Grid from 'apollo-react/components/Grid';
import Box from 'apollo-react/components/Box';
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
import ProposalTeamQuestion from './InputComponents/ProposalTeamQuestion';
import getLastAnswer from './getLastAnswer';
import { getUserName, getUserEmail, getUserId } from '../../../SessionHandler';
import { SocketContext } from '../../../context/SocketContext';
import SFAnswerValidationWrapper from '../../common/SFAnswerValidationWrapper';

const QuestionItem = ({ question }) => {
  const socketContext = useContext(SocketContext);
  const [isShowHistory, setIsShowHistory] = useState(false);
  const getUserData = () => ({
    email: getUserName(),
    name: getUserEmail(),
    role: getUserId()
  });

  const prepareAnswerHistoryData = question => {
    let questionMap = fromJS(question);

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
  const renderQuestion = () => {
    const lastAnswer = getLastAnswer(question);
    const inputProps = {
      question,
      lastAnswer,
      userData: getUserData(),
      socketContext
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
      [ANSWER_TYPES.YES_NO]: <YesNoQuestion {...inputProps} />
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

  return isEmpty(question) ? (
    <></>
  ) : (
    <div>
      <Box mt={2}>
        <QuestionLabel questionLabel={question?.questionText || ''} />
        <Grid container spacing={2}>
          <Grid item xs={11}>
            {renderQuestion()}
          </Grid>
          <Grid item xs={1}>
            <div
              onClick={() => {
                setIsShowHistory(true);
              }}
            >
              <CalendarIcon />
            </div>
          </Grid>
        </Grid>
      </Box>
      {isShowHistory && (
        <AnswerHistory
          question={prepareAnswerHistoryData(question)}
          closeModal={() => {
            setIsShowHistory(false);
          }}
        />
      )}
    </div>
  );
};

export default QuestionItem;
