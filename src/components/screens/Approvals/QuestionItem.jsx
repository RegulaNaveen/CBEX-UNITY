import React, { useEffect, useState } from 'react';
import Grid from 'apollo-react/components/Grid';
import Box from 'apollo-react/components/Box';
import { Map, List, fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import CalendarIcon from './CalendarIcon';
import QuestionLabel from './QuestionLabel';
import AnswerHistory from '../../views/modals/AnswerHistory';
import ANSWER_TYPES from '../../../constants/answerTypes';
import { getCountriesNameForCode } from '../../../utils/utils';

const QuestionItem = ({ question }) => {
  const [isShowHistory, setIsShowHistory] = useState(false);

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

  return isEmpty(question) ? (
    <>Question data Empty</>
  ) : (
    <div>
      <Box mt={2}>
        <QuestionLabel questionLabel={question?.questionText || ''} />
        <Grid container spacing={2}>
          <Grid item xs={11}>
            question item
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
