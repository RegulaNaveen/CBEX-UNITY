import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { OrderedMap } from 'immutable';

import { useLazyLoad, useUpdateEffect } from '../../../hooks';
import CollapsibleList from '../../common/CollapsibleList';

const NUM_PER_PAGE = 4;

const QuestionsSectionMapping = ({
  sections,
  filteredSections,
  isQuestionsFiltersEnabled,
  filterMilestone,
  allSectionsExpanded,
  sidebarscroll,
  isNotepadOpen,
  setQuestionToDisplayHistory,
  setTabFromQuestionNotes,
  onAddQuestion
}) => {
  const [allSections, setAllSections] = useState(new OrderedMap([]));
  const [resetLazy, setResetLazy] = useState(false);
  const [resetData, setResetData] = useState(false);
  const triggerRef = useRef(null);
  const sectionsData = isQuestionsFiltersEnabled ? filteredSections : sections;

  const bidId = useSelector(
    state => state.proposal.get('selectedBid').toJS().id
  );

  // Reset Lazy onUpdate allSectionsExpanded
  useEffect(() => {
    if (allSectionsExpanded) {
      if (isQuestionsFiltersEnabled) {
        setResetData(true);
        return;
      }
      setResetLazy(true);
    }
  }, [allSectionsExpanded, bidId]);

  // Get filtered Sections logic
  const getFilteredSections = useMemo(() => {
    return sectionsData.valueSeq().filter(section => {
      const questions = section.get('questions');
      return questions
        .valueSeq()
        .map(
          question =>
            question.get('visible', true) &&
            (question.get('active', true) ||
              question.get('isCustomQuestion', true))
        )
        .includes(true);
    });
  }, [isQuestionsFiltersEnabled, filteredSections, sections]);

  // Set allSections onUpdate Sections/Filtered data
  useEffect(() => {
    // Set allSections data
    if (!isEqual(sectionsData, allSections))
      setAllSections(getFilteredSections);

    // Reset Lazy Data
    if (isQuestionsFiltersEnabled) setResetData(true);
  }, [isQuestionsFiltersEnabled, filteredSections, sections]);

  /**
   * Get limited Section Data for Lazy Loading
   */
  const onGrabData = currentPage => {
    // console.log({ currentPage });
    setResetLazy(false);
    return new Promise(resolve => {
      setTimeout(() => {
        const data = allSections
          .valueSeq()
          .slice((currentPage - 1) * NUM_PER_PAGE, NUM_PER_PAGE * currentPage);
        resolve(data);
      }, 300);
    });
  };

  // useLazyLoad Hook for Lazy Loading
  const { data, loading } = useLazyLoad({
    triggerRef,
    onGrabData,
    resetLazy,
    resetData
  });

  // Compare length between LazyData & allSectionsData
  const checkDataIsEqual = isEqual(
    [...allSections.values()].length,
    data.length
  );

  // Reset LazyData state onUpdate LazyData
  useUpdateEffect(() => setResetData(false), [data]);

  // Func to render CollapsibleList Component
  const renderAllSection = section => {
    const sectionName = section.get('sectionName');
    const questions = section.get('questions');
    return (
      <CollapsibleList
        questions={questions}
        title={sectionName}
        milestone={filterMilestone}
        key={sectionName}
        setTabFromQuestionNotes={(val, title, flag) =>
          setTabFromQuestionNotes(val, title, flag)
        }
        onAddQuestion={value => onAddQuestion(value)}
        isCheckedAll={
          sidebarscroll && sidebarscroll.length && sidebarscroll === sectionName
            ? true
            : allSectionsExpanded
        }
        setQuestionToDisplayHistory={setQuestionToDisplayHistory}
        isNotepadOpen={isNotepadOpen}
      />
    );
  };

  // Render all Sections - Collapsed
  if (!allSectionsExpanded || isQuestionsFiltersEnabled) {
    return (
      !isEmpty(allSections) &&
      allSections.valueSeq().map(section => {
        return renderAllSection(section);
      })
    );
  }

  // Render all Sections - Expanded
  return (
    <>
      {!isEmpty(data) &&
        data.map((_, indx) => {
          if (indx + 1 <= [...allSections.values()].length) {
            const section = [...allSections.values()][indx];
            return renderAllSection(section);
          }
          return null;
        })}

      {/* Loading UI for more section */}
      {!checkDataIsEqual && (
        <div
          ref={triggerRef}
          className={classNames('trigger', { visible: loading })}
        >
          Loading...
        </div>
      )}
    </>
  );
};

QuestionsSectionMapping.defaultProps = {
  sections: new OrderedMap([]),
  filteredSections: new OrderedMap([]),
  isQuestionsFiltersEnabled: false,
  filterMilestone: true,
  allSectionsExpanded: false,
  sidebarscroll: '',
  isNotepadOpen: true,
  setQuestionToDisplayHistory: () => {},
  setTabFromQuestionNotes: () => {},
  onAddQuestion: () => {}
};

QuestionsSectionMapping.propTypes = {
  sections: PropTypes.object,
  filteredSections: PropTypes.object,
  isQuestionsFiltersEnabled: PropTypes.bool,
  filterMilestone: PropTypes.bool,
  allSectionsExpanded: PropTypes.bool,
  sidebarscroll: PropTypes.string,
  isNotepadOpen: PropTypes.bool,
  setQuestionToDisplayHistory: PropTypes.func,
  setTabFromQuestionNotes: PropTypes.func,
  onAddQuestion: PropTypes.func
};

export default QuestionsSectionMapping;
