import React from 'react';
import isEmpty from 'lodash/isEmpty';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';
import ANSWER_TYPES from '../../../../constants/answerTypes';
import {
  getCountriesNameForCode,
  getCountryOptions
} from '../../../../utils/utils';

const MultiSelectQuestion = ({ question, lastAnswer }) => {
  try {
    const questionType = question?.answerConfiguration?.type;
    const sfObject = question?.sfObject;
    const sfField = question?.sfField;
    let finalOptions = question?.answerConfiguration?.options;
    let answerValue = isEmpty(lastAnswer.answer) ? [] : lastAnswer.answer;

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
        // onChange={this.handlePropsalChange}
      />
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering Multi select question</p>;
  }
};

export default MultiSelectQuestion;
