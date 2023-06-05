import React, { useState, createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import AccordionDetails from '@mui/material/AccordionDetails';
import Loader from 'apollo-react/components/Loader';
import Highlighter from 'react-highlight-words';
import CustomAccordion from '../../common/CustomAccordion/CustomAccordion';
import CustomAccordionSummary from '../../common/CustomAccordion/CustomAccordionSummary';
import SectionActive from './SectionActive';
import { shouldShowSection } from './utils';
import {
  selectQuery,
  selectCurrentSearchResult,
  selectAutoNavigatedToCurrentResult
} from '../../../redux/selectors/search';
import { getProposalQuestions } from '../../../redux/selectors/proposal';
import { autoNavigationCompletedAction } from '../../../redux/actions/search-actions';

export const UnityTabContext = createContext();

const Section = ({ sectionId, title, tabId }) => {
  const [expanded, setExpanded] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [isAllActiveDisplayed, setIsAllActiveDisplayed] = useState(true);
  const [sectionVisibility, setSectionVisibility] = useState(true);
  const dispatchLoadingEvent = (actionType, payload) => {
    if (actionType === 'SET_LOADING') {
      setSectionLoading(payload);
    }
  };
  const unityTabSection = useSelector(state => state.unitytab.allTabs);
  const tabSection = unityTabSection[tabId].find(
    i => i.UnityTabSectionId === sectionId
  );
  const unityTabFilters = useSelector(state => state.unitytab.filters);
  const query = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const questions = useSelector(getProposalQuestions);
  const sectionTitleRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const result = shouldShowSection(sectionId, tabId, flags);
    setSectionVisibility(result);
  }, [tabId, unityTabFilters, tabSection, flags, questions]);

  useEffect(() => {
    let shouldExpand = expanded;
    if (
      currentSearchResult !== null &&
      sectionTitleRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      const questionAndSectionTitleIds = tabSection.UnityTabSectionQuestions;
      if (currentSearchResult.searchIndex === title) {
        setTimeout(() => {
          sectionTitleRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 700);
      } else if (
        questionAndSectionTitleIds.includes(currentSearchResult.searchIndex) &&
        ((currentSearchResult.sectionName !== null &&
          currentSearchResult.sectionName === title) ||
          currentSearchResult.sectionName === null)
      ) {
        shouldExpand = true;
      } else {
        shouldExpand = false;
      }
      if (expanded !== shouldExpand) {
        setExpanded(shouldExpand);
      }
    }
  }, [currentSearchResult, title, dispatch, tabSection, expanded]);

  const style = { display: !isAllActiveDisplayed ? 'none' : '' };
  return (
    <>
      {sectionVisibility ? (
        <UnityTabContext.Provider
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
                      currentSearchResult.searchIndex === title &&
                      query !== null
                        ? query
                        : ''
                    }`
                  ]}
                  autoEscape={true}
                  textToHighlight={`${title}`}
                  highlightClassName="search-highlight"
                />
              </p>
            </CustomAccordionSummary>
            <AccordionDetails className="accordion-body">
              {/* Modal Loading */}
              {sectionLoading && <Loader isInner />}

              {/* Component for Active Active */}
              <SectionActive
                {...tabSection}
                setIsAllActiveDisplayed={setIsAllActiveDisplayed}
                tabId={tabId}
              />
            </AccordionDetails>
          </CustomAccordion>
        </UnityTabContext.Provider>
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
  testVisibility: PropTypes.bool,
  tabId: PropTypes.string.isRequired
};

export default React.memo(Section);
