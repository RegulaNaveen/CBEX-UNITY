import React, { useEffect, useState, useContext } from 'react';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Autocomplete from '../../../common/atoms/inputs/AutoComplete';
import Grid from 'apollo-react/components/Grid';
import SFAnswerValidationWrapper from '../../../common/SFAnswerValidationWrapper';
import SystemIntegrations from '../../../common/SystemIntegrations/SystemIntegrations';
import {
  getQuestion,
  selectSections,
  selectFilteredSections,
  selectIsQuestionsFilterEnabled,
  isSetQuestionLoading,
  getSelectedBid,
  setProposalAnswer,
  getIntegrations,
  getShowNaCheckbox,
  getUserData
} from '../../../../redux/selectors';
import { Map, List } from 'immutable';
import {
  getUserEmail,
  getUserId,
  getUserName
} from '../../../../SessionHandler';

import Typography from 'apollo-react/components/Typography';
import {
  setProposalAnswerData,
  deleteProposalUserFromDB,
  setProposalAnswerLoading
} from '../../../../redux/actions/proposal-actions';
import QuestionsSectionMapping from '../QuestionsSectionMapping';
import CollapsibleList from '../../../common/CollapsibleList';
import AddQuestionModalComponent from '../../../views/modals/AddQuestionModal';
import { SocketContext } from '../../../../context/SocketContext';
import { isObject } from 'lodash';
import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
const AnswerInput = (isNotepadOpen, proposalId) => {
  console.log('proposalId', proposalId);
  const [showModal, setShowModal] = useState(false);
  const [iconColor, setIconColor] = useState('#00c221');
  const [changeIcon, setChangeIcon] = useState('');
  const sections = useSelector(selectSections);
  const isSetQuestionLoadingData = useSelector(isSetQuestionLoading);
  const isQuestionsFiltersEnabled = useSelector(selectIsQuestionsFilterEnabled);
  const filteredSections = useSelector(selectFilteredSections);
  const proposalAns = useSelector(setProposalAnswer);
  const userData = useSelector((state) => getUserData(state));
  console.log('userData', userData);
  const allSections = isQuestionsFiltersEnabled ? filteredSections : sections;
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const socketContext = useContext(SocketContext);
  const allFlags = useSelector((state) => state.proposal.get('eventflag'));
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const proposalTeam = [];
  let questionData;
  const integrationsData = useSelector((state) => getIntegrations(state));
  const showNaCheckbox = useSelector((state) => getShowNaCheckbox(state));
  const gridColRatio = [10, 2];
  allSections.map((item) => {
    if (item.get('sectionName') === 'Proposal Team') {
      proposalTeam.push(item.toJS());
    }
  });
  useEffect(() => {
    allSections.map((item) => {
      if (item.get('sectionName') === 'Proposal Team') {
        proposalTeam.push(item.toJS());
      }
    });
  }, [allSections]);
  Object.keys(proposalTeam[0].questions).map((item) => {
    questionData = proposalTeam[0].questions[item];
  });
  console.log(socketContext, 'scok');
  // eslint-disable-next-line react/destructuring-assignment
  // socketContext.questionLockWrapper(questionData.questionId);
  // const inputProps = {
  //   proposalTeam,
  //   userData: getUserData(),
  //   socketContext,
  //   checkDisableFlag,
  //   setShowLoader,
  //   questionIndex
  // };
  useEffect(() => {
    if (showModal) {
      setTimeout(() => setShowModal(false), 1000);
    }
  }, [isSetQuestionLoadingData]);
  const onCloseAddModal = () => {
    setShowModal((prev) => !prev);
  };
  const NaLoading = questionData?.NaLoading;

  // trackMatomoEventSubmitAnswer = data => {
  //   const {
  //     eventCategories,
  //     proposalDetail,
  //     questionText,
  //     questionHTML,
  //     questionJSON,
  //     questionHintJSON,
  //     sectionName,
  //     trackEvent,
  //     questionId,
  //     events
  //   }
  //   trackEvent({
  //     category: eventCategories.pd(this.props),
  //     action: events
  //       ? `Event: ${questionText} (${sectionName})`
  //       : `Question: ${questionText} (${sectionName})`,
  //     name: `Answer: ${data}`,
  //     customDimensions: [
  //       {
  //         id: 1,
  //         value: JSON.stringify({
  //           answer: data,
  //           sectionName,
  //           questionText,
  //           questionHTML,
  //           questionJSON,
  //           questionHintJSON,
  //           questionId,
  //           proposalDetail
  //         })
  //       },
  //       {
  //         events: events || []
  //       }
  //     ]
  //   });
  // };
  const handlePropsalChange = (questionId, answerValue, lastValue, reason) => {
    try {
      setProposalAnswerData(
        socketContext,
        proposalId,
        questionId,
        answerValue,
        userData
      ).then(() => {
        const [deletedVal] = xor(
          answerValue?.trim() ? answerValue?.trim().split(',') : [],
          lastValue?.trim() ? lastValue?.trim().split(',') : []
        );
        const [deletedEmail] = String(deletedVal).match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
        );
        if (reason === 'remove-option' && deletedEmail) {
          setProposalAnswerLoading(questionId, true);
          const { sectionName, sectionOrder } = section.toJS();
          deleteProposalUserFromDB(
            proposalId,
            deletedEmail,
            sectionOrder,
            sectionName
          ).then(() => {
            setProposalAnswerLoading(questionId, false);
          });
        }
      });
      // trackMatomoEventSubmitAnswer(answerValue);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <>
      {' '}
      <div className="proposal-team-wrapper-container">
        {' '}
        {Object.keys(proposalTeam[0].questions).map((item) => {
          const isQuestionLocked = () => {
            return (
              proposalTeam[0].questions[item].questionLockInfo &&
              proposalTeam[0].questions[item].questionLockInfo?.userInfo
            );
          };
          const isQuestionLockedByOther = () => {
            return (
              isQuestionLocked() &&
              getUserEmail() !==
                proposalTeam[0].questions[item].questionLockInfo?.userInfo
            );
          };
          const callSelectRow = (value) => {
            // call question unlock
            setSelectedRow(value);
          };
          const checkDisableFlag = () => {
            if (
              isQuestionLockedByOther() ||
              !isCurrentBid ||
              !allFlags.proposalTeamTab
            )
              return true;
            return false;
          };
          console.log(
            'proposalTeam[0].questions[item]',
            proposalTeam[0].questions[item].questionLockInfo
          );
          const [selectedRow, setSelectedRow] = useState(false);
          if (
            proposalTeam[0].questions[item].active &&
            proposalTeam[0].questions[item].visible
          ) {
            currentSFAnswer = proposalTeam[0].questions[item].currentSFanswer;
            const sficon = proposalTeam[0].questions[item].sfField;
            const qvicon = proposalTeam[0].questions[item].questionId;
            const answers = fromJS(proposalTeam[0].questions[item].answers);
            const loading = proposalTeam[0].questions[item].loading ?? false;
            const sfObject = proposalTeam[0].questions[item]?.sfObject;
            const integrationLocked = isQuestionLockedByOther() ? true : false;
            let checkSFAnswer = [];
            let currentSFAnswer;
            let destinationArray;
            let integrationvalidation;
            let integrationmatch;
            let answerDate = 'Not Answered';
            let lastAnswer;
            let isAnswerPredicted = false;
            let answerValue = '';
            const questionId = proposalTeam[0].questions[item].questionId;
            const hasDifferentSFanswer =
              proposalTeam[0].questions[item]?.hasDifferentSFanswer;
            if (answers) {
              if (!proposalTeam[0].questions[item].questionID)
                lastAnswer = answers.last();
              else lastAnswer = answers.get('answers').last();
            }
            if (lastAnswer) {
              if (
                lastAnswer.get &&
                lastAnswer.userName &&
                lastAnswer.userName.length &&
                lastAnswer.userName === 'UnityPredictedAnswer'
              ) {
                isAnswerPredicted = true;
                answerDate = 'Not Answered';
              }
            }
            const answer = lastAnswer && lastAnswer?.get('answer');
            const integrationsArray = integrationsData?.data.map((item) => {
              return item.questionId;
            });
            integrationvalidation = integrationsArray?.includes(qvicon);
            integrationmatch = integrationvalidation;
            integrationsData?.data.map((item) => {
              if (item.questionId.includes(qvicon))
                destinationArray = item.destination;
            });
            if (
              typeof currentSFAnswer !== 'undefined' &&
              _.isEmpty(currentSFAnswer) !== true
            ) {
              checkSFAnswer = currentSFAnswer.value;
            }
            if (answer) {
              if (!isEmpty(answer)) {
                answerValue = answer.toString();
              } else {
                answerValue = '';
              }
            }
            // const handleVerifyPredictedAnsClick = (predictedAnswer) => {
            //   setIconColor('#015ff1');
            //   setProposalAnswerData(
            //     socketContext,
            //     proposalId,
            //     questionId,
            //     String(predictedAnswer.get('answer')).trim(),
            //     userData
            //   );
            // };
            return (
              <>
                <div className="proposal-team-wrapper">
                  <div
                    className={`task-table-row question-row ${
                      selectedRow ? 'selected-task-table-row' : ''
                    } ${NaLoading ? 'fade-area' : ''} `}
                    style={{ margin: '2px 0px' }}
                  >
                    <p className="proposal-team-title">
                      {proposalTeam[0].questions[item].questionText}
                    </p>
                    {isQuestionLockedByOther() ? (
                      <Typography variant="subtitle1" className="status-txt">
                        {
                          proposalTeam[0].questions[item].questionLockInfo
                            .userName
                        }
                        is typing...
                      </Typography>
                    ) : null}
                    <div
                      className="proposal-team-answer"
                      style={{ maxWidth: 600 }}
                    >
                      <SFAnswerValidationWrapper
                        hasDifferentSFanswer={
                          hasDifferentSFanswer && isCurrentBid
                        }
                        sfObject={sfObject}
                      >
                        <Autocomplete
                          sectionName={proposalTeam[0].sectionName}
                          onFocus={() => {
                            // call question lock
                            questionLockWrapper(questionId);
                            callSelectRow(true);
                          }}
                          onBlur={() => {
                            questionUnlockWrapper(questionId);
                            callSelectRow(false);
                          }}
                          onChange={handlePropsalChange(
                            questionId,
                            answerValue
                          )}
                          text={answerValue}
                          disabled={checkDisableFlag()}
                        />
                      </SFAnswerValidationWrapper>
                    </div>
                  </div>
                  <div className="integrations-icon">
                    <SystemIntegrations
                      checkSfAnswer={checkSFAnswer}
                      sficon={sficon}
                      destinationArray={destinationArray}
                      answers={answers}
                      gridColRatio={gridColRatio}
                      integrationmatch={integrationmatch}
                      integrationvalidation={integrationvalidation}
                      // answeronhistory={this.displayAnswerOnHistory}
                      answerdate={answerDate}
                      isAnswerPredicted={isAnswerPredicted}
                      // isAnswered={this.isAnswered}
                      lastAnswer={lastAnswer}
                      iconColor={iconColor}
                      loading={loading}
                      NaLoading={NaLoading}
                      showNaCheckbox={showNaCheckbox}
                      isNotepadOpen={isNotepadOpen}
                      changeIcon={changeIcon}
                      isCurrentBid={isCurrentBid}
                      sfObject={sfObject}
                      // handleVerifyPredictedAnsClick={handleVerifyPredictedAnsClick()}
                      hasDifferentSFanswer={hasDifferentSFanswer}
                      disabled={integrationLocked}
                    />
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      <div className="add-question">
        <Link
          style={{ borderBottom: 'none' }}
          onClick={() => setShowModal(true)}
          size="small"
        >
          <Plus fontSize="extraSmall" />
          <span style={{ verticalAlign: 'top' }}> Add New Question</span>
        </Link>
      </div>
      {showModal && (
        <div className="add-quest-modal">
          <AddQuestionModalComponent onClose={onCloseAddModal} />
        </div>
      )}
    </>
  );
};
export default AnswerInput;
