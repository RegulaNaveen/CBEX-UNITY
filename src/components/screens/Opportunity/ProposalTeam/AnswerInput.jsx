import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, xor, isString, has, isObject } from 'lodash';
import { List } from 'immutable';
import InfoIcon from 'apollo-react-icons/Info';
import Grid from 'apollo-react/components/Grid';
import Typography from 'apollo-react/components/Typography';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import ReactDOM from 'react-dom';
import Checkbox from 'apollo-react/components/Checkbox';
import { Edit } from '../../../svg/index';
import { parseStringifyJson } from '../../../../utils/helpers';
import Autocomplete from '../../../common/atoms/inputs/AutoComplete';
import SFAnswerValidationWrapper from '../../../common/SFAnswerValidationWrapper';
import SystemIntegrations from '../../../common/SystemIntegrations/SystemIntegrations';
import {
  isSetQuestionLoading,
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
  setProposalAnswerLoading,
  setNotApplicableLoader,
  setNotApplicableQuestion,
  setEditQuestionData
} from '../../../../redux/actions/proposal-actions';
import AddQuestionModalComponent from '../../../views/modals/AddQuestionModal';
import { SocketContext } from '../../../../context/SocketContext';
import { checkNonEditableFields } from '../../../../utils/utils';
import AnswerHistory from '../../../views/modals/AnswerHistory';
import ChipView from '../../../common/Chip/ChipView';
import MatomoHOC from '../../../HOC/MatomoHOC';
import { getProposalAnswer } from '../../../../api/proposal';
import TextArea from '../../../common/atoms/inputs/TextArea';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';
import withIdleStateDetection from '../../../HOC/IdleStateDetector';
import { parseMomentDate,formatTheDate } from '../../../../utils/DateUtils';
const QuestionDatePickerWithIdleStateDetection = withIdleStateDetection(
  QuestionDatePicker
);
const AnswerInput = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    isNotepadOpen,
    trackEvent,
    eventCategories,
    proposalId,
    proposalDetail,
    isNotApplicable,
    milestoneCond,
    NaLoading,
    sficon,
    currentSFAnswer,
    lastAns,
    milestone,
    qvicon,
    answers,
    loading,
    sfObject,
    questionHint,
    questionHintJSON,
    questionHTML,
    sectionName,
    questionText,
    events,
    questionJSON,
    isCustomQuestion,
    notApplicable,
    questionData,
    section,
    milestoneNew,
    allSections,
    answerConfiguration,
    roleNames,
    questionLockInfo,
    questionId
  } = props;
  const dispatch = useDispatch();
  const [iconColor, setIconColor] = useState('#00c221');
  const [changeIcon, setChangeIcon] = useState('');
  const [isHistoryModalShown, setIsHistoryModalShown] = useState(false);
  const [selectedQuestionForHistory, setSelectedQuestionForHistory] = useState(
    ''
  );
  const [selectedDay, setSelectedDay] = useState(' ');
  const noneditableField = useSelector((state) => getnoneditableField(state));
  // const issetNotApplicableQuestion = useSelector(setNotApplicableQuestion);

  const userData = useSelector((state) => getUserData(state));
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const socketContext = useContext(SocketContext);
  const [selectedRow, setSelectedRow] = useState(false);

  const allFlags = useSelector((state) => state.proposal.get('eventflag'));
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;

  const integrationsData = useSelector((state) => getIntegrations(state));
  const showNaCheckbox = useSelector((state) => getShowNaCheckbox(state));

  const gridColRatio = [10, 2];

  const closeAnswerHistoryModal = () => {
    setIsHistoryModalShown(false);
  };

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
    const modalRoot = document.getElementById('modal-wrapper');
    return ReactDOM.createPortal(props.children, modalRoot);
  };
  const isQuestionLocked = () => {
    return (
      questionData.questionLockInfo && questionData.questionLockInfo?.userInfo
    );
  };
  const isQuestionLockedByOther = () => {
    return (
      isQuestionLocked() &&
      getUserEmail() !== questionData.questionLockInfo?.userInfo
    );
  };
  const callSelectRow = (value) => {
    // call question unlock
    setSelectedRow(value);
  };
  const integrationLocked = isQuestionLockedByOther() ? true : false;

  const checkDisableFlag = () => {
    if (isQuestionLockedByOther() || !isCurrentBid) return true;
    if (NaLoading) return true;
    return (
      checkNonEditableFields(noneditableField, sficon, sfObject) ||
      !isCurrentBid
    );
  };

  let checkSFAnswer = [];
  let destinationArray;
  let integrationvalidation;
  let integrationmatch;
  let answerDate = 'Not Answered';
  let lastAnswer;
  let isAnswerPredicted = false;
  let answerValue = '';
  const { hasDifferentSFanswer } = questionData;
  if (answers) {
    if (!answers.get('questionId')) {
      lastAnswer = answers.last();
    } else {
      lastAnswer = answers.get('answer').last();
      answerDate = answer?.toString();
    }
  }
  if (lastAnswer) {
    if (
      lastAnswer?.get &&
      lastAnswer?.get('userName') &&
      lastAnswer?.get('userName').length &&
      lastAnswer?.get('userName') === 'UnityPredictedAnswer'
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
    if (item.questionId.includes(qvicon)) destinationArray = item.destination;
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

  const handleUncheckNaQuestion = async (type) => {
    const answersData = await getProposalAnswer(proposalId, questionId);

    if (answersData[answersData.length - 1]?.answer === 'N/A') {
      answersData.pop();
    }
  };
  const renderNACheckbox = (type) => {
    if (showNaCheckbox) {
      return (
        <div style={{ width: '10px', marginRight: '30px' }}>
          N/A
          <Checkbox
            style={{
              cursor: `${checkDisableFlag() ? 'not-allowed' : 'pointer'}`
            }}
            checked={isNotApplicable}
            disabled={checkDisableFlag() || NaLoading}
            onClick={async () => {
              if (checkDisableFlag()) return;
              dispatch(setNotApplicableLoader(questionId));

              if (!isNotApplicable) {
                dispatch(
                  setProposalAnswerData(
                    socketContext,
                    proposalId,
                    questionId,
                    'N/A',
                    userData
                  )
                );

                dispatch(
                  setNotApplicableQuestion(
                    proposalId,
                    questionId,
                    !isNotApplicable,
                    socketContext
                  )
                );
              } else {
                await handleUncheckNaQuestion(type);
                dispatch(
                  setNotApplicableQuestion(
                    proposalId,
                    questionId,
                    !isNotApplicable,
                    socketContext
                  )
                );
              }
            }}
          />
        </div>
      );
    }
  };
  const handlePropsalChange = async (textValue, lastValue, reason) => {
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
          dispatch(setProposalAnswerLoading(questionId, true));
          const { sectionOrder } = section.toJS();
          dispatch(
            deleteProposalUserFromDB(
              proposalId,
              deletedEmail,
              sectionOrder,
              sectionName
            )
          ).then(() => {
            dispatch(setProposalAnswerLoading(questionId, true));
          });
        }
      });
      trackMatomoEventSubmitAnswer(textValue);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const setQuestionToDisplayHistory = (selectedAnswer: string) => {
    const questionHistory = allSections
      .valueSeq()
      .find((sections) => sections.getIn(['questions', selectedAnswer]))
      .getIn(['questions', selectedAnswer]);
    setSelectedQuestionForHistory(questionHistory);
    setIsHistoryModalShown(true);
  };
  const displayAnswerOnHistory = () => {
    setQuestionToDisplayHistory(questionId);
    trackMatomoEventAnswerHistory();
  };

  const handleDayChange = (selectedDay: string, lastAnswer: Date) => {
    setSelectedDay(selectedDay);
    if (
      parseMomentDate(lastAnswer.trim()) !==
        parseMomentDate(selectedDay.trim()) &&
      selectedDay
    )
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          formatTheDate(selectedDay),
          userData
        )
      );

    trackMatomoEventSubmitAnswer(selectedDay);
  };

  const resetDate = () => {
    setSelectedDay(' ');
    dispatch(
      setProposalAnswerData(
        socketContext,
        proposalId,
        questionId,
        selectedDay,
        userData
      )
    );
    trackMatomoEventSubmitAnswer(' ');
  };

  const handleTextChange = (textValue, editorData) => {
    const valueForText = textValue || ' ';
    const s1 = valueForText
      .trim()
      .split(' ')
      .filter((v) => v.trim().length > 0);
    const s2 = valueForText
      .trim()
      .split(' ')
      .filter((v) => v.trim().length > 0);
    if (isEmpty(s1)) setChangeIcon('#b7b7b7');
    else setChangeIcon('#00c221');

    if (!isEmpty(valueForText.replace(/\r?\n|\r| /g, ''))) {
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          String(valueForText).trim(),
          userData,
          editorData
        )
      );
      callSelectRow(false);
    } else if (!valueForText.trim() && lastAnswer.trim()) {
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          ' ',
          userData,
          editorData
        )
      );
      callSelectRow(false);
    }
    questionUnlockWrapper(questionId);

    trackMatomoEventSubmitAnswer(valueForText);
    setSelectedRow(false);
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
          <Grid container>
            <Grid
              item
              xs={10}
              style={showNaCheckbox ? { marginLeft: 40 } : { marginLeft: 0 }}
              // className="question-grid-item"
            >
              <div className="proposal-tema-tooltip">
                <div className="proposal-team-flex">
                  <Typography className="proposal-team-title">
                    {questionText}
                  </Typography>

                  {isCustomQuestion && (
                    <div className="proposal-team-edit-icon">
                      <span
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(
                            setEditQuestionData({
                              questionText,
                              questionHTML,
                              questionJSON,
                              questionHintJSON,
                              section: sectionName,
                              answerType: answerConfiguration.type,
                              roleNames,
                              questionAnswered: !!lastAnswer,
                              questionId
                            })
                          );
                        }}
                      >
                        <Edit className="edit-icon" />
                      </span>
                    </div>
                  )}

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
                              defaultValue={JSON.parse(questionHintJSON)}
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
                  <div className="chipview">
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
                  <div className="chipview">
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
              {`${questionLockInfo?.userName} is typing...`}
            </Typography>
          ) : null}
          <Grid container>
            {answerConfiguration?.type === 'text' && (
              <Grid item xs={10}>
                <SFAnswerValidationWrapper
                  style={{ paddingLeft: '40px' }}
                  hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
                  sfObject={sfObject}
                >
                  <span
                    style={
                      `${showNaCheckbox}`
                        ? {
                            display: 'flex',
                            alignItems: 'stretch' // border: '1px solid blue',
                          }
                        : ''
                    }
                  >
                    <span className={showNaCheckbox ? 'markNaAutoActivea' : ''}>
                      {renderNACheckbox(checkDisableFlag, 'Autocomplete')}
                    </span>
                    <span style={`${showNaCheckbox}` ? { flexGrow: 10 } : ''}>
                      <Autocomplete
                        sectionName={sectionName}
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
                    </span>
                  </span>
                </SFAnswerValidationWrapper>
              </Grid>
            )}
            {answerConfiguration?.type === 'number' && (
              <Grid item xs={10}>
                <SFAnswerValidationWrapper
                  hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
                  sfObject={sfObject}
                >
                  <span
                    style={
                      `${showNaCheckbox}`
                        ? {
                            display: 'flex',
                            alignItems: 'stretch' // border: '1px solid blue',
                          }
                        : ''
                    }
                  >
                    <span className={showNaCheckbox ? 'markNaAutoActivea' : ''}>
                      {renderNACheckbox(checkDisableFlag, 'Autocomplete')}
                    </span>
                    <span style={`${showNaCheckbox}` ? { flexGrow: 10 } : ''}>
                      <TextArea
                        className="proposal-text-area"
                        placeholder={
                          checkDisableFlag() ? '' : 'Click to answer'
                        }
                        type="number"
                        onBlur={handleTextChange}
                        onFocus={() => {
                          // call question lock
                          questionLockWrapper(questionId);
                          callSelectRow(true);
                        }}
                        value={answerValue || ''}
                        disabled={checkDisableFlag() || isNotApplicable}
                      />
                    </span>
                  </span>
                </SFAnswerValidationWrapper>
              </Grid>
            )}

            {answerConfiguration?.type === 'date' && (
              <Grid item xs={10}>
                <SFAnswerValidationWrapper
                  hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
                  sfObject={sfObject}
                >
                  <span
                    style={
                      `${showNaCheckbox}`
                        ? {
                            display: 'flex',
                            alignItems: 'stretch'
                          }
                        : ''
                    }
                  >
                    <span className={showNaCheckbox ? 'markNaAutoActivea' : ''}>
                      {renderNACheckbox(checkDisableFlag, 'Autocomplete')}
                    </span>
                    <span style={`${showNaCheckbox}` ? { flexGrow: 10 } : ''}>
                      <QuestionDatePickerWithIdleStateDetection
                        value={answerValue}
                        resetDate={resetDate}
                        handleDayChange={handleDayChange}
                        onFocus={() => {
                          // call question lock
                          questionLockWrapper(questionId);
                          callSelectRow(true);
                        }}
                        onBlur={() => {
                          questionUnlockWrapper(questionId);
                          callSelectRow(false);
                        }}
                        disabled={checkDisableFlag() || isNotApplicable}
                      />
                    </span>
                  </span>
                </SFAnswerValidationWrapper>
              </Grid>
            )}
            <Grid item xs={2}>
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
