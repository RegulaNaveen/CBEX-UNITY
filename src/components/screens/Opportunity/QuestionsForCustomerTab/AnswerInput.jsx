import { has, isEmpty, isEqual, isObject } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';
import { setProposalAnswer } from '../../../../redux/selectors';
import { getCanUserTagInQuestion } from '../../../../redux/selectors/proposal';
import { parseStringifyJson } from '../../../../utils/helpers';
import CustomApolloRichText from '../../../common/CustomApolloRichText';
import { getLastAnswer } from '../../Approvals/utils';

const AnswerInput = ({
  question,
  userData,
  socketContext,
  checkDisableFlag,
}) => {
  const dispatch = useDispatch();
  const quesTextInnerLeftRef = React.createRef();
  console.log({ socketContext });
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const lastAnswer = getLastAnswer(question);
  const answerValue = lastAnswer.answer || '';
  const formattedAnswer =
    has(lastAnswer, 'formattedAnswer') && lastAnswer.formattedAnswer;
  // const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const canUserTagInQuestion = useSelector(getCanUserTagInQuestion);

  const parseFormattedData =
    !formattedAnswer || isObject(formattedAnswer)
      ? formattedAnswer
      : parseStringifyJson(formattedAnswer);

  const richTextData = parseFormattedData || {
    html: '',
    value: { blocks: [] },
  };

  // Function to converted Answer String
  const getConvertedAnsString = (str) =>
    !String(str).trim() ? '' : String(str).trim();

  const handleRichTextChange = async (editorData) => {
    try {
      const { proposalId, questionId } = question;
      const { value, html, text } = editorData;
      const editorText = text.trim() || ' ';
      await dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          String(editorText),
          userData,
          {
            value,
            html,
          },
          true
        )
      );
      questionUnlockWrapper(question?.questionId);
    } catch (error) {
      console.error(error);
      questionUnlockWrapper(question?.questionId);
    }
  };

  const richtextProps = {
    richTextString: getConvertedAnsString(answerValue),
    richTextVal: richTextData.value,
    richTextHtml: richTextData.html,
    enableFocus: true,
    isEditable: false,
    disabled: checkDisableFlag(),
    canUserTagInQuestion,

    onBlur: (data) => {
      let saveDate = false;
      const previousAnsText = getConvertedAnsString(answerValue).trim();
      quesTextInnerLeftRef.current.style.marginTop = 'inherit';
      // save the formatting change
      if (
        !isEqual(richTextData.value, data.value) &&
        !isEmpty(data.text.trim())
      ) {
        let prevAnswerBlocks = richTextData.value.blocks.filter(
          (block) => block.text.length > 0
        );
        let answerBlocks = data.value.blocks.filter(
          (block) => block.text.length > 0
        );
        if (isEqual(prevAnswerBlocks, answerBlocks)) {
          saveDate = false;
        } else if (
          isEmpty(richTextData.value?.blocks) &&
          previousAnsText === data.text.trim()
        ) {
          saveDate = false;
        } else saveDate = true;
      }
      // save the data if we see any text difference.
      else if (previousAnsText !== data.text.trim() && data.text.trim() !== '')
        saveDate = true;
      // save the data if user removes the whole answer.
      else if (previousAnsText !== '' && data.text.trim() === '')
        saveDate = true;

      if (saveDate) {
        handleRichTextChange(data);
      } else {
        questionUnlockWrapper(question?.questionId);
      }
    },
    onFocus: () => {
      question?.questionId;
      quesTextInnerLeftRef.current.style.marginTop = '25px';
      questionLockWrapper(question?.questionId);
    },
  };
  return (
    <>
      <div className="input-wrapper " ref={quesTextInnerLeftRef}>
        <span className="input-label">A{question.questionOrder}:</span>
        <CustomApolloRichText {...richtextProps} />
      </div>
    </>
  );
};

export default AnswerInput;
