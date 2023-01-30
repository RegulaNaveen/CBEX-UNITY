import { isEmpty, isEqual } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProposalQuestion,
  setProposalQuestion
} from '../../../../redux/actions/proposal-actions';
import { getSelectedBid } from '../../../../redux/selectors';
import { getCanUserTagInQuestion } from '../../../../redux/selectors/proposal';
import CustomApolloRichText from '../../../common/CustomApolloRichText';

const QuestionInput = ({
  question,
  userData,
  socketContext,
  checkDisableFlag,
  setShowLoader,
  questionIndex,
  setNewEntry
}) => {
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();

  const quesTextInnerLeftRef = React.createRef();
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;

  const answerValue = question?.questionText || '';
  const canUserTagInQuestion = useSelector(getCanUserTagInQuestion);

  const getConvertedAnsString = str =>
    !String(str).trim() ? '' : String(str).trim();

  let richTextData = {
    html: question?.questionHTML,
    value: question?.questionJSON
      ? JSON.parse(question.questionJSON)
      : { blocks: [] },
    htmlExport: ''
  };

  const handleRichTextChange = async editorData => {
    const proposalId = selectedBid.get('id');
    const section = {
      sectionOrder: 199,
      sectionName: 'Questions_for_the_Customer_left_panel'
    };
    const answerType = 'text';
    const roleNames = ['Business Developer'];
    const { value, html, text, htmlExport } = editorData;

    const questionData = {
      proposalId,
      questionText: text,
      questionJSON: value ? JSON.stringify(value) : '',
      questionHTML: htmlExport,
      section,
      answerType,
      options: [],
      roleNames
    };
    if (question?.isNewEntry) {
      setShowLoader(true);
      questionUnlockWrapper(question?.questionId);
      setNewEntry(null);
      await dispatch(
        setProposalQuestion(proposalId, questionData, socketContext)
      );

      setShowLoader(false);
    } else {
      setShowLoader(true);
      await dispatch(
        editProposalQuestion(
          proposalId,
          question.questionId,
          questionData,
          socketContext
        )
      );
      setShowLoader(false);
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

    onBlur: data => {
      let saveDate = false;
      const previousAnsText = getConvertedAnsString(answerValue).trim();
      quesTextInnerLeftRef.current.style.marginTop = 'inherit';

      // save the formatting change
      if (
        !isEqual(richTextData.value, data.value) &&
        !isEmpty(data.text.trim())
      ) {
        const prevAnswerBlocks = richTextData.value.blocks.filter(
          block => block.text.length > 0
        );
        const answerBlocks = data.value.blocks.filter(
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

      if (data.text.trim() === '') saveDate = false;

      if (saveDate) {
        handleRichTextChange(data);
      } else {
        questionUnlockWrapper(question?.questionId);
      }
    },
    onFocus: () => {
      quesTextInnerLeftRef.current.style.marginTop = '25px';

      questionLockWrapper(question?.questionId);
    }
  };

  return (
    <>
      <div className="input-wrapper" ref={quesTextInnerLeftRef} data-testid="question-input">
        <span className="input-label">Q{question?.questionOrder}:</span>
        <CustomApolloRichText {...richtextProps} />
      </div>
    </>
  );
};

export default QuestionInput;
