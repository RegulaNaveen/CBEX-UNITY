/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import { isEmpty, isString } from 'lodash';
import Grid from 'apollo-react/components/Grid';
import PropTypes from 'prop-types';
import InfoIcon from 'apollo-react-icons/Info';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Box from 'apollo-react/components/Box';
import Typography from 'apollo-react/components/Typography';
import Popover from 'apollo-react/components/Popover';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import IconButton from 'apollo-react/components/IconButton';
import { Map, List, fromJS } from 'immutable';
import moment from 'moment';
import { EditorState } from 'apollo-react/node_modules/draft-js';
import QuestionLabel from './QuestionLabel';
import AnswerHistory from '../../views/modals/AnswerHistory';
import ANSWER_TYPES from '../../../constants/answerTypes';
import { getCountriesNameForCode } from '../../../utils/utils';
import { getUserName, getUserEmail, getUserId } from '../../../SessionHandler';
import { SocketContext } from '../../../context/SocketContext';
import SFAnswerValidationWrapper from '../../common/SFAnswerValidationWrapper';
import MatomoHOC from '../../HOC/MatomoHOC';
import {
  getOpportunityData,
  getSelectedBid,
  getUnityTabQuestionLoading,
  getPanelStatus
} from '../../../redux/selectors/proposal';
import { getIntegrations, getQuestion } from '../../../redux/selectors';
import { getLastAnswer, shouldShowQuestion } from './utils';
import { selectCurrentSearchResult } from '../../../redux/selectors/search';
import ChipView from '../../common/Chip/ChipView';
import { parseMomentDate } from '../../../utils/DateUtils';
import SystemIntegrations from '../../common/SystemIntegrations/SystemIntegrations';
import EventLauncher from '../Opportunity/EventLauncher';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';
import withIdleStateDetection from '../../HOC/IdleStateDetector';
import { compositeDecorator } from '../../common/CustomApolloRichText';

import TextQuestion from './InputComponents/TextQuestion';
import NumberQuestion from '../Approvals/InputComponents/NumberQuestion';
import DateQuestion from '../Approvals/InputComponents/DateQuestion';
import RadioQuestion from '../Approvals/InputComponents/RadioQuestion';
import SelectQuestion from '../Approvals/InputComponents/SelectQuestion';
import MultiSelectQuestion from '../Approvals/InputComponents/MultiSelectQuestion';
import YesNoQuestion from '../Approvals/InputComponents/YesNoQuestion';
import CheckBoxQuestion from '../Approvals/InputComponents/CheckBoxQuestion';
import ProposalTeamQuestion from '../Approvals/InputComponents/ProposalTeamQuestion';

const DateQuestionWithIdleStateDetection = withIdleStateDetection(DateQuestion);
const SelectQuestionWithIdleStateDetection = withIdleStateDetection(
  SelectQuestion
);
const MultiSelectQuestionWithIdleStateDetection = withIdleStateDetection(
  MultiSelectQuestion
);
const YesNoQuestionWithIdleStateDetection = withIdleStateDetection(
  YesNoQuestion
);

const CheckBoxQuestionWithIdleStateDetection = withIdleStateDetection(
  CheckBoxQuestion
);

const QuestionItem = ({
  questionId = '',
  UnityTabSectionTitle = '',
  disabled,
  eventCategories,
  trackEvent,
  updateQuestionVisibility
}) => {
  const [locked, setLocked] = useState(false);
  const question = useSelector(getQuestion(questionId));
  const unityTabQuestionLoading = useSelector(
    getUnityTabQuestionLoading
  ).toJS();
  const oppdata = useSelector(state => getOpportunityData(state));
  const panelStatus = useSelector(state => getPanelStatus(state));
  const integrationsData = useSelector(state => getIntegrations(state));
  const unityTabFilters = useSelector(state => state.unitytab.filters);
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const isShowQuestion = shouldShowQuestion(question, unityTabFilters, flags);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const [screenSize, setScreen] = useState('');
  const [iconColor, seticonColor] = useState('#00c221');
  const [changeIcon, setchangeIcon] = useState('');
  const questionTextRef = useRef(null);
  const questionTextRef2 = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    updateQuestionVisibility(questionId, isShowQuestion);
  }, [unityTabFilters]);

  useEffect(() => {
    if (question && question.questionLockInfo) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [question]);

  useEffect(() => {
    if (currentSearchResult !== null && questionTextRef.current !== null) {
      if (
        currentSearchResult.searchIndex === questionId &&
        ((currentSearchResult.sectionName !== null &&
          currentSearchResult.sectionName === UnityTabSectionTitle) ||
          currentSearchResult.sectionName === null)
      ) {
        setTimeout(() => {
          questionTextRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 700);
      }
    }
  }, [questionTextRef.current, currentSearchResult, questionId]);

  const resize = () => {
    setScreen(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const socketContext = useContext(SocketContext);
  const [isShowHistory, setIsShowHistory] = useState(false);

  const selectedBid = useSelector(getSelectedBid);
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const proposalId = selectedBid?.toJS()?.id;
  const opportunityData = allOppData[proposalId];
  const proposalDetail = opportunityData?.proposal?.proposalDetails;
  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  const prepareAnswerHistoryData = questionData => {
    let questionMap = fromJS(questionData);
    try {
      // This Logic was copy pasted from src/components/screens/opportunity/Questions.jsx
      // It prepares answer data for a specific answer type.
      // If possible move this logic inside AnswerHistory component to avoid duplication of code
      const answerConfigType = questionMap
        .get('answerConfiguration', Map({ type: '' }))
        .get('type', '');
      const sfObject = questionMap.get('sfObject', '');
      const sfField = questionMap.get('sfField', '');
      if (
        answerConfigType === ANSWER_TYPES.PICKLIST &&
        (sfObject === 'Bid_History__c' ||
          sfObject === 'Apttus__APTS_Agreement__c') &&
        sfField === 'Targeted_Countries__c'
      ) {
        let newAnswers = questionMap.get('answers', List());
        const questionId = newAnswers.get('questionId');

        if (questionId) newAnswers = newAnswers.getIn(['answers', 'answers']);
        if (newAnswers) {
          newAnswers = newAnswers.map(ans => {
            const newAns = getCountriesNameForCode(ans.get('answer', List()));
            return ans.set('answer', newAns);
          });
          questionMap = questionMap.set('answers', newAnswers);
        }
      }
      // END of copied Logic
      return questionMap;
    } catch (error) {
      console.error(error);
      return questionMap;
    }
  };

  const FallbackComponent = () => {
    return <div>Question type not found</div>;
  };

  const trackMatomoEventSubmitAnswer = answer => {
    const {
      section,
      questionText,
      questionHTML,
      questionJSON,
      questionHintJSON,
      questionId
    } = question;
    const { sectionName } = section;
    const proposalDetail = opportunityData?.proposal?.proposalDetails;
    trackEvent({
      category: eventCategories.crmNo,
      action: `Unity Tab Question: ${questionText} (${sectionName}) (${UnityTabSectionTitle})`,
      name: `Answer: ${answer}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer,
            sectionName,
            questionText,
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId,
            proposalDetail,
            UnityTabSectionTitle
          })
        }
      ]
    });
  };

  const isQuestionLocked = () => {
    return question?.questionLockInfo && question?.questionLockInfo?.userInfo;
  };

  const isQuestionLockedByOther = () => {
    return (
      isQuestionLocked() &&
      getUserEmail() !== question?.questionLockInfo?.userInfo
    );
  };

  const renderQuestion = () => {
    const lastAnswer = getLastAnswer(question);

    const checkDisableFlag = () => locked;
    const inputProps = {
      question,
      lastAnswer,
      disabled,
      userData: getUserData(),
      socketContext,
      trackMatomoEventSubmitAnswer,
      checkDisableFlag
    };
    if (
      inputProps.lastAnswer &&
      inputProps.lastAnswer.userName === 'UnityPredictedAnswer'
    ) {
      trackMatomoEventSubmitAnswer(inputProps.lastAnswer.answer);
    }
    if (question?.section?.sectionName === 'Proposal Team') {
      return (
        <SFAnswerValidationWrapper
          hasDifferentSFanswer={question.hasDifferentSFanswer}
          sfObject={question.sfObject}
        >
          <ProposalTeamQuestion {...inputProps} />
        </SFAnswerValidationWrapper>
      );
    }

    if (
      !Object.values(ANSWER_TYPES).includes(question?.answerConfiguration?.type)
    ) {
      return <FallbackComponent />;
    }

    switch (question?.answerConfiguration?.type) {
      case ANSWER_TYPES.TEXT: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <TextQuestion {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.NUMBER: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <NumberQuestion {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.DATE: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <DateQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.RADIO: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <RadioQuestion {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.SELECT:
      case ANSWER_TYPES.SELECT_LOOKUP: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <SelectQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.PICKLIST_LOOKUP:
      case ANSWER_TYPES.PICKLIST: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <MultiSelectQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.YES_NO: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <YesNoQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      case ANSWER_TYPES.CHECKBOX: {
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={question.hasDifferentSFanswer}
            sfObject={question.sfObject}
          >
            <CheckBoxQuestionWithIdleStateDetection {...inputProps} />
          </SFAnswerValidationWrapper>
        );
      }
      default:
        return <FallbackComponent />;
    }
  };

  const renderTags = () => {
    const { milestone, milestoneNew } = question;
    const lastAnswer = getLastAnswer(question);
    const lastAns = isString(lastAnswer) ? lastAnswer : '';
    if (milestoneNew && !isEmpty(milestoneNew)) {
      return (
        <div className="chipview unity-tab-chip">
          {milestoneNew ? (
            <ChipView label={milestoneNew} answer={lastAns} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="chipview unity-tab-chip">
        {milestone ? <ChipView label={milestone} answer={lastAns} /> : null}
      </div>
    );
  };

  const renderQuestionHint = () => {
    const { questionHint, questionHintJSON } = question;

    function handleHintRef(hintRef) {
      questionTextRef2.current = hintRef;
      setTimeout(() => {
        // updating question hint with decorators
        if (questionTextRef2.current !== null) {
          const editorState = questionTextRef2.current.state.editorState;
          const newEditorState = EditorState.set(editorState, {
            decorator: compositeDecorator
          });
          questionTextRef2.current.setState({ editorState: newEditorState });
        }
      }, 700);
    }

    if (questionHint) {
      return (
        <div className="question-hint">
          <IconButton
            color="primary"
            size="small"
            className="question-tooltip-icon"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >      
            <InfoIcon className="info-icon" style={{ fontSize: '16px' }}/>
          </IconButton>
          <Popover
            className="popover-custom-tab"
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            PaperProps={{
              style: { 
                borderColor: '#e9e9e9', 
                boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)', 
                padding: 10, 
                maxInlineSize: '300px', 
                overflowWrap: 'break-word' 
              },
            }}
          >
            <Typography>{
              questionHintJSON ? (
                <RichTextEditor
                  variant="view"
                  defaultValue={JSON.parse(questionHintJSON)}
                  ref={handleHintRef}
                />
              ) : (
                <div>{questionHint}</div>
              )
            }
            </Typography>
          </Popover>
        </div>
      );
    }
    return null;
  };

  const displayAnswerOnHistory = () => {
    setIsShowHistory(true);
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

  const SystemIcon = unityQuestionStatus => {
    let {
      currentSFanswer,
      sfField,
      answers,
      integration,
      questionId,
      sfObject,
      hasDifferentSFanswer,
      bidAnswerCopy = false,
      latestAnsweredBidNo = null
    } = question;
    const loading =
      unityQuestionStatus?.questionId === questionId &&
      unityQuestionStatus?.value;
    currentSFanswer = Map(currentSFanswer);
    answers = answers.map(v => Map(v));
    answers = List(answers);
    const qID = answers.get('questionId');
    const qvicon = questionId;
    let checkSfAnswer = '';
    let lastAnswer = getLastAnswer(question);
    lastAnswer = Map(lastAnswer);
    let answerDate = 'Not Answered';
    let isAnswerPredicted = false;
    let integrationmatch;
    let integrationvalidation;
    let priceModelerIntegration;
    const sficon = sfField;
    let qvidIntegration = false;
    let destinationArray;
    const currentBidID = selectedBid?.id;
    const oppordata = oppdata.toJS();
    const isCurrentBid = selectedBid.get('isCurrent');
    const deploymentDate = '2022-08-05';
    const proposalTimeStamp = oppordata[currentBidID]?.proposal?.proposalDate;
    const proposalCreationDate = proposalTimeStamp
      ? proposalTimeStamp.substring(0, proposalTimeStamp.indexOf('T'))
      : '';
    const integrationLocked = isQuestionLockedByOther() ? true : false;
    const dateIsAfter = moment(proposalCreationDate).isAfter(
      moment(deploymentDate)
    );
    const answerText = answers?.toJS()[0]?.answer;

    const dateIsBefore = moment(proposalCreationDate).isBefore(
      moment(deploymentDate)
    );
    if (
      typeof currentSFanswer !== 'undefined' &&
      _.isEmpty(currentSFanswer) !== true
    ) {
      checkSfAnswer = currentSFanswer.toJS().value;
    }
    if (dateIsAfter) {
      integrationvalidation = true;
    }
    const integrationsArray = integrationsData?.data.map(item => {
      return item.questionId;
    });
    integrationsData?.data.map(item => {
      if (item.questionId.includes(qvicon)) destinationArray = item.destination;
    });
    integrationvalidation = integrationsArray?.includes(qvicon);

    if (integration) {
      qvidIntegration = true;
    }
    integrationmatch = integrationvalidation;
    if (answers && answers?.size) {
      if (!qID) {
        lastAnswer = answers?.last();
      } else {
        lastAnswer = answers.get('answers')?.last();
      }
    }
    lastAnswer = Map(lastAnswer);
    if (lastAnswer) {
      if (
        lastAnswer.get &&
        lastAnswer.get('date') &&
        lastAnswer.get('date').length
      ) {
        answerDate = parseMomentDate(lastAnswer.get('date'));
      }
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
    const smallScreenWidth = screenSize < 641 ? [8, 4] : [10, 2];
    const mediumScreen =
      screenSize < 950 ? [10, 2] : screenSize < 900 ? [10, 2] : [11, 1];
    const gridColRatio = mediumScreen; //isNotepadOpen ? smallScreenWidth : mediumScreen;

    return (
      <SystemIntegrations
        checkSfAnswer={checkSfAnswer}
        sficon={sficon}
        destinationArray={destinationArray}
        answers={answers}
        gridColRatio={gridColRatio}
        integrationmatch={integrationmatch}
        integrationvalidation={integrationvalidation}
        priceModelerIntegration={priceModelerIntegration}
        answeronhistory={() => displayAnswerOnHistory()}
        answerdate={answerDate}
        isAnswerPredicted={isAnswerPredicted}
        isAnswered={(c, v) => isAnswered(c, v)}
        lastAnswer={lastAnswer}
        iconColor={iconColor}
        loading={loading}
        NaLoading={false}
        showNaCheckbox={false}
        isNotepadOpen={false}
        changeIcon={changeIcon}
        isCurrentBid={isCurrentBid}
        sfObject={sfObject}
        answerText={answerText}
        hasDifferentSFanswer={hasDifferentSFanswer}
        disabled={integrationLocked}
        bidAnswerCopy={bidAnswerCopy}
        latestAnsweredBidNo={latestAnsweredBidNo}
      />
    );
  };

  const trackMatomoEventLauncher = data => {
    trackEvent({
      category: eventCategories.pd(proposalDetail),
      action: `Unity Tab: Event Launcher: ${question.questionText}`,
      customDimensions: [question, data, proposalDetail]
    });
  };
  const fullGrid = [11, 1];
  const mediumGrid = [10, 2];
  let finalGrid = [10, 2];
  const screenResolution = window.screen.availWidth;
  switch (true) {
    case screenResolution >= 1920 && screenResolution < 2300:
      finalGrid = fullGrid;
      break;
    case screenResolution >= 1536 && screenResolution < 1920:
      if (panelStatus) finalGrid = fullGrid;
      else finalGrid = mediumGrid;
      break;
    case screenResolution >= 1280 && screenResolution < 1536:
      if (panelStatus) finalGrid = fullGrid;
      else finalGrid = mediumGrid;
      break;
    case screenResolution >= 1098 && screenResolution < 1280:
      if (panelStatus) finalGrid = fullGrid;
      else finalGrid = mediumGrid;
      break;
    default:
      break;
  }
  const questionRender = useMemo(
    () =>
      isShowQuestion ? (
        <>
          <Box
            mt={2}
            className={classNames({
              'unity-tab-question-item': true,
              'question-active':
                currentSearchResult !== null &&
                currentSearchResult.searchIndex === questionId &&
                currentSearchResult.sectionName !== null &&
                currentSearchResult.sectionName === UnityTabSectionTitle
            })}
          >
            <Grid container>
              <Grid
                item
                xs={finalGrid[0]}
                className="ques-title-cover unity-tab-question"
              >
                <div className="question-label-container">
                  <div className="question-label-inner">
                    <div ref={questionTextRef} className="question-title-txt">
                      <QuestionLabel
                        questionLabel={question?.questionText || ''}
                      />
                      {!isEmpty(question?.questionLockInfo) &&
                      isQuestionLockedByOther() ? (
                        <Typography variant="subtitle1" className="status-txt">
                          {question.questionLockInfo?.userName} is typing...
                        </Typography>
                      ) : null}
                    </div>
                    {question.events && (
                      <EventLauncher
                        questionData={Map(question)}
                        proposalDetail={proposalDetail}
                        eventCategories={eventCategories}
                        trackMatomoEventLauncher={c =>
                          trackMatomoEventLauncher(c)
                        }
                      />
                    )}
                    <div className="question-hint">{renderQuestionHint()}</div>
                  </div>
                  <div className="milestone-chip">{renderTags()}</div>
                </div>
              </Grid>
              <Grid item xs={finalGrid[1]} />
              <Grid item xs={finalGrid[0]} className="answer-input">
                {renderQuestion()}
              </Grid>
              <Grid item xs={finalGrid[1]} className="answer-actions">
                <div className="system-icon-custom-tab">
                  {SystemIcon(unityTabQuestionLoading)}
                </div>
              </Grid>
            </Grid>
          </Box>

          {/* Answer History Component */}
          {isShowHistory && (
            <AnswerHistory
              question={prepareAnswerHistoryData(question)}
              tab="UnityTab"
              closeModal={() => {
                setIsShowHistory(false);
              }}
            />
          )}
        </>
      ) : null,
    [
      question,
      isShowHistory,
      isShowQuestion,
      unityTabFilters,
      currentSearchResult,
      unityTabQuestionLoading,
      finalGrid
      // highlightQuestionId
    ]
  );

  // Component will return null in case of empty question value
  if (isEmpty(question)) return null;

  return questionRender;
};

QuestionItem.defaultProps = {
  disabled: false,
  updateQuestionVisibility: () => {}
};
QuestionItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  UnityTabSectionTitle: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  eventCategories: PropTypes.object.isRequired,
  trackEvent: PropTypes.func.isRequired,
  updateQuestionVisibility: PropTypes.func
};

export default MatomoHOC(QuestionItem);
