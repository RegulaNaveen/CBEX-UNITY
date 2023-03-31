import { has, isEmpty, isEqual, isObject } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';
import {
  getCanUserTagInQuestion,
  getfetchAllFlags
} from '../../../../redux/selectors/proposal';
import { parseStringifyJson } from '../../../../utils/helpers';
import CustomApolloRichText from '../../../common/CustomApolloRichText';
import { getLastAnswer } from '../../Approvals/utils';

const AnswerInput = ({
  question,
  userData,
  socketContext,
  checkDisableFlag,
  setShowLoader,
  questionIndex,
  setLastSetQuestionData
}) => {
  const dispatch = useDispatch();
  const quesTextInnerLeftRef = React.createRef();

  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const lastAnswer = getLastAnswer(question);
  const answerValue = lastAnswer.answer || '';
  const formattedAnswer =
    has(lastAnswer, 'formattedAnswer') && lastAnswer.formattedAnswer;

  const canUserTagInQuestion = useSelector(getCanUserTagInQuestion);
  const allFlags = useSelector(getfetchAllFlags);

  const parseFormattedData =
    !formattedAnswer || isObject(formattedAnswer)
      ? formattedAnswer
      : parseStringifyJson(formattedAnswer);

  const richTextData = parseFormattedData || {
    html: '',
    value: { blocks: [] }
  };

  // Function to converted Answer String
  const getConvertedAnsString = str =>
    !String(str).trim() ? '' : String(str).trim();

  const handleRichTextChange = async editorData => {
    try {
      const { proposalId, questionId } = question;
      const { value, html, text, htmlExport } = editorData;

      const editorText = text.trim() || ' ';

      setShowLoader(true);
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
            htmlExport
          },
          true
        )
      );
      setShowLoader(false);
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
    disabled: checkDisableFlag() || !question?.questionText,
    canUserTagInQuestion,
    allFlags,

    onBlur: data => {
      let saveDate = false;
      const previousAnsText = getConvertedAnsString(answerValue).trim();
      if (
        quesTextInnerLeftRef &&
        quesTextInnerLeftRef.current &&
        quesTextInnerLeftRef.current.style
      ) {
        quesTextInnerLeftRef.current.style.marginTop = 'inherit';
      }
      // save the formatting change
      if (
        !isEqual(richTextData.value, data.value) &&
        !isEmpty(data.text.trim())
      ) {
        let prevAnswerBlocks = richTextData.value.blocks.filter(
          block => block.text.length > 0
        );
        let answerBlocks = data.value.blocks.filter(
          block => block.text.length > 0
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
      setLastSetQuestionData({});
      quesTextInnerLeftRef.current.style.marginTop = '25px';
      questionLockWrapper(question?.questionId);
    }
  };
  return (
    <>
      <div className="input-wrapper " ref={quesTextInnerLeftRef}>
        <span className="input-label">A{questionIndex}:</span>
        <CustomApolloRichText {...richtextProps} isQuestionCustomerTab />
      </div>
    </>
  );
};

export default AnswerInput;
