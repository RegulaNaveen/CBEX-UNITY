import React, { useMemo, useState, useEffect, useRef } from 'react';
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
import isEmpty from 'lodash/isEmpty';
import QuestionLabel from './QuestionLabel';
import { getUserName, getUserEmail, getUserId } from '../../../SessionHandler';
import MatomoHOC from '../../HOC/MatomoHOC';
import {
  getOpportunityData,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import { shouldShowQuestion } from './utils';
import { getQuestion } from '../../../redux/selectors';
import { selectCurrentSearchResult } from '../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';
import { compositeDecorator } from '../../common/CustomApolloRichText';

const StatementItem = ({
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
  const question = isQuesFreezed
    ? archivedQuestion
    : useSelector(getQuestion(questionId));
  const activeQuestionInfo = useSelector(getQuestion(questionId));
  const approvalFilters = useSelector(state => state.approvals.filters);
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const isShowQuestion = shouldShowQuestion(question, approvalFilters, flags);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const questionTextRef = useRef(null);
  const questionTextRef2 = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

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

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const proposalId = selectedBid?.id;
  const opportunityData = allOppData[proposalId];

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

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
                <span ref={questionTextRef}>
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
                      questionLabel={question?.questionText || ''}
                    />
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
            </Grid>
          </Box>
        </>
      ) : null,
    [
      question,
      isShowQuestion,
      approvalFilters,
      currentSearchResult,
      highlightQuestionId,
      anchorEl
    ]
  );

  // Component will return null in case of empty question value
  if (isEmpty(question)) return null;

  return questionRender;
};

StatementItem.defaultProps = {
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
StatementItem.propTypes = {
  questionId: PropTypes.string.isRequired,
  approvalSectionTitle: PropTypes.string.isRequired,
  disabled: PropTypes.any,
  isQuesFreezed: PropTypes.any,
  eventCategories: PropTypes.object.isRequired,
  trackEvent: PropTypes.func.isRequired,
  archivedQuestion: PropTypes.any,
  updateQuestionVisibility: PropTypes.func
};

export default MatomoHOC(StatementItem);
