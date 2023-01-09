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
}) => {
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();

  const quesTextInnerLeftRef = React.createRef();
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;

  const getConvertedAnsString = (str) =>
    !String(str).trim() ? '' : String(str).trim();

  // const lastAnswerJS = lastAnswer?.toJS();
  // const formattedAnswer =
  //   has(lastAnswerJS, 'formattedAnswer') && lastAnswerJS.formattedAnswer;

  // const parseFormattedData =
  //   !formattedAnswer || isObject(formattedAnswer)
  //     ? formattedAnswer
  //     : parseStringifyJson(formattedAnswer);

  let richTextData = {
    html: '',
    value: { blocks: [] },
    htmlExport: '',
  };

  // if (!richTextData.htmlExport && richTextData.html) {
  //   richTextData.htmlExport = richTextData.html;
  // }

  const handleRichTextChange = (editorData) => {
    const proposalId = selectedBid.get('id');
    const section = {
      sectionOrder: 199,
      sectionName: 'Quick questions for the Customer',
    };
    const answerType = 'text';
    const roleNames = ['Business Developer'];

    // const { setProposalAnswer, questionId, userData } = this.props;
    const { value, html, text, htmlExport } = editorData;

    // if (isEmpty(text)) this.setState({ changeIcon: '#b7b7b7' });
    // else this.setState({ changeIcon: '#00c221' });

    const editorText = text.trim() || ' ';

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
    if (question.isNewEntry) {
      console.log({ questionData });
      dispatch(setProposalQuestion(proposalId, questionData));
      questionUnlockWrapper(question?.questionId);
    } else {
      dispatch(
        editProposalQuestion(proposalId, question.questionId, questionData)
      );
      questionUnlockWrapper(question?.questionId);
      console.log({ questionData });
    }
  };

  const richTextAnswerField = {
    questionId: question.questionId,
    richTextString: getConvertedAnsString(question.questionText),
    richTextVal: question.questionJSON ? JSON.parse(question.questionJSON) : '',
    richTextHtml: question.questionHTML,
    // richTextHtmlExport: question.htmlExport,
    disabled: checkDisableFlag(),
    enableFocus: true,
    isEditable: true,
    placeholder: '',

    onFocus: () => {
      quesTextInnerLeftRef.current.style.marginTop = '25px';
      questionLockWrapper(question?.questionId);
    },
    onBlur: (data) => {
      console.log('tapas question obj ', question);
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
          console.log(
            'prevAnswerBlocks, answerBlocks ',
            prevAnswerBlocks,
            answerBlocks
          );
        }
        //  else if (isEmpty(richTextData.value?.blocks)) {
        //   saveDate = false;
        // }
        else saveDate = true;
      }
      // save the data if we see any text difference.
      else if (previousAnsText !== data.text.trim() && data.text.trim() !== '')
        saveDate = true;
      // save the data if user removes the whole answer.
      else if (previousAnsText !== '' && data.text.trim() === '')
        saveDate = true;

      if (saveDate) {
        handleRichTextChange(data);
        console.log('inside save data ', data);
      }
      // this.context.questionUnlockWrapper(this.props.questionId);
      questionUnlockWrapper(question?.questionId);
    },
  };

  return (
    <>
      <div className="input-wrapper " ref={quesTextInnerLeftRef}>
        <span className="input-label">Q{question.questionOrder}:</span>
        <CustomApolloRichText {...richTextAnswerField} />
      </div>
    </>
  );
};

export default QuestionInput;
