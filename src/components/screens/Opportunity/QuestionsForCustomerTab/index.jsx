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
  return (
    <>
      <div className="questions-for-customer-container">
        <div>
          <Header />
        </div>
        <div className="questions-container">
          <ul>
            {questions?.valueSeq().map((questionData) => {
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
