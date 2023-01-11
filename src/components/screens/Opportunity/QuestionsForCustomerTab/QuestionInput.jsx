import { isEmpty, isEqual } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editProposalQuestion,
  setProposalQuestion,
} from '../../../../redux/actions/proposal-actions';
import { getSelectedBid } from '../../../../redux/selectors';
import CustomApolloRichText from '../../../common/CustomApolloRichText';

const QuestionInput = ({
  question,
  userData,
  socketContext,
  checkDisableFlag,
  setShowLoader,
  questionIndex,
}) => {
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();

  const quesTextInnerLeftRef = React.createRef();
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;

  const getConvertedAnsString = (str) =>
    !String(str).trim() ? '' : String(str).trim();

  let richTextData = {
    html: question?.questionHTML,
    value: question?.questionJSON
      ? JSON.parse(question.questionJSON)
      : { blocks: [] },
    htmlExport: '',
  };

  const handleRichTextChange = async (editorData) => {
    const proposalId = selectedBid.get('id');
    const section = {
      sectionOrder: 199,
      sectionName: 'Quick Questions for the Customer',
    };
    const answerType = 'text';
    const roleNames = ['Business Developer'];
    const { value, html, text, htmlExport } = editorData;

    const questionData = {
      proposalId,
      questionText: text,
      questionJSON: value ? JSON.stringify(value) : '',
      questionHTML: html,
      section,
      answerType,
      options: [],
      roleNames,
    };
    if (question?.isNewEntry) {
      setShowLoader(true);
      await dispatch(setProposalQuestion(proposalId, questionData));
      setShowLoader(false);
      questionUnlockWrapper(question?.questionId);
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

  const richTextAnswerField = {
    questionId: question.questionId,
    richTextString: getConvertedAnsString(question.questionText),
    richTextVal: richTextData.value,
    richTextHtml: richTextData.html,
    richTextHtmlExport: '',
    disabled: checkDisableFlag(),
    enableFocus: true,
    isEditable: false,

    onBlur: (data) => {
      quesTextInnerLeftRef.current.style.marginTop = 'inherit';
      let saveDate = false;
      const previousAnsText = getConvertedAnsString(
        question.questionText
      ).trim();

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
      }
      questionUnlockWrapper(question?.questionId);
    },
    onFocus: () => {
      quesTextInnerLeftRef.current.style.marginTop = '25px';
      questionLockWrapper(question?.questionId);
    },
  };

  return (
    <>
      <div className="input-wrapper " ref={quesTextInnerLeftRef}>
        <span className="input-label">Q{questionIndex}:</span>
        <CustomApolloRichText {...richTextAnswerField} />
      </div>
    </>
  );
};

export default QuestionInput;
