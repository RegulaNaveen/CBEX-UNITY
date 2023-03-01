import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import isEmpty from 'lodash/isEmpty';
import QuestionItem from './QuestionItem';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import {
  selectCurrentSearchResult,
  selectQuery
} from '../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';

const SectionFreezed = ({
  id,
  section_left_questions: leftQues,
  section_right_questions: rightQues,
  section_title: title,
  archiveIndex,
  section_id: sectionId
}) => {
  const query = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const sectionTitleRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      currentSearchResult !== null &&
      sectionTitleRef.current !== null &&
      archiveIndex !== 0
    ) {
      if (
        currentSearchResult.searchIndex ===
        `${sectionId}-archive-${archiveIndex}-section-title`
      ) {
        setTimeout(() => {
          sectionTitleRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 700);
      }
    }
  }, [sectionTitleRef.current, archiveIndex, currentSearchResult, sectionId]);

  return (
    <Grid container className="approval-ques" key={id}>
      <Grid item xs={12}>
        <span className="approval-sec-title" ref={sectionTitleRef}>
          <Highlighter
            searchWords={[
              `${
                currentSearchResult !== null &&
                currentSearchResult.searchIndex ===
                  `${sectionId}-archive-${archiveIndex}-section-title` &&
                query !== null
                  ? query
                  : ''
              }`
            ]}
            autoEscape={true}
            textToHighlight={title}
            highlightClassName="search-highlight"
          />
        </span>
      </Grid>
      <Grid item xs={8} className="approval-ques-left">
        {!isEmpty(leftQues) &&
          leftQues.map(item => {
            if (item.visible && (item.active || item.isCustomQuestion)) {
              return (
                <QuestionItem
                  questionId={item.questionId}
                  approvalSectionTitle={title}
                  key={item.questionId}
                  disabled
                  isQuesFreezed
                  archivedQuestion={item}
                  highlightQuestionId={`${item.questionId}-archive-${archiveIndex}-left-ques`}
                />
              );
            }
            return null;
          })}
      </Grid>
      <Grid item xs={4} className="approval-ques-right">
        {!isEmpty(rightQues) &&
          rightQues.map(item => {
            if (item.visible && (item.active || item.isCustomQuestion)) {
              return (
                <QuestionItem
                  questionId={item.questionId}
                  approvalSectionTitle={title}
                  key={item.questionId}
                  disabled
                  isQuesFreezed
                  archivedQuestion={item}
                  highlightQuestionId={`${item.questionId}-archive-${archiveIndex}-right-ques`}
                />
              );
            }
            return null;
          })}
      </Grid>
      <hr />
    </Grid>
  );
};

SectionFreezed.propTypes = {
  id: PropTypes.string.isRequired,
  section_left_questions: PropTypes.array.isRequired,
  section_right_questions: PropTypes.array.isRequired,
  section_title: PropTypes.string.isRequired
};

export default SectionFreezed;
