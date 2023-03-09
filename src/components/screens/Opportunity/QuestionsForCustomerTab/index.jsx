import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import Copy from 'apollo-react-icons/Copy';
import { fromJS, OrderedMap } from 'immutable';
import { isString } from 'lodash';
import Modal from 'apollo-react/components/Modal';
import Typography from 'apollo-react/components/Typography';
import QuestionContainer from './QuestionContainer';
import { getProposalQuestions } from '../../../../redux/selectors/proposal';
import { getSelectedBid } from '../../../../redux/selectors';
import Header from './Header';
import {
  deleteProposalQuestion,
  setProposalQuestion
} from '../../../../redux/actions/proposal-actions';
import { SocketContext } from '../../../../context/SocketContext';

function QuestionsForCustomer() {
  const socketContext = useContext(SocketContext);
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const [autoScroll, setAutoScroll] = useState(false);

  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const questionsList = useSelector(getProposalQuestions);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));

  const [questions, setQuestions] = React.useState(new OrderedMap());
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [questionToDelete, setQuestionToDelete] = React.useState(null);
  const [newEntry, setNewEntry] = React.useState(null);
  const [showScroll, setShowScroll] = React.useState(null);

  const dispatch = useDispatch();

  const addNewEntryRef = React.createRef();
  const questionContainerRef = React.createRef();
  const [showAddQuestionLoader, setShowAddQuestionLoader] = useState(false);

  const getSectionQuestions = proposalQuestions => {
    try {
      let sectionQuestions = new OrderedMap();

      proposalQuestions.forEach(question => {
        const {
          questionId,
          section: { sectionName }
        } = question;

        if (sectionName === 'Questions_for_the_Customer_left_panel') {
          sectionQuestions = sectionQuestions.set(questionId, fromJS(question));
          sectionQuestions = sectionQuestions.sortBy(item =>
            item.get('questionOrder')
          );
        }
      });
      setQuestions(sectionQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSectionQuestions(questionsList);
    if (addNewEntryRef?.current?.offsetTop > 380) setShowScroll(true);
  }, [questionsList]);

  useEffect(() => {
    if (autoScroll && questionContainerRef?.current) {
      questionContainerRef.current.scroll({
        top: questionContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setAutoScroll(false);
    }
  }, [autoScroll]);

  const addQuestionHandler = async () => {
    setTimeout(async () => {
      try {
        const proposalId = selectedBid.get('id');
        const section = {
          sectionOrder: 199,
          sectionName: 'Questions_for_the_Customer_left_panel'
        };
        const answerType = 'text';
        const roleNames = ['Business Developer'];

        const questionData = {
          proposalId,
          questionText: ' ',
          questionJSON: '',
          questionHTML: '',
          section,
          answerType,
          options: [],
          roleNames
        };

        setShowAddQuestionLoader(true);

        await dispatch(
          setProposalQuestion(proposalId, questionData, socketContext)
        );
        setShowAddQuestionLoader(false);
        setAutoScroll(true);
      } catch (error) {
        console.log('Error Add question: ', error);
      }
    }, 100);
  };

  const onForceDelete = async () => {
    if (!questionToDelete) return;
    try {
      const proposalId = selectedBid.get('id');

      setShowDeleteModal(false);
      await dispatch(
        deleteProposalQuestion(
          proposalId,
          questionToDelete.questionId,
          socketContext
        )
      );
      questionUnlockWrapper(questionToDelete?.questionId);
      setQuestionToDelete(null);
    } catch (error) {
      questionUnlockWrapper(questionToDelete?.questionId);
      console.log('Error Delete question : ', error);
    }
  };

  const onDelete = async question => {
    if (!question) return;
    try {
      const proposalId = selectedBid.get('id');

      setShowDeleteModal(false);
      await dispatch(
        deleteProposalQuestion(proposalId, question.questionId, socketContext)
      );
      questionUnlockWrapper(question?.questionId);
      setQuestionToDelete(null);
    } catch (error) {
      questionUnlockWrapper(question?.questionId);
      console.log('Error delete question: ', error);
    }
  };

  const deleteQuestionHandler = question => {
    questionLockWrapper(question?.questionId);
    if (
      question?.answers[question?.answers?.length - 1] &&
      question?.answers[question?.answers?.length - 1].answer.trim()
    ) {
      setQuestionToDelete(question);
      setShowDeleteModal(true);
    } else {
      onDelete(question);
    }
  };

  const getAnswer = answers => {
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

    questions.map(questionData => {
      if (questionData.get('isCustomQuestion')) {
        const answer = getAnswer(questionData.get('answers'));
        const answerJS = questionData.get('answers').toJS();

        html += `<li>${questionData.get('questionHTML')}</li>`;
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
    if (questionToDelete) questionUnlockWrapper(questionToDelete?.questionId);
    setShowDeleteModal(prev => !prev);
  };

  return (
    <>
      <div
        className="questions-for-customer-container"
        data-testid="question-customer-tab"
      >
        <div>
          <Header />
        </div>
        {questions?.size > 0 ? (
          <div
            id="question-container-area"
            className={
              showScroll || questions?.size > 2
                ? 'questions-container-over'
                : 'questions-container'
            }
            ref={questionContainerRef}
          >
            <ul>
              {questions?.valueSeq().map((questionData, index) => {
                return (
                  <QuestionContainer
                    data-testid="question-container"
                    deleteQuestionHandler={deleteQuestionHandler}
                    questionData={questionData}
                    questionIndex={index + 1}
                    isCurrentBid={isCurrentBid}
                    showScroll={showScroll}
                    socketContext={socketContext}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <div id="question-container-area" className="questions-container">
            <div className="no-questions-added-t">
              No questions added to this opportunity
            </div>
          </div>
        )}
        <hr className="divider-hr" />
        <div className="btn-container" ref={addNewEntryRef}>
          <div data-testid="clipboard-button">
            <Button
              data-testid="clipboard-button"
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
              onMouseDown={addQuestionHandler}
              onKeyDown={event => event.key === 'Enter' && addQuestionHandler()}
              disabled={
                !isCurrentBid ||
                !allFlags.isQuestionForCustomerEditable ||
                showAddQuestionLoader
              }
            >
              Add New
            </Button>
          </div>
        </div>
        <Modal
          data-testid="delete-modal"
          open={showDeleteModal}
          variant="warning"
          onClose={() => handleClose()}
          title={
            <Typography style={{ color: '#e30e0e' }} variant="h3">
              Are you sure?
            </Typography>
          }
          message="This question has been answered. Are you sure you want to delete this question and its answer?"
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
