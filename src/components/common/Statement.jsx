import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from 'apollo-react/components/Grid';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import Popover from 'apollo-react/components/Popover';
import { EditorState } from 'apollo-react/node_modules/draft-js';
import { compositeDecorator } from './CustomApolloRichText';
import ChipView from './Chip/ChipView';
import {
  selectAutoNavigatedToCurrentResult,
  selectCurrentSearchResult,
  selectPrevSearchResult,
  selectQuery
} from '../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../redux/actions/search-actions';
import { isEmpty } from 'lodash';
import Typography from 'apollo-react/components/Typography';

const Statement = props => {
  const [screenWidth, setScreenWidth] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectRow] = useState(false);
  const quesTextInnerRightRef = useRef();
  const questionTextTitleRef = useRef(null);
  const questionTextRef1 = useRef();
  const questionTextRef2 = useRef();

  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const prevSearchResult = useSelector(selectPrevSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );

  const dispatch = useDispatch();

  const smallScreenWidth = screenWidth < 641 ? [8, 4] : [10, 2];
  const mediumScreen =
    screenWidth < 950 ? [10, 2] : screenWidth < 900 ? [10, 2] : [11, 1];

  const gridColRatio = isNotepadOpen ? smallScreenWidth : mediumScreen;

  const {
    isNotepadOpen,
    questionJSON,
    questionText,
    questionHint,
    questionHintJSON,
    milestone,
    milestoneNew,
    ismilestoneavailable
  } = props;

  const resize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', resize); // doubt -Akash

    resize();
  }, []);

  useEffect(() => {
    const {
      questionId,

      sectionName
    } = props;

    if (
      currentSearchResult !== null &&
      questionTextTitleRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      if (
        currentSearchResult.searchIndex === questionId &&
        ((currentSearchResult.sectionName !== null &&
          currentSearchResult.sectionName === sectionName) ||
          currentSearchResult.sectionName === null)
      ) {
        // allow others to collapse before scrollIntoView
        setTimeout(() => {
          if (questionTextTitleRef.current) {
            questionTextTitleRef.current.scrollIntoView({
              behaviour: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
            setSelectRow(true);
          }
          dispatch(autoNavigationCompletedAction());
        }, 700);
      }
    } else if (
      prevSearchResult !== null &&
      prevSearchResult.searchIndex === questionId &&
      autoNavigatedToCurrentResult
    ) {
      if (sectionName === 'Proposal Team' && prevSearchResult.vTab === 2) {
        setSelectRow(false);
      } else if (
        (currentSearchResult !== null &&
          currentSearchResult.searchIndex !== prevSearchResult.searchIndex) ||
        currentSearchResult === null
      ) {
        setSelectRow(false);
      }
    }
    // updating question text with decorators
    if (questionTextRef1.current !== null) {
      const { editorState } = questionTextRef1.current.state;
      const newEditorState = EditorState.set(editorState, {
        decorator: compositeDecorator
      });
      questionTextRef1.current.setState({ editorState: newEditorState });
    }
  }, [prevSearchResult, currentSearchResult, autoNavigatedToCurrentResult]); // provide dependancy here - Akash

  const handleQuestionHintRef = questionHintRef => {
    questionTextRef2.current = questionHintRef;
    setTimeout(() => {
      // updating question hint with decorators
      if (questionTextRef2.current !== null) {
        const { editorState } = questionTextRef2.current.state;
        const newEditorState = EditorState.set(editorState, {
          decorator: compositeDecorator
        });
        questionTextRef2.current.setState({ editorState: newEditorState });
      }
    }, 700);
  };

  const renderTags = (milestone, milestoneNew, ismilestoneavailable) => {
    if (milestoneNew && !isEmpty(milestoneNew)) {
      return (
        <div className="chipview">
          {milestoneNew ? (
            <ChipView label={milestoneNew} answer={'green'} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="chipview">
        {milestone ? <ChipView label={milestone} answer={'green'} /> : null}
      </div>
    );
  };
  return (
    <>
      <div
        className={`task-table-row question-row ${
          selectedRow ? 'selected-task-table-row' : ''
        }  `}
        style={{ margin: '2px 0px' }}
        data-testid="strategy-development-question"
      >
        <Grid container className="question-title-grid">
          <Grid item xs={gridColRatio[0]} className="question-grid-item">
            {/* Question Text and Milestone */}
            <div className="question-label-container">
              <div
                className="question-label-inner"
                style={{ minHeight: 'auto' }}
              >
                {/* Question Text */}
                <div className="questiontext-richtext">
                  <div
                    className="question-title-txt"
                    ref={questionTextTitleRef}
                  >
                    {questionJSON ? (
                      <RichTextEditor
                        style={{ minHeight: '0px' }}
                        variant="view"
                        defaultValue={JSON.parse(questionJSON)}
                        ref={questionTextRef1}
                      />
                    ) : (
                      <p>{questionText}</p>
                    )}
                  </div>
                </div>

                {/* Question Hint */}
                {questionHint && (
                  <div className="question-hint">
                    <IconButton
                      data-testid="question-tooltip-button"
                      color="primary"
                      size="small"
                      className="question-tooltip-icon"
                      onClick={e => setAnchorEl(e.currentTarget)}
                    >
                      <InfoIcon className="info-icon" />
                    </IconButton>
                    <Popover
                      data-testid="question-popover"
                      className="popover-strategy-question"
                      open={!!anchorEl}
                      anchorEl={anchorEl}
                      onClose={e => setAnchorEl(null)}
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
                            ref={handleQuestionHintRef}
                          />
                        ) : (
                          <div>{questionHint}</div>
                        )}
                      </Typography>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Milestone Chip */}
              <div className="milestone-chip" ref={quesTextInnerRightRef}>
                {renderTags(milestone, milestoneNew, ismilestoneavailable)}
              </div>
            </div>
          </Grid>
          <Grid item xs={gridColRatio[1]} className="empty-grid-item">
            <></>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Statement;
