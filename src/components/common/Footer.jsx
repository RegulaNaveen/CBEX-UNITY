import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from 'apollo-react/components/Footer';
import PropTypes from 'prop-types';
import Sync from 'apollo-react-icons/Sync';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import Banner from 'apollo-react/components/Banner';
import Lock from 'apollo-react-icons/Lock';

import { PROPOSAL } from '../../constants/app';
import SwitchTemplate from '../views/modals/SwitchTemplate';
import { getSelectedBid } from '../../redux/selectors/proposal';
import {
  getOpportunity,
  updateSwitchInProgress,
  updateSwitchTempStatusFromWebSocket
} from '../../redux/actions/proposal-actions';
import ProcessingCRM from '../views/modals/ProcessingCRM';

const UnityFooter = ({ questionTemplateVersionNumber, opportunityType }) => {
  const selectedBidState = useSelector(getSelectedBid);
  const selectedBidId = selectedBidState.get('id');
  const selectedBidIsCurrent = !!selectedBidState.get('isCurrent');
  const { id: opportunityId } = useParams(); // Get Opportunity id from Url

  // Component States
  const [openSwitchTempModal, setOpenSwitchTempModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [otProcessing, setOtProcessing] = useState(false);
  const dispatch = useDispatch();

  // Footer text with template information
  let templateVersion = null;
  if (!isEmpty(questionTemplateVersionNumber)) {
    templateVersion = (
      <>
        {PROPOSAL.QUESTION_TEMP_VERSION}: {questionTemplateVersionNumber}{' '}
        {!isEmpty(opportunityType) && `- ${opportunityType}`}
      </>
    );
  }

  // Get switchTempStatus from Redux Store
  const switchTempStatus = useSelector(
    state => state.proposal.toJSON().switchTempCallStatus
  );

  // Get switchTempInProgress from Redux Store
  const switchTempInProgress = useSelector(
    state => state.proposal.toJSON().switchTempInProgress
  );

  /**
   * Trigger Modal onUpdate switchTempInProgress state
   */
  useEffect(() => {
    setOtProcessing(switchTempInProgress);
  }, [switchTempInProgress]);

  /**
   * Trigger Modal onUpdate switchTempStatus state
   */
  useEffect(() => {
    if (switchTempStatus === 'success') {
      dispatch(getOpportunity(opportunityId)).then(() => {
        dispatch(updateSwitchInProgress(false));
        setAlertModal(true);
        dispatch(updateSwitchTempStatusFromWebSocket(false));
      });
    }
    if (switchTempStatus === 'error') {
      setAlertModal(true);
      dispatch(updateSwitchTempStatusFromWebSocket(false));
    }
  }, [switchTempStatus]);

  /**
   * Render Switch Temp Error/Success Modal
   */
  let renderAlertModal;
  if (alertModal) {
    let modalMsg = PROPOSAL.SWITCH_TEMP_SUCCESS;
    let variant = 'success';

    switch (switchTempStatus) {
      case 'error':
        modalMsg = PROPOSAL.SWITCH_TEMP_FAILED;
        variant = 'error';
        break;
      default:
        break;
    }

    renderAlertModal = (
      <Banner
        open={alertModal}
        message={modalMsg}
        onClose={() => setAlertModal(false)}
        variant={variant}
      />
    );
  }

  useEffect(() => {
    let timeout;
    if (alertModal) timeout = setTimeout(() => setAlertModal(false), 10000);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [alertModal]);

  return (
    <>
      <Footer
        className="unity-footer"
        maxWidth="100%"
        buttonProps={
          templateVersion
            ? [
                {
                  label: !switchTempStatus ? PROPOSAL.SWITCH_TEMP : '',
                  icon: switchTempStatus ? (
                    <Lock fontSize="extraSmall" />
                  ) : (
                    <Sync fontSize="extraSmall" />
                  ),
                  size: 'small',
                  disabled: !!switchTempStatus,
                  className: classNames('switch-temp-btn', 'no-animation', {
                    'display-none': !selectedBidIsCurrent,
                    'red-btn': !!switchTempStatus
                  }),
                  onClick: () => {
                    setAlertModal(false);
                    setOpenSwitchTempModal(prev => !prev);
                  }
                },
                { label: templateVersion, className: 'ques-temp-info' }
              ]
            : [{ label: '', style: { display: 'none' } }]
        }
      />

      {otProcessing && (
        <ProcessingCRM
          isOpen={otProcessing}
          title={PROPOSAL.SWITCH_TEMP_PROGRESS_TITLE}
          message={PROPOSAL.SWITCH_TEMP_PROGRESS_MSG}
        />
      )}

      {/* Switch Template Modal */}
      {openSwitchTempModal && (
        <SwitchTemplate
          open={openSwitchTempModal}
          setOpenModal={setOpenSwitchTempModal}
          opportunityType={opportunityType || ''}
          selectedBidId={selectedBidId}
        />
      )}

      {/* Warning Modal */}
      {renderAlertModal}
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
