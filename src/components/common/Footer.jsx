import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from 'apollo-react/components/Footer';
import PropTypes from 'prop-types';
import Sync from 'apollo-react-icons/Sync';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

import { DEFAULT, PROPOSAL } from '../../constants/app';
import SwitchTemplate from '../views/modals/SwitchTemplate';
import { getSelectedBid } from '../../redux/selectors/proposal';
import CustomModal from './CustomModal';
import { updateSwitchTempStatusFromWebSocket } from '../../redux/actions/proposal-actions';

const UnityFooter = ({ questionTemplateVersionNumber, opportunityType }) => {
  const selectedBidState = useSelector(getSelectedBid);
  const selectedBidId = selectedBidState.get('id');
  const selectedBidIsCurrent = !!selectedBidState.get('isCurrent');

  // Component States
  const [openSwitchTempModal, setOpenSwitchTempModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const dispatch = useDispatch();

  let templateVersion = null;
  if (!isEmpty(questionTemplateVersionNumber)) {
    templateVersion = (
      <>
        {PROPOSAL.QUESTION_TEMP_VERSION}: {questionTemplateVersionNumber}{' '}
        {!isEmpty(opportunityType) && `- ${opportunityType}`}
      </>
    );
  }

  const switchTempStatus = useSelector(
    state => state.proposal.toJSON().switchTempCallStatus
  );

  /**
   * Trigger Modal onUpdate switchTempStatus state
   */
  useEffect(() => {
    if (switchTempStatus === 'success' || switchTempStatus === 'error')
      setAlertModal(true);
  }, [switchTempStatus]);

  /**
   * Render Switch Temp Error/Success Modal
   */
  let renderAlertModal;
  if (alertModal) {
    let modalTitle;
    let modalMsg;
    let variant;

    switch (switchTempStatus) {
      case 'success':
        modalTitle = DEFAULT.SUCCESS;
        modalMsg = PROPOSAL.SWITCH_TEMP_SUCCESS;
        variant = 'success';
        break;
      case 'error':
        modalTitle = DEFAULT.ALERT;
        modalMsg = PROPOSAL.SWITCH_TEMP_FAILED;
        variant = 'error';
        break;
      default:
        break;
    }

    renderAlertModal = (
      <CustomModal
        open={alertModal}
        title={modalTitle}
        message={modalMsg}
        variant={variant}
        onClose={() => {
          setAlertModal(false);
          dispatch(updateSwitchTempStatusFromWebSocket(false));
        }}
        buttonProps={[{ className: 'display-none' }, { label: DEFAULT.CLOSE }]}
        modalStyle={{ maxWidth: 342 }}
      />
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
