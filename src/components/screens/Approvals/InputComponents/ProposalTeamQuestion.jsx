import React from 'react';
import { useDispatch } from 'react-redux';
import xor from 'lodash/xor';
import AutoComplete from '../../../common/atoms/inputs/AutoComplete';
import {
  setProposalAnswerData,
  deleteProposalUserFromDB
} from '../../../../redux/actions/proposal-actions';

const ProposalTeamQuestion = ({
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag
}) => {
  try {
    const dispatch = useDispatch();
    const { questionLockWrapper, questionUnlockWrapper } = socketContext;
    const handleAnswerChange = (textValue, lastValue, reason) => {
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
    };

    return (
      <>
        <AutoComplete
          sectionName={question.section?.sectionName}
          onFocus={() => {
            questionLockWrapper(question?.questionId);
          }}
          onBlur={() => {
            questionUnlockWrapper(question?.questionId);
          }}
          onChange={handleAnswerChange}
          text={lastAnswer.answer || ''}
          disabled={checkDisableFlag()}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering Proposal Team question</p>;
  }
};

export default ProposalTeamQuestion;
