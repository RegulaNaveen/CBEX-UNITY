import React, { useState, createContext } from 'react';
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

const Section = ({ sectionId }) => {
  const [expanded, setExpanded] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  // const questionHash = useSelector(state => state.approvals.quesHashData);
  const dispatchLoadingEvent = (actionType, payload) => {
    if (actionType === 'SET_LOADING') {
      setSectionLoading(payload);
    }
  };

  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const { ApprovalSectionTitle = '', ArchivedData = [] } = approval;

  const SectionContent = () => (
    <ApprovalContext.Provider value={{ sectionLoading, dispatchLoadingEvent }}>
      <CustomAccordion
        className="accordion-container"
        expanded={expanded}
        onChange={() => setExpanded(prev => !prev)}
      >
        <CustomAccordionSummary>
          <p className="accordion-title">{`${ApprovalSectionTitle}${
            !isEmpty(ArchivedData) ? ' 1' : ''
          }`}</p>
        </CustomAccordionSummary>
        <AccordionDetails className="accordion-body">
          {/* Modal Loading */}
          {sectionLoading && <Loader isInner />}

          {/* Component for all Freezed Approval */}
          {/* <SectionFreezed archivedData={ArchivedData} /> */}

          {/* Component for Active Active */}
          <SectionActive {...omit(approval, ['ArchivedData'])} />
        </AccordionDetails>
      </CustomAccordion>
    </ApprovalContext.Provider>
  );

  // return shouldShowSection(questionHash, approval) ? <SectionContent /> : null;
  return <SectionContent />;
};

Section.propTypes = {
  sectionId: PropTypes.string.isRequired
};

export default React.memo(Section);
