import Trash from 'apollo-react-icons/Trash';
import Card from 'apollo-react/components/Card';
import Loader from 'apollo-react/components/Loader';
import Typography from 'apollo-react/components/Typography';
import React, { useContext, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../../context/SocketContext';
import {
  selectAutoNavigatedToCurrentResult,
  selectCurrentSearchResult,
  selectPrevSearchResult,
  selectQuery
} from '../../../../redux/selectors/search';
import {
  getUserEmail,
  getUserId,
  getUserName
} from '../../../../SessionHandler';

import AnswerInput from './AnswerInput';
import QuestionInput from './QuestionInput';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';

const QuestionContainer = ({
  deleteQuestionHandler,
  questionData,
  questionIndex,
  isCurrentBid,
  setNewEntry
}) => {
  const question = questionData.toJS();
  const socketContext = useContext(SocketContext);
  const [showLoader, setShowLoader] = useState(false);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const searchQuery = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );
  const prevSearchResult = useSelector(selectPrevSearchResult);

  const questionContainerRef = useRef(null);

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  const isQuestionLocked = () => {
    return question?.questionLockInfo && question?.questionLockInfo?.userInfo;
  };

  const isQuestionLockedByOther = () => {
    return (
      isQuestionLocked() &&
      getUserEmail() !== question?.questionLockInfo?.userInfo
    );
  };

  const checkDisableFlag = () => {
    if (
      isQuestionLockedByOther() ||
      !isCurrentBid ||
      !allFlags.isQuestionForCustomerEditable
    )
      return true;

    return false;
  };

  const inputProps = {
    question,
    userData: getUserData(),
    socketContext,
    checkDisableFlag,
    setShowLoader,
    questionIndex,
    setNewEntry
  };

  useEffect(() => {
    if (
      currentSearchResult !== null &&
      questionContainerRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      if (currentSearchResult.searchIndex === question.questionId) {
        // allow others to collapse before scrollIntoView
        setTimeout(() => {
          questionContainerRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 500);
      }
    }
  }, [
    questionContainerRef,
    searchQuery,
    currentSearchResult,
    prevSearchResult,
    autoNavigatedToCurrentResult
  ]);

  return (
    <>
      <li className="">
        <Card
          className={classNames({
            'question-container': true,
            'search-highlight':
              currentSearchResult !== null &&
              currentSearchResult.searchIndex === question.questionId
          })}
        >
          <div ref={questionContainerRef}>
            {isQuestionLockedByOther() ? (
              <Typography variant="subtitle1" className="status-txt">
                {question?.questionLockInfo?.userName} is typing...
              </Typography>
            ) : null}
            <QuestionInput {...inputProps} />
            <AnswerInput {...inputProps} />
          </div>
          <div className="delete-btn">
            <div>
              <Trash
                className="icon-color"
                style={{
                  cursor: checkDisableFlag() ? 'not-allowed' : 'pointer'
                }}
                onClick={() => {
                  if (checkDisableFlag()) return;
                  deleteQuestionHandler(question);
                }}
              />
            </div>
            {showLoader && (
              <div>
                <span
                  style={{
                    position: 'relative',
                    top: '2em'
                  }}
                >
                  <Loader
                    isInner
                    size={20}
                    style={{
                      width: '20px',
                      height: '20px'
                    }}
                  />
                </span>
              </div>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default QuestionContainer;
