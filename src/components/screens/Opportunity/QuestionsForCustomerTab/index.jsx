import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import Copy from 'apollo-react-icons/Copy';
import QuestionContainer from './QuestionContainer';
import { getProposalQuestions } from '../../../../redux/selectors/proposal';
import { selectSections } from '../../../../redux/selectors';
import Header from './Header';
import { uuidv4 } from 'lib0/random';
import { fromJS } from 'immutable';
import { isString } from 'lodash';

function QuestionsForCustomer() {
  const questionsList = useSelector(getProposalQuestions);
  const [questions, setQuestions] = useState(null);
  const sections = useSelector(selectSections);

  useEffect(() => {
    sections.map((section, indx) => {
      if (section.get('sectionName') === 'Questions for the Customer') {
        const ques = section.get('questions');
        console.log('inside section customer', ques.toJS());
        setQuestions(ques);
        return ques;
      }
    });
  }, [questionsList]);

  useEffect(() => {
    console.log({ questions });
  }, [questions]);

  const addQuestionHandler = () => {
    let _id = uuidv4();
    let question = questions;
    console.log('question lengthhh ', question.size);
    let newQuestionEntry = {
      isNewEntry: true,
      isCustomQuestion: true,
      questionId: _id,
      section: {
        sectionOrder: 199,
        sectionName: 'Quick Questions for the Customer',
      },
      active: true,
      questionOrder: question.size + 1,
      questionApproval: false,
      locked: false,
      proposalId: '3cefc843-73d8-4797-9ffa-09b3e290b8bc',
      questionJSON: '',
      milestoneNew: [],
      hasDifferentSFanswer: false,
      questionHTML: '',
      roleNames: ['Business Developer'],
      visible: true,
      notApplicable: false,
      questionText: '',
      integration: '',
      answers: [],
      questionHintJSON: '',
      questionHintHTML: '',
      answerConfiguration: {
        type: 'text',
        options: [],
      },
      events: '',
    };
    question = question.set(_id, fromJS(newQuestionEntry));
    // question.set(newQuestionEntry);
    console.log(question.toJS());
    setQuestions(question);
  };

  const deleteQuestionHandler = (question) => {
    console.log({ question });
    let curQuestion = questions;
    //  questionId
    // setQuestionList((current) => current.pop());
    curQuestion.valueSeq().filter((ques, key) => {
      console.log('inside', ques.toJS().questionId, question.questionId);
      if (ques.toJS().questionId !== question.questionId) {
      }
    });
    setQuestions(curQuestion);
  };

  const getAnswer = (answers) => {
    try {
      let ans = answers.toJS();
      const lastAnswer = ans[ans.length - 1];
      console.log('before: ', { lastAnswer });
      let formattedAnswer;
      if (lastAnswer?.formattedAnswer) {
        if (isString(lastAnswer?.formattedAnswer)) {
          try {
            formattedAnswer = JSON.parse(lastAnswer?.formattedAnswer);
          } catch {
            return (lastAnswer && lastAnswer.answer.toString()) || '';
          }
        } else formattedAnswer = lastAnswer?.formattedAnswer;
        if (formattedAnswer?.htmlExport) {
          return formattedAnswer.htmlExport;
        }
        if (formattedAnswer?.html) {
          return formattedAnswer?.html;
        }
      }
      console.log({ lastAnswer });
      return (lastAnswer && lastAnswer.answer.toString()) || '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const createClipBoardContent = () => {
    let html = '<html><body><ul>';

    questions.map((questionData) => {
      console.log('inside questions ');
      const answer = getAnswer(questionData.get('answers'));
      html += `<li>${questionData.get('questionText')}</li>`;
      if (answer) html += `<ul><li>${answer}</li></ul>`;
    });
    html += '</ul></body></html>';
    console.log('hhhhhhhhhhh ', html);
    return html;
  };

  const copyToClipBoard = () => {
    const content = createClipBoardContent();
    // ('<html><body><ul><li>one</li><li>two</li></ul></body></html>');
    const blob = new Blob([content], { type: 'text/html' });
    const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
    navigator.clipboard.write([clipboardItem]);
  };

  return (
    <>
      <div className="questions-for-customer-container">
        <div>
          <Header />
        </div>
        <div className="questions-container">
          <ul>
            {questions?.valueSeq().map((questionData) => {
              if (questionData.get('isCustomQuestion') === true)
                return (
                  <QuestionContainer
                    deleteQuestionHandler={deleteQuestionHandler}
                    questionData={questionData}
                  />
                );
            })}
          </ul>
        </div>
        <div className="btn-container">
          <div>
            <Button
              className="btn-label"
              icon={<Copy />}
              size="small"
              style={{ marginRight: 10 }}
              onClick={copyToClipBoard}
            >
              Copy to clipboard
            </Button>
          </div>
          <div>
            <Button
              variant="primary"
              icon={<PlusIcon />}
              size="small"
              style={{ marginRight: 10 }}
              className="btn-label"
              onClick={() => addQuestionHandler()}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionsForCustomer;
