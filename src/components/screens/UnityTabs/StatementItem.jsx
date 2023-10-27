/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
import React, { useMemo, useState, useEffect, useRef } from 'react';
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
import { EditorState } from 'apollo-react/node_modules/draft-js';
import QuestionLabel from './QuestionLabel';
import AnalyticsHOC from '../../HOC/AnalyticsHOC';
import {
  getUnityTabQuestionLoading,
  getPanelStatus
} from '../../../redux/selectors/proposal';
import { getQuestion } from '../../../redux/selectors';
import { getLastAnswer, shouldShowQuestion } from './utils';
import { selectCurrentSearchResult } from '../../../redux/selectors/search';
import ChipView from '../../common/Chip/ChipView';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';
import { compositeDecorator } from '../../common/CustomApolloRichText';

const StatementItem = ({
  questionId = '',
  UnityTabSectionTitle = '',
  disabled,
  eventCategories,
  trackEvent,
  updateQuestionVisibility,
  questionJSON
}) => {
  const question = useSelector(getQuestion(questionId));
  const unityTabQuestionLoading = useSelector(
    getUnityTabQuestionLoading
  ).toJS();
  const panelStatus = useSelector(state => getPanelStatus(state));
  const unityTabFilters = useSelector(state => state.unitytab.filters);
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const isShowQuestion = shouldShowQuestion(question, unityTabFilters, flags);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const questionTextRef = useRef(null);
  const questionTextRef1 = useRef();
  const questionTextRef2 = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [screenWidth, setScreenWidth] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    updateQuestionVisibility(questionId, isShowQuestion);
  }, [unityTabFilters]);

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
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resize); // doubt -Akash

    resize();
    setTimeout(() => {
      // updating question text with decorators
      if (questionTextRef1.current !== null) {
        const { editorState } = questionTextRef1.current.state;
        const newEditorState = EditorState.set(editorState, {
          decorator: compositeDecorator
        });
        questionTextRef1.current.setState({ editorState: newEditorState });
      }
    }, 100);
  }, []);

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
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            <InfoIcon className="info-icon" style={{ fontSize: '16px' }} />
          </IconButton>
          <Popover
            className="popover-custom-tab"
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
                maxInlineSize: '300px',
                overflowWrap: 'break-word'
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
                      {questionJSON ? (
                        <RichTextEditor
                          style={{ minHeight: '0px' }}
                          variant="view"
                          defaultValue={JSON.parse(questionJSON)}
                          ref={questionTextRef1}
                        />
                      ) : (
                        <Typography className="ques-title">
                          {question.questionText}
                        </Typography>
                      )}
                    </div>

                    <div className="question-hint">{renderQuestionHint()}</div>
                  </div>
                  <div className="milestone-chip">{renderTags()}</div>
                </div>
              </Grid>

              <Grid item xs={finalGrid[1]} />
            </Grid>
          </Box>
        </>
      ) : null,
    [
      question,
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

StatementItem.defaultProps = {
  disabled: false,
  updateQuestionVisibility: () => {}
};
StatementItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  UnityTabSectionTitle: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  eventCategories: PropTypes.object.isRequired,
  trackEvent: PropTypes.func.isRequired,
  updateQuestionVisibility: PropTypes.func
};

export default AnalyticsHOC(StatementItem);
