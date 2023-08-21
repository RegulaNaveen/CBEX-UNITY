import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBoxQuestions from '../../../common/atoms/inputs/CheckBoxQuestions';
import ANSWER_TYPES from '../../../../constants/answerTypes';
import {
  getCountriesNameForCode,
  getCountryOptions
} from '../../../../utils/utils';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const CheckBoxQuestion = ({
  question,
  lastAnswer,
  disabled,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag,
  toggleWatch,
  onCascadeChange,
  forceBlur
}) => {
  try {
    const dispatch = useDispatch();
    const { questionLockWrapper, questionUnlockWrapper } = socketContext;
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

    const changeHandler = async textValue => {
      try {
        const { proposalId, questionId } = question;
        await dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            textValue,
            userData
          )
        );
        questionUnlockWrapper(question?.questionId);
        trackMatomoEventSubmitAnswer(textValue);
      } catch (error) {
        console.error(error);
        questionUnlockWrapper(question?.questionId);
      }
    };

    return (
      <div className="checkboxtype">
        <CheckBoxQuestions
          answerValue={answerValue}
          finalOptions={finalOptions}
          disabled={checkDisableFlag() || !!disabled}
          onOpen={() => {
            questionLockWrapper(question?.questionId);
          }}
          onClose={() => {
            questionUnlockWrapper(question?.questionId);
          }}
          onChange={e => changeHandler(e)}
          sfField={sfField}
          sfObject={sfObject}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering CheckBoxQuestion</p>;
  }
};

CheckBoxQuestion.defaultProps = {
  disabled: false,
  toggleWatch: () => {},
  onCascadeChange: () => {},
  forceBlur: false
};
CheckBoxQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired,
  toggleWatch: PropTypes.func,
  onCascadeChange: PropTypes.func,
  forceBlur: PropTypes.boo
};

export default CheckBoxQuestion;
