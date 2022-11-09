import React from 'react';
import CustomApolloRichText from '../../../common/CustomApolloRichText';

const TextQuestion = ({ question }) => {
  //   let lastAnswer;
  //   const lastAnswerJS = lastAnswer?.toJS();
  //   const formattedAnswer =
  //     has(lastAnswerJS, 'formattedAnswer') && lastAnswerJS.formattedAnswer;

  //   const parseFormattedData =
  //     !formattedAnswer || isObject(formattedAnswer)
  //       ? formattedAnswer
  //       : parseStringifyJson(formattedAnswer);

  //   const richTextData = parseFormattedData || {
  //     html: '',
  //     value: { blocks: [] }
  //   };

  const richtextProps = {
    // questionId: this.props.questionId,
    richTextString: '',
    richTextVal: '',
    richTextHtml: '',
    enableFocus: false,
    isEditable: false,
    disabled: false,
    onFocus: () => {},
    onBlur: () => {}
  };
  return (
    <>
      <CustomApolloRichText {...richtextProps} />
    </>
  );
};

export default TextQuestion;
