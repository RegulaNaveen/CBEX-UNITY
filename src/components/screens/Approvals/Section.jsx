import React, { useState, createContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
// eslint-disable-next-line import/no-extraneous-dependencies
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Loader from 'apollo-react/components/Loader';
import isEmpty from 'lodash/isEmpty';
import Highlighter from 'react-highlight-words';

import CustomAccordion from '../../common/CustomAccordion/CustomAccordion';
import CustomAccordionSummary from '../../common/CustomAccordion/CustomAccordionSummary';
import SectionActive from './SectionActive';
import SectionFreezed from './SectionFreezed';
import { shouldShowSection } from './utils';
import {
  selectQuery,
  selectAutoNavigatedToCurrentResult,
  selectCurrentSearchResult
} from '../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';

export const ApprovalContext = createContext();

const Section = ({ sectionId, title, testVisibility }) => {
  const [expanded, setExpanded] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [isAllActiveDisplayed, setIsAllActiveDisplayed] = useState(true);
  const [sectionVisibility, setSectionVisibility] = useState(true);
  const dispatchLoadingEvent = (actionType, payload) => {
    if (actionType === 'SET_LOADING') {
      setSectionLoading(payload);
    }
  };
  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const approvalFilters = useSelector(state => state.approvals.filters);
  const query = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );
  const sectionTitleRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSectionVisibility(shouldShowSection(sectionId));
  }, [approvalFilters]);

  useEffect(() => {
    let shouldExpand = expanded;
    if (
      currentSearchResult !== null &&
      sectionTitleRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      const questionAndSectionTitleIds = [];
      approval.ArchivedData.forEach((archive, index) => {
        questionAndSectionTitleIds.push(
          `${archive.section_id}-archive-${index}-section-title`
        );
        archive.section_left_questions.forEach(question => {
          questionAndSectionTitleIds.push(
            `${question.questionId}-archive-${index}-left-ques`
          );
        });
        archive.section_right_questions.forEach(question => {
          questionAndSectionTitleIds.push(
            `${question.questionId}-archive-${index}-right-ques`
          );
        });
      });
      approval.ApprovalSectionLeftQuestions.forEach(questionId => {
        questionAndSectionTitleIds.push(
          `${questionId}-approval-${sectionId}-left-ques`
        );
      });
      approval.ApprovalSectionRightQuestions.forEach(questionId => {
        questionAndSectionTitleIds.push(
          `${questionId}-approval-${sectionId}-right-ques`
        );
      });

      if (currentSearchResult.searchIndex === sectionId) {
        setTimeout(() => {
          sectionTitleRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 500);
      } else if (
        questionAndSectionTitleIds.includes(currentSearchResult.searchIndex)
      ) {
        shouldExpand = true;
      } else {
        shouldExpand = false;
      }
      if (expanded !== shouldExpand) {
        setExpanded(shouldExpand);
      }
    }
  }, [currentSearchResult, sectionId, dispatch, approval, expanded]);

  const { ArchivedData = [] } = approval;
  const style = { display: !isAllActiveDisplayed ? 'none' : '' };

  return (
    <>
      {sectionVisibility || testVisibility ? (
        <ApprovalContext.Provider
          value={{ sectionLoading, dispatchLoadingEvent }}
        >
          <CustomAccordion
            className="accordion-container"
            expanded={expanded}
            onChange={() => setExpanded(prev => !prev)}
            style={style}
          >
            <CustomAccordionSummary>
              <p className="accordion-title" ref={sectionTitleRef}>
                <Highlighter
                  searchWords={[
                    `${
                      currentSearchResult !== null &&
                      currentSearchResult.searchIndex === sectionId
                        ? query
                        : ''
                    }`
                  ]}
                  autoEscape={true}
                  textToHighlight={`${title}${
                    !isEmpty(ArchivedData) ? ' 1' : ''
                  }`}
                />
              </p>
            </CustomAccordionSummary>
            <AccordionDetails className="accordion-body">
              {/* Modal Loading */}
              {sectionLoading && <Loader isInner />}

              {/* Render all SectionFreezed Component */}
              {!isEmpty(ArchivedData) &&
                ArchivedData.map((item, index) => (
                  <SectionFreezed archiveIndex={index} {...item} />
                ))}

              {/* Component for Active Active */}
              <SectionActive
                {...omit(approval, ['ArchivedData'])}
                setIsAllActiveDisplayed={setIsAllActiveDisplayed}
              />
            </AccordionDetails>
          </CustomAccordion>
        </ApprovalContext.Provider>
      ) : null}
    </>
  );
};

Section.defaultProps = {
  testVisibility: false // Used only for unit testing
};
Section.propTypes = {
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  testVisibility: PropTypes.bool
};

export default React.memo(Section);
