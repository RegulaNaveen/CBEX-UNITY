import React from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';
import ANSWER_TYPES from '../../../../constants/answerTypes';
import {
  getCountriesNameForCode,
  getCountryOptions
} from '../../../../utils/utils';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const MultiSelectQuestion = ({
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer
}) => {
  try {
    const dispatch = useDispatch();
    const questionType = question?.answerConfiguration?.type;
    const sfObject = question?.sfObject;
    const sfField = question?.sfField;
    let finalOptions = question?.answerConfiguration?.options;
    let answerValue =
      isEmpty(lastAnswer.answer) || lastAnswer.answer === 'N/A'
        ? []
        : lastAnswer.answer;

    // Special logic for Targeted_Countries__c sfField
    if (
      (questionType === ANSWER_TYPES.PICKLIST ||
        questionType === ANSWER_TYPES.PICKLIST_LOOKUP) &&
      (sfObject === 'Bid_History__c' ||
        sfObject === 'Apttus__APTS_Agreement__c') &&
      sfField === 'Targeted_Countries__c'
    ) {
      answerValue = getCountriesNameForCode(answerValue || []);
      finalOptions = getCountryOptions();
    }

    const changeHandler = textValue => {
      const { proposalId, questionId } = question;
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          textValue,
          userData
        )
      );
      trackMatomoEventSubmitAnswer(textValue);
    };

    return (
      <AutoCompleteWithAddOption
        sfObject={sfObject}
        sfField={sfField}
        lov={finalOptions}
        onFocus={() => {}}
        onBlur={() => {}}
        disabled={false}
        multiple
        answer={answerValue}
        onChange={changeHandler}
      />
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering Multi select question</p>;
  }
};

export default MultiSelectQuestion;
