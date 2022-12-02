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

export const ApprovalContext = createContext();

const Section = ({ sectionId }) => {
  const [expanded, setExpanded] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [isAllActiveDisplayed, setIsAllActiveDisplayed] = useState(true);
  const dispatchLoadingEvent = (actionType, payload) => {
    if (actionType === 'SET_LOADING') {
      setSectionLoading(payload);
    }
  };

  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const { ApprovalSectionTitle = '', ArchivedData = [] } = approval;

  const style = {
    display: !isAllActiveDisplayed ? 'none' : ''
  };
  return (
    <ApprovalContext.Provider value={{ sectionLoading, dispatchLoadingEvent }}>
      <CustomAccordion
        className="accordion-container"
        expanded={expanded}
        onChange={() => setExpanded(prev => !prev)}
        style={style}
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
          <SectionFreezed archivedData={ArchivedData} />

          {/* Component for Active Active */}
          <SectionActive
            {...omit(approval, ['ArchivedData'])}
            setIsAllActiveDisplayed={setIsAllActiveDisplayed}
          />
        </AccordionDetails>
      </CustomAccordion>
    </ApprovalContext.Provider>
  );
};

Section.propTypes = {
  sectionId: PropTypes.string.isRequired
};

export default React.memo(Section);
