import React from 'react';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import CustomApolloRichText from '../../../common/CustomApolloRichText';
import { parseStringifyJson } from '../../../../utils/helpers';

// Function to converted Answer String
const getConvertedAnsString = str =>
  !String(str).trim() ? '' : String(str).trim();

const TextQuestion = ({ question, lastAnswer }) => {
  const formattedAnswer =
    has(lastAnswer, 'formattedAnswer') && lastAnswer.formattedAnswer;

  const parseFormattedData =
    !formattedAnswer || isObject(formattedAnswer)
      ? formattedAnswer
      : parseStringifyJson(formattedAnswer);

  const richTextData = parseFormattedData || {
    html: '',
    value: { blocks: [] }
  };

  const richtextProps = {
    richTextString: getConvertedAnsString(lastAnswer),
    richTextVal: richTextData.value,
    richTextHtml: richTextData.html,
    enableFocus: true,
    isEditable: false,
    disabled: false
  };
  return (
    <>
      <CustomApolloRichText {...richtextProps} />
    </>
  );
};

export default TextQuestion;
