import Trash from 'apollo-react-icons/Trash';
import Card from 'apollo-react/components/Card';
import React from 'react';

import AnswerInput from './AnswerInput';
import QuestionInput from './QuestionInput';

const QuestionContainer = ({ deleteQuestionHandler, questionData }) => {
  console.log('question dataaa: ', questionData.toJS());
  const question = questionData.toJS();

  return (
    <>
      <li className="">
        <Card className="question-container">
          <div>
            <QuestionInput question={question} />
            <AnswerInput question={question} />
          </div>
          <div className="delete-btn">
            <Trash
              className="icon-color"
              onClick={() => deleteQuestionHandler(question)}
            />
          </div>
        </Card>
      </li>
    </>
  );
};

export default QuestionContainer;
