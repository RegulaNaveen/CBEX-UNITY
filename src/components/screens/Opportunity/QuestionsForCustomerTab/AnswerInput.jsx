import React from 'react';
import CustomApolloRichText from '../../../common/CustomApolloRichText';

const AnswerInput = ({ question }) => {
  const getConvertedAnsString = (str) =>
    !String(str).trim() ? '' : String(str).trim();

  const richTextAnswerField = {
    questionId: question.questionId,

    richTextString: getConvertedAnsString(question?.answers[0]?.answers),
    richTextVal: question?.answers[0]?.formattedAnswer.value,
    richTextHtml: question?.answers[0]?.formattedAnswer.html,
    richTextHtmlExport: question?.answers[0]?.formattedAnswer?.htmlExport,
    enableFocus: true,
    isEditable: true,
    placeholder: '',
    disabled: false,
    onFocus: () => {},
    onBlur: (data) => {},
  };
  return (
    <>
      <div className="input-wrapper ">
        <span className="input-label">A{question.questionOrder}:</span>
        <CustomApolloRichText {...richTextAnswerField} />
      </div>
    </>
  );
};

export default AnswerInput;
