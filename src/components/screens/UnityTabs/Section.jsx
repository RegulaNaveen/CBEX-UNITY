import React, { useState, createContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Loader from 'apollo-react/components/Loader';
import Highlighter from 'react-highlight-words';
import CustomAccordion from '../../common/CustomAccordion/CustomAccordion';
import CustomAccordionSummary from '../../common/CustomAccordion/CustomAccordionSummary';
import SectionActive from './SectionActive';
import { shouldShowSection } from './utils';
import {
  selectQuery,
  selectCurrentSearchResult
} from '../../../redux/selectors/search';

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
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    const result = shouldShowSection(sectionId, tabId);
    setSectionVisibility(result);
  }, [tabId, unityTabFilters, tabSection]);

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
                      currentSearchResult.searchIndex === sectionId &&
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
