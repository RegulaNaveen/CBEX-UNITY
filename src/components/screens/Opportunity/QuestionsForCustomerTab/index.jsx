import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import Copy from 'apollo-react-icons/Copy';
import { uuidv4 } from 'lib0/random';
import { fromJS, OrderedMap } from 'immutable';
import { isString } from 'lodash';
import QuestionContainer from './QuestionContainer';

import { getProposalQuestions } from '../../../../redux/selectors/proposal';
import { getSelectedBid, selectSections } from '../../../../redux/selectors';
import Header from './Header';
import { deleteProposalQuestion } from '../../../../redux/actions/proposal-actions';
import SocketContextProvider from '../../../../context/SocketContext';

function QuestionsForCustomer() {
  const questionsList = useSelector(getProposalQuestions);
  const [questions, setQuestions] = useState(new OrderedMap());
  const sections = useSelector(selectSections);
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();

  useEffect(() => {
    sections.map((section) => {
      if (section.get('sectionName') === 'Quick questions for the Customer') {
        const sectionQuestions = section.get('questions');
        console.log('inside section customer', sectionQuestions.toJS());
        const filteredCustomQuestion = new OrderedMap(
          Array.from(sectionQuestions).filter((questionItem) => {
            if (questionItem[1].get('isCustomQuestion')) {
              console.log('true fillerted question');
              return true;
            }

            return false;
          })
        );
        console.log({ filteredCustomQuestion, sectionQuestions });
        setQuestions(filteredCustomQuestion);
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
        sectionName: 'Quick questions for the Customer',
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
    console.log({ question }, question.questionId);
    let curQuestion = questions;
    //  questionId
    // setQuestionList((current) => current.pop());
    // curQuestion.valueSeq().filter((ques, key) => {
    //   console.log('inside', ques.toJS().questionId, question.questionId);
    //   if (ques.toJS().questionId !== question.questionId) {
    //   }
    // });
    const proposalId = selectedBid.get('id');
    // this.setState({ loaderText: 'Deleting Question' });
    const res = dispatch(
      deleteProposalQuestion(proposalId, question.questionId)
    );
    // setQuestions(curQuestion);
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
      if (questionData.get('isCustomQuestion')) {
        const answer = getAnswer(questionData.get('answers'));
        html += `<li>${questionData.get('questionHtml')}</li>`;
        if (answer) html += `<ul><li>${answer}</li></ul>`;
      }
    });
    html += '</ul></body></html>';
    console.log('hhhhhhhhhhh ', html);
    return html;
  };

  const copyToClipBoard = () => {
    const content = createClipBoardContent();

    const blob = new Blob([content], { type: 'text/html' });
    const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
    navigator.clipboard.write([clipboardItem]);
  };

  return (
    <>
      <div className="questions-for-customer-container">
        <SocketContextProvider>
          <div>
            <Header />
          </div>
          {questions?.size > 0 ? (
            <div className="questions-container">
              <ul>
                {questions?.valueSeq().map((questionData) => {
                  // if (questionData.get('isCustomQuestion') === true)
                  return (
                    <QuestionContainer
                      deleteQuestionHandler={deleteQuestionHandler}
                      questionData={questionData}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="questions-container">
              <div className="no-questions-added-t">
                No questions added to this opportunity
              </div>
            </div>
          )}

          <div className="btn-container">
            <div>
              <Button
                className="btn-label"
                icon={<Copy />}
                size="small"
                style={{ marginRight: 10 }}
                onClick={copyToClipBoard}
                disabled={questions?.size <= 0}
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
        </SocketContextProvider>
      </div>
    </>
  );
}

export default QuestionsForCustomer;
