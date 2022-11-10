import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import TextArea from '../../../common/atoms/inputs/TextArea';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';
import { SocketContext } from '../../../../context/SocketContext';
import {
  getUserName,
  getUserEmail,
  getUserId
} from '../../../../SessionHandler';

const NumberQuestion = ({ question, lastAnswer }) => {
  const context = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleTextChange = (textValue, lastAnswer, editorData) => {
    const { proposalId, questionId } = question;
    const userData = {
      email: getUserName(),
      name: getUserEmail(),
      role: getUserId()
    };
    const s1 = textValue
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);
    const s2 = lastAnswer
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);

    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (
        s1.length !== s2.length ||
        s1.join(' ').trim() !== s2.join(' ').trim()
      ) {
        dispatch(
          setProposalAnswerData(
            context,
            proposalId,
            questionId,
            String(textValue).trim(),
            userData,
            editorData
          )
        );
      }
    } else if (!textValue.trim() && lastAnswer.trim()) {
      dispatch(
        setProposalAnswerData(
          context,
          proposalId,
          questionId,
          ' ',
          userData,
          editorData
        )
      );
    }
  };
  return (
    <>
      <TextArea
        className="proposal-text-area"
        type="number"
        value={lastAnswer.answer}
        onBlur={handleTextChange}
      />
    </>
  );
};

export default NumberQuestion;
