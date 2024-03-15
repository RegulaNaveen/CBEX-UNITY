import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import Grid from 'apollo-react/components/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Box from 'apollo-react/components/Box';
import Typography from 'apollo-react/components/Typography';
import IconButton from 'apollo-react/components/IconButton';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import InfoIcon from 'apollo-react-icons/Info';
import Popover from 'apollo-react/components/Popover';
import { EditorState } from 'apollo-react/node_modules/draft-js';
import { Map as IMap, List, fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import CalendarIcon from './CalendarIcon';
import QuestionLabel from './QuestionLabel';
import AnswerHistory from '../../views/modals/AnswerHistory';
import ANSWER_TYPES from '../../../constants/answerTypes';
import { parseMomentDate } from '../../../utils/DateUtils';
import { getCountriesNameForCode } from '../../../utils/utils';
import TextQuestion from './InputComponents/TextQuestion';
import NumberQuestion from './InputComponents/NumberQuestion';
import DateQuestion from './InputComponents/DateQuestion';
import RadioQuestion from './InputComponents/RadioQuestion';
import SelectQuestion from './InputComponents/SelectQuestion';
import MultiSelectQuestion from './InputComponents/MultiSelectQuestion';
import YesNoQuestion from './InputComponents/YesNoQuestion';
import CheckBoxQuestion from './InputComponents/CheckBoxQuestion';
import ProposalTeamQuestion from './InputComponents/ProposalTeamQuestion';
import { getUserName, getUserEmail, getUserId } from '../../../SessionHandler';
import { SocketContext } from '../../../context/SocketContext';
import SFAnswerValidationWrapper from '../../common/SFAnswerValidationWrapper';
import AnalyticsHOC from '../../HOC/AnalyticsHOC';
import {
  getOpportunityData,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import CustomLoader from './CustomLoader';
import { getLastAnswer, shouldShowQuestion } from './utils';
import { getQuestion } from '../../../redux/selectors';
import { selectCurrentSearchResult } from '../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';
import withIdleStateDetection from '../../HOC/IdleStateDetector';
import { compositeDecorator } from '../../common/CustomApolloRichText';
import { Edit } from '../../svg';
import {
  setEditQuestionData,
  setProposalAnswerData
} from '../../../redux/actions/proposal-actions';
import { TableAnswer } from '../../common/atoms/TableAnswer';
import { cloneDeep, isEqual, merge } from 'lodash';
import { diffArrays } from 'diff';

const DateQuestionWithIdleStateDetection = withIdleStateDetection(DateQuestion);
const SelectQuestionWithIdleStateDetection =
  withIdleStateDetection(SelectQuestion);
const MultiSelectQuestionWithIdleStateDetection =
  withIdleStateDetection(MultiSelectQuestion);
const YesNoQuestionWithIdleStateDetection =
  withIdleStateDetection(YesNoQuestion);

const CheckBoxQuestionWithIdleStateDetection =
  withIdleStateDetection(CheckBoxQuestion);

const TableAnswerWithIdleStateDetection = withIdleStateDetection(TableAnswer);

const QuestionItem = ({
  questionId = '',
  questionHint,
  questionHintJSON,
  approvalSectionTitle = '',
  disabled,
  isQuesFreezed,
  archivedQuestion,
  eventCategories,
  trackEvent,
  updateQuestionVisibility,
  highlightQuestionId
}) => {
  const [locked, setLocked] = useState(false);
  const question = isQuesFreezed
    ? archivedQuestion
    : useSelector(getQuestion(questionId));
  const activeQuestionInfo = useSelector(getQuestion(questionId));
  const approvalFilters = useSelector(state => state.approvals.filters);
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const isShowQuestion = shouldShowQuestion(question, approvalFilters, flags);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const questionTextRef = useRef(null);
  const questionTextRef1 = useRef(null);
  const questionTextRef2 = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [screenWidth, setScreenWidth] = useState('');
  const [showLastAnswer, setshowLastAnswer] = useState(false);
  const dispatch = useDispatch();

  const resize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resize); // doubt -Akash

    resize();
    setTimeout(() => {
      // updating question text with decorators
      if (questionTextRef1.current !== null) {
        const editorState = questionTextRef1?.current?.state?.editorState;
        const newEditorState = EditorState.set(editorState, {
          decorator: compositeDecorator
        });
        questionTextRef1.current.setState({ editorState: newEditorState });
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (
      !isQuesFreezed &&
      activeQuestionInfo &&
      activeQuestionInfo.questionLockInfo
    ) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [isQuesFreezed, activeQuestionInfo]);
  useEffect(() => {
    if (currentSearchResult !== null && questionTextRef.current !== null) {
      if (currentSearchResult.searchIndex === highlightQuestionId) {
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
  }, [questionTextRef.current, currentSearchResult, highlightQuestionId]);

  useEffect(() => {
    // Calculates the no of visibile questions
    // Used to decide the visibility of a Section
    if (!isQuesFreezed) {
      updateQuestionVisibility(questionId, isShowQuestion);
    }
  }, [approvalFilters]);

  const socketContext = useContext(SocketContext);

  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const [isShowHistory, setIsShowHistory] = useState(false);

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const proposalId = selectedBid?.id;
  const opportunityData = allOppData[proposalId];

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  const checkLastAnswerOfQuestionVisibility = answers => {
    if (answers && Array.isArray(answers) && !answers.length) {
      return false;
    } else {
      const lastAnswerVisibility = String(answers?.answer)?.trim()?.length;
      if (lastAnswerVisibility) {
        return true;
      } else {
        return false;
      }
    }
  };

  const prepareAnswerHistoryData = questionData => {
    let questionMap = fromJS(questionData);
    try {
      // This Logic was copy pasted from src/components/screens/opportunity/Questions.jsx
      // It prepares answer data for a specific answer type.
      // If possible move this logic inside AnswerHistory component to avoid duplication of code
      const answerConfigType = questionMap
        .get('answerConfiguration', IMap({ type: '' }))
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

  const trackEventSubmitAnswer = answer => {
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
      action: `Approval Question: ${questionText} (${sectionName}) (${approvalSectionTitle})`,
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
            approvalSectionTitle
          })
        }
      ]
    });
  };

  async function handleTableValueChange(newValue, lastAnswer) {
    const { proposalId, questionId } = question;
    let lastAnswerValue;
    if (
      lastAnswer &&
      lastAnswer.get('answer') &&
      lastAnswer.get('answer') !== ' ' &&
      lastAnswer.get('answer') !== 'N/A'
    ) {
      lastAnswerValue = JSON.parse(lastAnswer.get('answer'));
      // compare prev and next answers and do a save

      const rowsDiff = diffArrays(lastAnswerValue.rows, newValue.rows, {
        comparator: isEqual
      });
      const columnsDiff = diffArrays(
        lastAnswerValue.columns,
        newValue.columns,
        {
          comparator: isEqual
        }
      );
      if (
        rowsDiff.some(row => row.added || row.removed) ||
        columnsDiff.some(column => column.added || column.removed)
      ) {
        await dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            JSON.stringify(newValue),
            getUserData()
          )
        );
      }
    } else {
      // it's a new answer
      await dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          JSON.stringify({ ...newValue }), // stringified value
          getUserData()
        )
      );
    }
  }

  const renderQuestion = () => {
    const lastAnswer = getLastAnswer(question);
    const lastAnswerMap = IMap(lastAnswer);
    let isAnswerPredicted = false;
    let answerDate = 'Not Answered';

    if (lastAnswerMap) {
      if (
        lastAnswerMap.get &&
        lastAnswerMap.get('date') &&
        lastAnswerMap.get('date').length
      ) {
        answerDate = parseMomentDate(lastAnswerMap.get('date'));
      }
      if (
        lastAnswerMap.get &&
        lastAnswerMap.get('userName') &&
        lastAnswerMap.get('userName').length &&
        lastAnswerMap.get('userName') === 'UnityPredictedAnswer'
      ) {
        isAnswerPredicted = true;
        answerDate = 'Not Answered';
      }
    }

    const checkDisableFlag = () => locked || disabled;
    const {
      questionText,
      questionTableConfig: tableConfiguration,
      questionHint,
      questionHintJSON,
      section,
      answers,
      questionId
    } = question;
    const inputProps = {
      question,
      lastAnswer,
      disabled,
      userData: getUserData(),
      socketContext,
      trackEventSubmitAnswer,
      checkDisableFlag
    };
    if (
      inputProps.lastAnswer &&
      inputProps.lastAnswer.userName === 'UnityPredictedAnswer'
    ) {
      trackEventSubmitAnswer(inputProps.lastAnswer.answer);
    }
    if (question?.section?.sectionName === 'Proposal Team') {
      return <ProposalTeamQuestion {...inputProps} />;
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
      case ANSWER_TYPES.TABLE: {
        let jsonTableConfig = {};

        if (lastAnswer.answer) {
          // parse JSON from lastAnswer
          const tableConfigJSON = JSON.parse(tableConfiguration);
          try {
            if (lastAnswer.answer === ' ' || lastAnswer.answer === 'N/A') {
              jsonTableConfig = tableConfigJSON;
            } else {
              const noConfigTableAnswer = JSON.parse(lastAnswer.answer);
              jsonTableConfig = merge(
                cloneDeep(tableConfigJSON),
                noConfigTableAnswer
              );
            }
            const defaultColumnsLength = tableConfigJSON.columns.length;
            const defaultRowsLength = tableConfigJSON.rows.length;

            if (Array.isArray(jsonTableConfig.columns)) {
              jsonTableConfig.columns = cloneDeep(jsonTableConfig.columns).map(
                (column, colIndex) => ({
                  ...column,
                  canEdit:
                    colIndex <= defaultColumnsLength - 1
                      ? jsonTableConfig.canEditColumn
                      : column.canEdit
                })
              );
            }
            if (Array.isArray(jsonTableConfig.rows)) {
              jsonTableConfig.rows = cloneDeep(jsonTableConfig.rows).map(
                (row, rowIndex) => ({
                  ...row,
                  canEdit:
                    rowIndex <= defaultRowsLength - 1
                      ? jsonTableConfig.canEditRow
                      : row.canEdit
                })
              );
            }
          } catch (e) {
            // if any error in parsing JSON, set answer to default table configuration
            console.error('Error parsing table answer', e);
            jsonTableConfig = tableConfigJSON;
          }
        } else {
          jsonTableConfig = JSON.parse(tableConfiguration);
          if (Array.isArray(jsonTableConfig.columns)) {
            jsonTableConfig.columns = cloneDeep(jsonTableConfig.columns).map(
              column => ({
                ...column,
                canEdit: jsonTableConfig.canEditColumn
              })
            );
          }
          if (Array.isArray(jsonTableConfig.rows)) {
            jsonTableConfig.rows = cloneDeep(jsonTableConfig.rows).map(row => ({
              ...row,
              canEdit: jsonTableConfig.canEditRow
            }));
          }
        }
        return (
          <TableAnswerWithIdleStateDetection
            {...inputProps}
            questionText={questionText}
            tableConfiguration={jsonTableConfig}
            questionHint={questionHint}
            questionHintJSON={questionHintJSON}
            section={IMap(section)}
            sectionName={approvalSectionTitle}
            answers={answers}
            answered={isAnswered(lastAnswerMap, isAnswerPredicted)}
            lastAnswer={lastAnswerMap}
            onChange={handleTableValueChange}
            disabled={checkDisableFlag()}
            onFocus={() => {
              questionLockWrapper(questionId);
            }}
            onBlur={() => questionUnlockWrapper(questionId)}
          />
        );
      }
      default:
        return <FallbackComponent />;
    }
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
        <div className="question-hint" style={{ paddingLeft: '10px' }}>
          <IconButton
            data-testid="approval-icon-button"
            color="primary"
            size="small"
            className="question-tooltip-icon"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <InfoIcon style={{ fontSize: '16px' }} />
          </IconButton>
          <Popover
            data-testid="popover-approval"
            className="popover-approval"
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            PaperProps={{
              style: {
                borderColor: '#e9e9e9',
                boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
                padding: 10,
                maxInlineSize: '300px'
              }
            }}
          >
            <Typography>
              {questionHintJSON ? (
                <RichTextEditor
                  variant="view"
                  defaultValue={JSON.parse(questionHintJSON)}
                  ref={handleHintRef}
                />
              ) : (
                <div>{questionHint}</div>
              )}
            </Typography>
          </Popover>
        </div>
      );
    }
    return null;
  };

  const isAnswered = (answer, isAnswerPredicted) => {
    if (isAnswerPredicted) return false;
    if (answer && answer.get && answer.get('answer')) {
      if (List.isList(answer.get('answer'))) {
        return Boolean(answer.get('answer').size);
      }
      return Boolean(answer.get('answer').toString().trim());
    }
    return false;
  };

  const questionRender = useMemo(
    () =>
      isShowQuestion ? (
        <>
          <Box
            data-testid="question-item-id"
            mt={2}
            className={classNames({
              'question-active':
                currentSearchResult !== null &&
                currentSearchResult.searchIndex === highlightQuestionId
            })}
          >
            <Grid container>
              <Grid item xs={10} className="ques-title-cover">
                <span
                  ref={questionTextRef}
                  //className="question-label-container"
                >
                  <Grid
                    item
                    xs={10}
                    style={{
                      display: 'flex',
                      float: 'left',
                      paddingTop: '4px'
                    }}
                  >
                    <QuestionLabel
                      questionJSON={question?.questionJSON || ''}
                      questionLabel={question?.questionText || ''}
                      questionTextRef1={questionTextRef1}
                    />
                    {question.isCustomQuestion &&
                      (selectedBid.isCurrent || selectedBid.isEditable) &&
                      !isQuesFreezed && (
                        <div
                          className="question-edit"
                          style={{ 'margin-left': '10px' }}
                        >
                          <span
                            aria-hidden="true"
                            data-testid="question-edit"
                            onClick={() => {
                              dispatch(
                                setEditQuestionData({
                                  questionText: question?.questionText,
                                  questionHTML: question?.questionHTML,
                                  questionJSON: question?.questionJSON,
                                  questionHintJSON: question?.questionHintJSON,
                                  section:
                                    question?.section.approvalSectionName,
                                  answerType:
                                    question?.answerConfiguration.type,
                                  roleNames: question?.roleNames,
                                  questionId: question?.questionId,
                                  tabFlag: 'Approvals',
                                  direction: 'left',
                                  questionAnswered:
                                    checkLastAnswerOfQuestionVisibility(
                                      question?.answers
                                    )
                                })
                              );
                            }}
                          >
                            <Edit className="edit-icon" />
                          </span>
                        </div>
                      )}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: 'flex',
                      float: 'left'
                    }}
                  >
                    {renderQuestionHint()}
                  </Grid>
                </span>
              </Grid>
              {locked ? (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" className="status-txt">
                    {activeQuestionInfo.questionLockInfo?.userName} is typing...
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={10} className="answer-input">
                {renderQuestion()}
              </Grid>
              <Grid item xs={2} className="answer-actions">
                <IconButton
                  size="small"
                  data-testid="answer-actions"
                  onClick={() => {
                    setIsShowHistory(true);
                  }}
                >
                  <CalendarIcon question={question} />
                </IconButton>
                {!isQuesFreezed && (
                  <CustomLoader questionId={question.questionId} />
                )}
              </Grid>
            </Grid>
          </Box>

          {/* Answer History Component */}
          {isShowHistory && (
            <AnswerHistory
              question={prepareAnswerHistoryData(question)}
              tab="Approval"
              isQuesFreezed={!!isQuesFreezed}
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
      approvalFilters,
      currentSearchResult,
      highlightQuestionId,
      locked,
      anchorEl
    ]
  );

  // Component will return null in case of empty question value
  if (isEmpty(question)) return null;

  return questionRender;
};

QuestionItem.defaultProps = {
  disabled: false,
  isQuesFreezed: false,
  archivedQuestion: {
    proposalId: '',
    questionId: '',
    questionText: '',
    answerConfiguration: {
      type: 'number'
    },
    answers: [],
    visible: false,
    active: false
  },
  updateQuestionVisibility: () => {}
};
QuestionItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  approvalSectionTitle: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  isQuesFreezed: PropTypes.any,
  eventCategories: PropTypes.object.isRequired,
  trackEvent: PropTypes.func.isRequired,
  archivedQuestion: PropTypes.any,
  updateQuestionVisibility: PropTypes.func
};

export default AnalyticsHOC(QuestionItem);
