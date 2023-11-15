import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { OrderedMap } from 'immutable';

import { useLazyLoad, useUpdateEffect } from '../../../hooks';
import CollapsibleList from '../../common/CollapsibleList';
import { SocketContext } from '../../../context/SocketContext';
import { QuestionsRefContext } from './Questions';
import { selectSections } from '../../../redux/selectors';
import { SECTIONS } from '../../../constants/app';

const NUM_PER_PAGE = 2;

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
  onAddQuestion,
  onExpandDone
}) => {
  const socketContext = useContext(SocketContext);
  const [allSections, setAllSections] = useState(new OrderedMap([]));
  const [resetLazy, setResetLazy] = useState(false);
  const [resetData, setResetData] = useState(false);
  const triggerRef = useRef(null);
  const sectionsData = isQuestionsFiltersEnabled ? filteredSections : sections;

  const bidId = useSelector(
    state => state.proposal.get('selectedBid').toJS().id
  );

  useEffect(() => {
    if (allSectionsExpanded) {
      if (isQuestionsFiltersEnabled) {
        setResetData(true);
        return;
      }
      setResetLazy(true);
    }
  }, [allSectionsExpanded, bidId]);

  useEffect(() => {
    setTimeout(() => {
      socketContext.questionLockDetailsWrapper();
    }, 2000);
  }, []);

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
  const renderAllSection = (section, indx) => {
    let showSection = true;
    const sectionName = section.get('sectionName');

    const sectionData = section.toJS();
    const sectionOrder = section.get('sectionOrder');

    const questions = section.get('questions');
   
    const isVisible = Object.values(sectionData.questions).some(
      val => val.questionApproval === false
    );
    if (isVisible) {
      showSection = true;
    } else {
      showSection = false;
    }

    if (
      sectionName !== SECTIONS.KEY_MILESTONES_AND_DELIVERABLE_TIMELINES &&
      sectionName !== SECTIONS.PROPOSAL_TEAM &&
      sectionName !== SECTIONS.QUESTIONS_FOR_CUSTOMER_LEFT_PANEL
    )
      return (
        <QuestionsRefContext.Consumer key={sectionName}>
          {questionsRef => {
            if (showSection) {
              return (
                <CollapsibleList
                  data-testid="question-section-test-id"
                  questions={questions}
                  title={sectionName}
                  milestone={filterMilestone}
                  key={sectionOrder}
                  setTabFromQuestionNotes={(val, title, flag) =>
                    setTabFromQuestionNotes(val, title, flag)
                  }
                  onAddQuestion={value => onAddQuestion(value)}
                  isCheckedAll={
                    sidebarscroll &&
                    sidebarscroll.length &&
                    sidebarscroll === sectionName
                      ? true
                      : allSectionsExpanded
                  }
                  isFirstSection={indx < 1}
                  setQuestionToDisplayHistory={setQuestionToDisplayHistory}
                  isNotepadOpen={isNotepadOpen}
                  listIndex={indx}
                  questionsRef={questionsRef}
                  onExpandDone={onExpandDone}
                />
              );
            }
          }}
        </QuestionsRefContext.Consumer>
      );
  };

  const allSectionLength = [...allSections.values()].length;

  // Render No Questions UI
  if (!allSectionLength) {
    return <div className="no-ques-opp">No Questions Available</div>;
  }

  // Render all Sections - Collapsed
  if (!allSectionsExpanded || isQuestionsFiltersEnabled) {
    return (
      allSectionLength &&
      allSections.valueSeq().map((section, indx) => {
        if (
          section.get('sectionName') !==
            SECTIONS.QUESTIONS_FOR_CUSTOMER_LEFT_PANEL &&
          section.get('sectionName').trim() !==
            SECTIONS.KEY_MILESTONES_AND_DELIVERABLE_TIMELINES
        )
          return renderAllSection(section, indx);
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
            return renderAllSection(section, indx);
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
