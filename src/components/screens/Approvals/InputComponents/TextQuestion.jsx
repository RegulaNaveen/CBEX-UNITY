import React from 'react';
import { useDispatch } from 'react-redux';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import CustomApolloRichText from '../../../common/CustomApolloRichText';
import { parseStringifyJson } from '../../../../utils/helpers';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

// Function to converted Answer String
const getConvertedAnsString = str =>
  !String(str).trim() ? '' : String(str).trim();

const TextQuestion = ({
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer
}) => {
  const dispatch = useDispatch();
  const answerValue = lastAnswer.answer || '';
  const formattedAnswer =
    has(lastAnswer, 'formattedAnswer') && lastAnswer.formattedAnswer;
  const { questionLockWrappers, questionUnlockWrapper } = socketContext;

  const parseFormattedData =
    !formattedAnswer || isObject(formattedAnswer)
      ? formattedAnswer
      : parseStringifyJson(formattedAnswer);

  const richTextData = parseFormattedData || {
    html: '',
    value: { blocks: [] }
  };

  const checkDisableFlag = () => {
    if (socketContext.isQuestionLockedByOther()) return true;
    // if (NaLoading) return true;

    // return (
    //   checkNonEditableFields(noneditableField, sfField, sfObject) ||
    //   !isCurrentBid
    // );
  };

  const handleRichTextChange = editorData => {
    const { proposalId, questionId } = question;
    const { value, html, text } = editorData;

    const editorText = text.trim() || ' ';

    dispatch(
      setProposalAnswerData(
        socketContext,
        proposalId,
        questionId,
        String(editorText),
        userData,
        {
          value,
          html
        },
        true
      )
    );
    trackMatomoEventSubmitAnswer(editorData.text);
  };

  const richtextProps = {
    richTextString: getConvertedAnsString(answerValue),
    richTextVal: richTextData.value,
    richTextHtml: richTextData.html,
    enableFocus: true,
    isEditable: false,
    disabled: checkDisableFlag,
    onBlur: data => {
      let saveDate = false;
      const previousAnsText = getConvertedAnsString(answerValue).trim();

      // save the formatting change
      if (
        !isEqual(richTextData.value, data.value) &&
        !isEmpty(data.text.trim())
      )
        if (
          isEmpty(richTextData.value?.blocks) &&
          lastAnswer?.answer === data.value?.blocks[0]?.text
        )
          saveDate = false;
        else saveDate = true;
      // save the data if we see any text difference.
      else if (previousAnsText !== data.text.trim() && data.text.trim() !== '')
        saveDate = true;
      // save the data if user removes the whole answer.
      else if (previousAnsText !== '' && data.text.trim() === '')
        saveDate = true;

      if (saveDate) {
        handleRichTextChange(data);
      }
      questionUnlockWrapper(question?.questionId);
    },
    onfocus: () => {
      questionLockWrappers(question?.questionId);
    }
  };
  return (
    <>
      <CustomApolloRichText {...richtextProps} />
    </>
  );
};

export default TextQuestion;
