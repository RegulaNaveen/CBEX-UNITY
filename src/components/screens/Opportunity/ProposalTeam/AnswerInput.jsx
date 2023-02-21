import React, { useEffect, useState, useContext } from 'react';
import Grid from 'apollo-react/components/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, xor, isString } from 'lodash';
import { List, fromJS } from 'immutable';
import InfoIcon from 'apollo-react-icons/Info';
import Typography from 'apollo-react/components/Typography';
import ReactDOM from 'react-dom';
import Autocomplete from '../../../common/atoms/inputs/AutoComplete';
import SFAnswerValidationWrapper from '../../../common/SFAnswerValidationWrapper';
import SystemIntegrations from '../../../common/SystemIntegrations/SystemIntegrations';
import {
  selectSections,
  selectFilteredSections,
  selectIsQuestionsFilterEnabled,
  getSelectedBid,
  getnoneditableField,
  getIntegrations,
  getShowNaCheckbox,
  getUserData
} from '../../../../redux/selectors';
import { getUserEmail } from '../../../../SessionHandler';
import {
  setProposalAnswerData,
  deleteProposalUserFromDB,
  setProposalAnswerLoading
} from '../../../../redux/actions/proposal-actions';
import { SocketContext } from '../../../../context/SocketContext';
import { checkNonEditableFields } from '../../../../utils/utils';
import AnswerHistory from '../../../views/modals/AnswerHistory';
import IconButton from 'apollo-react/components/IconButton';
import Tooltip from 'apollo-react/components/Tooltip';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import ChipView from '../../../common/Chip/ChipView';
import MatomoHOC from '../../../HOC/MatomoHOC';

const AnswerInput = (props) => {
  const { isNotepadOpen, trackEvent, eventCategories } = props;
  const dispatch = useDispatch();
  const [iconColor, setIconColor] = useState('#00c221');
  const [changeIcon, setChangeIcon] = useState('');
  const [isHistoryModalShown, setIsHistoryModalShown] = useState(false);
  const [selectedQuestionForHistory, setSelectedQuestionForHistory] = useState(
    ''
  );
  const sections = useSelector(selectSections);
  const noneditableField = useSelector((state) => getnoneditableField(state));
  const isQuestionsFiltersEnabled = useSelector(selectIsQuestionsFilterEnabled);
  const filteredSections = useSelector(selectFilteredSections);
  const userData = useSelector((state) => getUserData(state));
  const allSections = isQuestionsFiltersEnabled ? filteredSections : sections;
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const socketContext = useContext(SocketContext);
  const allFlags = useSelector((state) => state.proposal.get('eventflag'));
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const proposalTeam = [];
  let questionData;
  let milestoneCond = false;
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
  const proposalId = questionData.proposalId;
  const proposalDetail = questionData.proposalDetail;

  const NaLoading = questionData?.NaLoading;
  const closeAnswerHistoryModal = () => {
    setIsHistoryModalShown(false);
  };
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

  const isAnswered = (answer, isAnswerPredicted) => {
    if (isAnswerPredicted) return false;
    if (answer && answer.get && answer.get('answer')) {
      if (List.isList(answer.get('answer'))) {
        return Boolean(answer.get('answer').size);
      }
      return Boolean(
        answer
          .get('answer')
          .toString()
          .trim()
      );
    }
    return false;
  };

  const CustomModal = (props) => {
    const modalRoot = document.getElementById('proposalTeam-answer-history');
    return ReactDOM.createPortal(props.children, modalRoot);
  };
  return (
    <>
      <div className="proposal-team-wrapper-container">
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
          const [selectedRow, setSelectedRow] = useState(false);
          let currentSFAnswer;
          if (
            proposalTeam[0].questions[item].active &&
            proposalTeam[0].questions[item].visible
          ) {
            currentSFAnswer = proposalTeam[0].questions[item].currentSFanswer;
            const sficon = proposalTeam[0].questions[item].sfField;
            const milestone = fromJS(proposalTeam[0].questions[item].milestone);
            const milestoneNew = fromJS(
              proposalTeam[0].questions[item].milestoneNew
            );
            const lastAns = isString(lastAnswer) ? lastAnswer : '';

            if (milestoneNew && !isEmpty(milestoneNew)) {
              milestoneCond = true;
            }
            const qvicon = proposalTeam[0].questions[item].questionId;
            const answers = fromJS(proposalTeam[0].questions[item].answers);
            const loading = proposalTeam[0].questions[item].loading ?? false;
            const sfObject = proposalTeam[0].questions[item]?.sfObject;
            const integrationLocked = isQuestionLockedByOther() ? true : false;
            const section = proposalTeam[0].questions[item]?.section;

            const questionText = proposalTeam[0].questions[item]?.questionText;
            const questionHint = proposalTeam[0].questions[item]?.questionHint;
            const questionHintJSON =
              proposalTeam[0].questions[item]?.questionHintJSON;
            const questionHTML = proposalTeam[0].questions[item]?.questionHTML;
            const sectionName = section?.sectionName;

            const events = proposalTeam[0].questions[item]?.events || {};
            const questionJSON = proposalTeam[0].questions[item]?.questionJSON;

            const checkDisableFlag = () => {
              if (isQuestionLockedByOther() || !isCurrentBid) return true;
              if (NaLoading) return true;
              return (
                checkNonEditableFields(noneditableField, sficon, sfObject) ||
                !isCurrentBid
              );
            };
            const isNotApplicable =
              proposalTeam[0].questions[item]?.notApplicable;

            let checkSFAnswer = [];
            let destinationArray;
            let integrationvalidation;
            let integrationmatch;
            let answerDate = 'Not Answered';
            let lastAnswer;
            let isAnswerPredicted = false;
            let answerValue = '';
            const { questionId } = proposalTeam[0].questions[item];
            const hasDifferentSFanswer =
              proposalTeam[0].questions[item]?.hasDifferentSFanswer;
            if (answers) {
              if (!answers.get('questionId')) {
                lastAnswer = answers.last();
              } else {
                lastAnswer = answers.get('answers').last();
                answerDate = answer?.toString();
              }
            }
            if (lastAnswer) {
              if (
                lastAnswer.get &&
                lastAnswer.get('userName') &&
                lastAnswer.get('userName').length &&
                lastAnswer.get('userName') === 'UnityPredictedAnswer'
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
                answerDate = answer.toString();
              } else {
                answerValue = '';
              }
            }
            const trackMatomoEventSubmitAnswer = (data) => {
              trackEvent({
                category: eventCategories.pd(),
                action: events
                  ? `Event: ${questionText} (${sectionName})`
                  : `Question: ${questionText} (${sectionName})`,
                name: `Answer: ${data}`,
                customDimensions: [
                  {
                    id: 1,
                    value: JSON.stringify({
                      answer: data,
                      sectionName,
                      questionText,
                      questionHTML,
                      questionJSON,
                      questionHintJSON,
                      questionId,
                      proposalDetail
                    })
                  },
                  {
                    events: events || []
                  }
                ]
              });
            };

            const trackMatomoEventAnswerHistory = (data) => {
              trackEvent({
                category: eventCategories.pd(),
                action: `Answer History: Clicked On ${questionText} (${sectionName})`,
                customDimensions: [
                  {
                    id: 1,
                    value: JSON.stringify({
                      answer: data,
                      sectionName,
                      questionText,
                      questionHTML,
                      questionJSON,
                      questionHintJSON,
                      questionId,
                      proposalDetail
                    })
                  },
                  {
                    events: events || []
                  }
                ]
              });
            };

            const handleVerifyPredictedAnsClick = (predictedAnswer) => {
              setIconColor('#015ff1');
              dispatch(
                setProposalAnswerData(
                  socketContext,
                  proposalId,
                  questionId,
                  String(predictedAnswer.get('answer')).trim(),
                  userData
                )
              );
            };

            const handlePropsalChange = async (
              textValue,
              lastValue,
              reason
            ) => {
              try {
                dispatch(
                  setProposalAnswerData(
                    socketContext,
                    proposalId,
                    questionId,
                    textValue,
                    userData
                  )
                ).then(() => {
                  const [deletedVal] = xor(
                    textValue?.trim() ? textValue?.trim().split(',') : [],
                    lastValue?.trim() ? lastValue?.trim().split(',') : []
                  );
                  const [deletedEmail] = String(deletedVal).match(
                    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
                  );
                  if (reason === 'remove-option' && deletedEmail) {
                    setProposalAnswerLoading(questionId, true);
                    const { sectionName, sectionOrder } = section.toJS();
                    dispatch(
                      deleteProposalUserFromDB(
                        proposalId,
                        deletedEmail,
                        sectionOrder,
                        sectionName
                      )
                    ).then(() => {
                      setProposalAnswerLoading(questionId, false);
                    });
                  }
                });
                trackMatomoEventSubmitAnswer(textValue);
              } catch (error) {
                console.log('error :>> ', error);
              }
            };
            const setQuestionToDisplayHistory = (selectedAnswer: string) => {
              let questionHistory = allSections
                .valueSeq()
                .find((section) => section.getIn(['questions', selectedAnswer]))
                .getIn(['questions', selectedAnswer]);
              setSelectedQuestionForHistory(questionHistory);
              setIsHistoryModalShown(true);
            };
            const displayAnswerOnHistory = () => {
              setQuestionToDisplayHistory(questionId);
              trackMatomoEventAnswerHistory();
            };
            return (
              <>
                <div className="proposal-team-wrapper">
                  <div
                    className={`task-table-row question-row ${
                      selectedRow ? 'selected-task-table-row' : ''
                    } ${NaLoading ? 'fade-area' : ''} `}
                    style={{ margin: '2px 0px' }}
                  >
                    <Grid container className="question-title-grid">
                      <Grid
                        item
                        xs={10}
                        className="question-grid-item"
                        style={{ maxWidth: 'none' }}
                      >
                        <div className="proposal-tema-tooltip">
                          <div className="proposal-team-flex">
                            <Typography className="proposal-team-title">
                              {proposalTeam[0].questions[item].questionText}
                            </Typography>
                            {questionHint && (
                              <div>
                                <Tooltip
                                  variant="light"
                                  className="tooltip"
                                  tabIndex={-1}
                                  title={
                                    questionHintJSON ? (
                                      <RichTextEditor
                                        variant="view"
                                        defaultValue={JSON.parse(
                                          questionHintJSON
                                        )}
                                      />
                                    ) : (
                                      <div>{questionHint}</div>
                                    )
                                  }
                                  placement="top"
                                >
                                  <IconButton
                                    color="primary"
                                    style={{ margin: 0 }}
                                    size="small"
                                    className="question-tooltip-icon"
                                  >
                                    <InfoIcon style={{ fontSize: '16px' }} />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            )}
                          </div>
                          {milestoneCond ? (
                            <div className="proposal-team-chipview">
                              {milestoneNew ? (
                                <div className="test">
                                  <ChipView
                                    label={milestoneNew}
                                    style={{ display: 'flex !important' }}
                                    answer={lastAns}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div>
                              {milestone ? (
                                <ChipView label={milestone} answer={lastAns} />
                              ) : null}
                            </div>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={2} className="empty-grid-item" />
                    </Grid>
                    {isQuestionLockedByOther() ? (
                      <Typography variant="subtitle1" className="status-txt">
                        {
                          proposalTeam[0].questions[item].questionLockInfo
                            .userName
                        }
                        is typing...
                      </Typography>
                    ) : null}
                    <div className="proposal-team-answer">
                      <Grid container className="answer-grid">
                        <Grid item xs={10} className="answer-grid-item">
                          <SFAnswerValidationWrapper
                            style={{ paddingLeft: '40px' }}
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
                              onChange={handlePropsalChange}
                              text={answerValue}
                              disabled={checkDisableFlag()}
                            />
                          </SFAnswerValidationWrapper>
                        </Grid>
                        <Grid item xs={2} className="question-grid-item">
                          <SystemIntegrations
                            checkSfAnswer={checkSFAnswer}
                            sficon={sficon}
                            destinationArray={destinationArray}
                            answers={answers}
                            gridColRatio={gridColRatio}
                            integrationmatch={integrationmatch}
                            integrationvalidation={integrationvalidation}
                            answeronhistory={displayAnswerOnHistory}
                            answerdate={answerDate}
                            isAnswerPredicted={isAnswerPredicted}
                            isAnswered={isAnswered}
                            lastAnswer={lastAnswer}
                            iconColor={iconColor}
                            loading={loading}
                            questionText={questionText}
                            NaLoading={NaLoading}
                            showNaCheckbox={showNaCheckbox}
                            isNotepadOpen={isNotepadOpen}
                            changeIcon={changeIcon}
                            isCurrentBid={isCurrentBid}
                            sfObject={sfObject}
                            handleVerifyPredictedAnsClick={(predictedAnswer) =>
                              handleVerifyPredictedAnsClick(predictedAnswer)
                            }
                            hasDifferentSFanswer={hasDifferentSFanswer}
                            disabled={integrationLocked}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      {isHistoryModalShown && (
        <CustomModal>
          <AnswerHistory
            question={selectedQuestionForHistory}
            closeModal={closeAnswerHistoryModal}
          />
        </CustomModal>
      )}
    </>
  );
};
export default MatomoHOC(AnswerInput);
