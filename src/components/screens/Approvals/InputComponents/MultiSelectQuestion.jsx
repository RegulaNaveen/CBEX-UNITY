import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  disabled,
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
    let answerValue = Array.isArray(lastAnswer.answer) ? lastAnswer.answer : [];

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
          userData,
          null,
          true
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
        disabled={!!disabled}
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

MultiSelectQuestion.defaultProps = {
  disabled: false
};
MultiSelectQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default MultiSelectQuestion;
