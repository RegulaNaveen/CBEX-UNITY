import React, { useState, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
// eslint-disable-next-line import/no-extraneous-dependencies
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Loader from 'apollo-react/components/Loader';
import isEmpty from 'lodash/isEmpty';

import CustomAccordion from '../../common/CustomAccordion/CustomAccordion';
import CustomAccordionSummary from '../../common/CustomAccordion/CustomAccordionSummary';
import SectionActive from './SectionActive';
import SectionFreezed from './SectionFreezed';
import { shouldShowSection } from './utils';

export const ApprovalContext = createContext();

const Section = ({ sectionId, title }) => {
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

  useEffect(() => {
    console.log('approvalFilters changed and Section rerendered');
    setSectionVisibility(shouldShowSection(sectionId));
  }, [approvalFilters]);

  const { ArchivedData = [] } = approval;
  const style = { display: !isAllActiveDisplayed ? 'none' : '' };

  return (
    <>
      {sectionVisibility ? (
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
              <p className="accordion-title">{`${title}${
                !isEmpty(ArchivedData) ? ' 1' : ''
              }`}</p>
            </CustomAccordionSummary>
            <AccordionDetails className="accordion-body">
              {/* Modal Loading */}
              {sectionLoading && <Loader isInner />}

              {/* Render all SectionFreezed Component */}
              {!isEmpty(ArchivedData) &&
                ArchivedData.map(item => <SectionFreezed {...item} />)}

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

Section.propTypes = {
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default React.memo(Section);
