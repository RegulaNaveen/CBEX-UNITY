import React from 'react';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';
import ANSWER_TYPES from '../../../../constants/answerTypes';
import {
  getCountriesNameForCode,
  getCountryOptions
} from '../../../../utils/utils';

const MultiSelectQuestion = ({ question }) => {
  const questionType = question?.answerConfiguration?.type;
  const sfObject = question?.sfObject;
  const sfField = question?.sfField;
  let finalOptions = question?.answerConfiguration?.options;
  if (
    (questionType === ANSWER_TYPES.PICKLIST ||
      questionType === ANSWER_TYPES.PICKLIST_LOOKUP) &&
    (sfObject === 'Bid_History__c' ||
      sfObject === 'Apttus__APTS_Agreement__c') &&
    sfField === 'Targeted_Countries__c'
  ) {
    // answerValueComplex = getCountriesNameForCode(answerValueComplex || []);
    finalOptions = getCountryOptions();
  }

  return (
    <AutoCompleteWithAddOption
      sfObject={question.sfObject}
      sfField={question.sfField}
      lov={finalOptions}
      onFocus={() => {}}
      onBlur={() => {}}
      disabled={false}
      multiple
      // answer={answerValue}
      // onChange={this.handlePropsalChange}
    />
  );
};

export default MultiSelectQuestion;
