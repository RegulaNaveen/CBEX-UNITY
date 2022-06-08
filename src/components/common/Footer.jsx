import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from 'apollo-react/components/Footer';
import PropTypes from 'prop-types';
import Sync from 'apollo-react-icons/Sync';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import { PROPOSAL } from '../../constants/app';
import SwitchTemplate from '../views/modals/SwitchTemplate';
import { getSelectedBid } from '../../redux/selectors/proposal';

const UnityFooter = ({ questionTemplateVersionNumber, opportunityType }) => {
  const selectedBidState = useSelector(getSelectedBid);
  const selectedBidId = selectedBidState.get('id');
  const selectedBidIsCurrent = !!selectedBidState.get('isCurrent');

  // console.log('Footer Component...', {
  //   id: selectedBidId,
  //   isCurrent: selectedBidIsCurrent
  // });

  // Component States
  const [openSwitchTempModal, setOpenSwitchTempModal] = useState(false);

  let templateVersion = null;
  if (!isEmpty(questionTemplateVersionNumber)) {
    templateVersion = (
      <>
        {PROPOSAL.QUESTION_TEMP_VERSION}: {questionTemplateVersionNumber}{' '}
        {!isEmpty(opportunityType) && `- ${opportunityType}`}
      </>
    );
  }

  return (
    <>
      <Footer
        className="unity-footer"
        maxWidth="100%"
        buttonProps={
          templateVersion
            ? [
                {
                  label: PROPOSAL.SWITCH_TEMP,
                  icon: <Sync fontSize="extraSmall" />,
                  size: 'small',
                  className: classNames('switch-temp-btn', 'no-animation', {
                    'display-none': !selectedBidIsCurrent
                  }),
                  onClick: () => setOpenSwitchTempModal(prev => !prev)
                },
                { label: templateVersion, className: 'ques-temp-info' }
              ]
            : [{ label: '', style: { display: 'none' } }]
        }
      />

      {/* Switch Template Modal */}
      {openSwitchTempModal && (
        <SwitchTemplate
          open={openSwitchTempModal}
          onClose={() => setOpenSwitchTempModal(prev => !prev)}
          opportunityType={opportunityType || ''}
          selectedBidId={selectedBidId}
        />
      )}
    </>
  );
};

UnityFooter.defaultProps = {
  questionTemplateVersionNumber: 'v0.01',
  opportunityType: PROPOSAL.OPPORTUNITY_TYPE
};

UnityFooter.propTypes = {
  questionTemplateVersionNumber: PropTypes.string,
  opportunityType: PropTypes.string
};

export default UnityFooter;
