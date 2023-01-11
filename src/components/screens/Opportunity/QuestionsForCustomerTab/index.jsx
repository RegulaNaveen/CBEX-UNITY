import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import Copy from 'apollo-react-icons/Copy';
import { uuidv4 } from 'lib0/random';
import { fromJS, OrderedMap } from 'immutable';
import { isString } from 'lodash';
import Modal from 'apollo-react/components/Modal';
import Typography from 'apollo-react/components/Typography';
import QuestionContainer from './QuestionContainer';
import { getProposalQuestions } from '../../../../redux/selectors/proposal';
import { getSelectedBid, selectSections } from '../../../../redux/selectors';
import Header from './Header';
import { deleteProposalQuestion } from '../../../../redux/actions/proposal-actions';
import SocketContextProvider from '../../../../context/SocketContext';

function QuestionsForCustomer() {
  const questionsList = useSelector(getProposalQuestions);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [questions, setQuestions] = useState(new OrderedMap());
  const sections = useSelector(selectSections);
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuestions(new OrderedMap());
    sections.map((section) => {
      if (
        section.get('sectionName') === 'Questions_for_the_Customer_left_panel'
      ) {
        const sectionQuestions = section.get('questions');

        const filteredCustomQuestion = new OrderedMap(
          Array.from(sectionQuestions).filter((questionItem) => {
            if (questionItem[1].get('isCustomQuestion')) {
              return true;
            }

            return false;
          })
        );

        setQuestions(filteredCustomQuestion);
      }
    });
  }, [questionsList]);

  const addQuestionHandler = () => {
    let _id = uuidv4();
    let question = questions;
    let newQuestionEntry = {
      isNewEntry: true,
      isCustomQuestion: true,
      questionId: _id,
      section: {
        sectionOrder: 199,
        sectionName: 'Questions_for_the_Customer_left_panel'
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
        options: []
      },
      events: ''
    };
    question = question.set(_id, fromJS(newQuestionEntry));

    setQuestions(question);
  };

  const onForceDelete = async () => {
    if (!questionToDelete) return;
    const proposalId = selectedBid.get('id');

    setShowDeleteModal(false);
    await dispatch(
      deleteProposalQuestion(proposalId, questionToDelete.questionId)
    );

    setQuestionToDelete(null);
  };

  const onDelete = async (question) => {
    if (!question) return;
    const proposalId = selectedBid.get('id');

    setShowDeleteModal(false);
    await dispatch(deleteProposalQuestion(proposalId, question.questionId));

    setQuestionToDelete(null);
  };

  const deleteQuestionHandler = (question) => {
    if (question.isNewEntry) {
      const filteredCustomQuestion = new OrderedMap(
        Array.from(questions).filter((questionItem) => {
          if (questionItem[1].get('questionId') !== question.questionId) {
            return true;
          }

          return false;
        })
      );
      setQuestions(filteredCustomQuestion);
    } else if (
      question?.answers[question?.answers?.length - 1] &&
      question?.answers[question?.answers?.length - 1].answer.trim()
    ) {
      setQuestionToDelete(question);
      setShowDeleteModal(true);
    } else {
      onDelete(question);
    }
  };

  const getAnswer = (answers) => {
    try {
      let ans = answers.toJS();
      const lastAnswer = ans[ans.length - 1];
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
        const answerJS = questionData.get('answers').toJS();

        html += `<li>${questionData.get('questionText')}</li>`;
        if (answer && answerJS[answerJS.length - 1]?.answer?.trim())
          html += `<ul><li>${answer}</li></ul>`;
      }
    });
    html += '</ul></body></html>';

    return html;
  };

  const copyToClipBoard = () => {
    const content = createClipBoardContent();

    const blob = new Blob([content], { type: 'text/html' });
    const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
    navigator.clipboard.write([clipboardItem]);
  };
  const handleClose = () => {
    setShowDeleteModal((prev) => !prev);
  };

  return (
    <>
      <div className="questions-for-customer-container">
        <div>
          <Header />
        </div>
        {questions?.size > 0 ? (
          <div
            className={
              questions?.size > 3
                ? 'questions-container-over'
                : 'questions-container'
            }
          >
            <ul>
              {questions?.valueSeq().map((questionData, index) => {
                return (
                  <QuestionContainer
                    deleteQuestionHandler={deleteQuestionHandler}
                    questionData={questionData}
                    questionIndex={index + 1}
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
              disabled={
                Array.from(questions)[questions.size - 1]
                  ? Array.from(questions)[questions.size - 1][1].get(
                      'isNewEntry'
                    )
                  : false
              }
            >
              Add New
            </Button>
          </div>
        </div>
        <Modal
          open={showDeleteModal}
          variant="warning"
          onClose={() => handleClose()}
          title={
            <Typography style={{ color: '#e30e0e' }} variant="h3">
              Are you sure?
            </Typography>
          }
          message="This question contains has been answered by a Unity user , are you sure you want to delete this value?"
          buttonProps={[
            { label: 'Cancel', onClick: handleClose },
            { label: 'Yes, Delete', onClick: onForceDelete }
          ]}
          id="warning"
        />
      </div>
    </>
  );
}

export default QuestionsForCustomer;
