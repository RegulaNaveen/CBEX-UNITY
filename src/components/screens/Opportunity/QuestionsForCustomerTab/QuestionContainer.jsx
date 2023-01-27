import React from 'react';
import Trash from 'apollo-react-icons/Trash';
import Card from 'apollo-react/components/Card';
import Loader from 'apollo-react/components/Loader';
import Typography from 'apollo-react/components/Typography';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../../context/SocketContext';
import {
  getUserEmail,
  getUserId,
  getUserName
} from '../../../../SessionHandler';

import AnswerInput from './AnswerInput';
import QuestionInput from './QuestionInput';

const QuestionContainer = ({
  deleteQuestionHandler,
  questionData,
  questionIndex,
  isCurrentBid,
  setNewEntry
}) => {
  const question = questionData.toJS();
  const socketContext = React.useContext(SocketContext);
  const [showLoader, setShowLoader] = React.useState(false);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));

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

  console.log("inputprops", inputProps);
  return (
    <>
      <li className="">
        <Card className="question-container" data-testid="question-container">
          <div>
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
