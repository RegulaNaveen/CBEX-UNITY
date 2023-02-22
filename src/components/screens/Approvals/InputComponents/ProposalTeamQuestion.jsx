import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import xor from 'lodash/xor';
import AutoComplete from '../../../common/atoms/inputs/AutoComplete';
import {
  setProposalAnswerData,
  deleteProposalUserFromDB
} from '../../../../redux/actions/proposal-actions';

const ProposalTeamQuestion = ({
  question,
  lastAnswer,
  disabled,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag
}) => {
  try {
    const dispatch = useDispatch();
    const { questionLockWrapper, questionUnlockWrapper } = socketContext;
    const handleAnswerChange = async (textValue, lastValue, reason) => {
      try {
        const { proposalId, questionId, section } = question;
        const { sectionName, sectionOrder } = section;
        dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            textValue,
            userData
          )
        ).then(() => {
          questionUnlockWrapper(question?.questionId);
          const [deletedVal] = xor(
            textValue?.trim() ? textValue?.trim().split(',') : [],
            lastValue?.trim() ? lastValue?.trim().split(',') : []
          );
          const [deletedEmail] = String(deletedVal).match(
            /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
          );
          if (reason === 'remove-option' && deletedEmail) {
            dispatch(
              deleteProposalUserFromDB(
                proposalId,
                deletedEmail,
                sectionOrder,
                sectionName
              )
            );
          }
        });
        trackMatomoEventSubmitAnswer(textValue);
      } catch (error) {
        console.error(error);
        questionUnlockWrapper(question?.questionId);
      }
    };

    return (
      <>
        <AutoComplete
          data-testid="proposal-team-section-id"
          sectionName={question.section?.sectionName}
          onFocus={() => {
            questionLockWrapper(question?.questionId);
          }}
          onBlur={() => {
            questionUnlockWrapper(question?.questionId);
          }}
          onChange={handleAnswerChange}
          text={lastAnswer.answer || ''}
          disabled={checkDisableFlag() || !!disabled}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering Proposal Team question</p>;
  }
};

ProposalTeamQuestion.defaultProps = {
  disabled: false
};
ProposalTeamQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default ProposalTeamQuestion;
