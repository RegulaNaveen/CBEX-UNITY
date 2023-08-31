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
import ExclamationTriangle from '../svg/ExclamationTriangle';

import { PROPOSAL } from '../../constants/app';
import SwitchTemplate from '../views/modals/SwitchTemplate';
import { getSelectedBid } from '../../redux/selectors/proposal';
import {
  getOpportunity,
  updateSwitchInProgress,
  updateSwitchTempStatusFromWebSocket
} from '../../redux/actions/proposal-actions';
import { DEFAULT } from '../../constants/app';
import CustomModal from './CustomModal';
import ProcessingCRM from '../views/modals/ProcessingCRM';
import { fetchOTListData } from '../../redux/actions/proposal-actions';

const UnityFooter = ({ questionTemplateVersionNumber, opportunityType }) => {
  const selectedBidState = useSelector(getSelectedBid);
  const selectedBidId = selectedBidState.get('id');
  const selectedBidIsCurrent = !!selectedBidState.get('isCurrent');
  const { id: opportunityId } = useParams(); // Get Opportunity id from Url

  // Component States
  const [openSwitchTempModal, setOpenSwitchTempModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [otProcessing, setOtProcessing] = useState(false);
  const [pubTempVersion, setPubTempVersion] = useState('');
  const [otList, setOtList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
        const className = '._question-tab > div > div > button:nth-child(1)';
        if (document && document.querySelector(className)) {
          document.querySelector(className).click();
        }
      });
    }
    if (switchTempStatus === 'error') {
      setAlertModal(true);
      dispatch(updateSwitchTempStatusFromWebSocket(false));
    }
  }, [switchTempStatus]);

  /**
   * Fetch OT list from Api
   */
  const fetchOtList = () => {
    dispatch(fetchOTListData()).then(res => {
      if (res.status) {
        setOtList(res.data['Opportunity Type']);
        setPubTempVersion(res.data['Publish Version']);
      } else {
        setError(true);
        setErrorMsg(res.msg);
      }
    });
  };

  /**
   * Trigger fetchOTList func when component load
   */
  useEffect(() => {
    fetchOtList();
  }, [questionTemplateVersionNumber, opportunityType]);

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

  // Refresh btn enable/disable logic
  const isBtnDisabledRefresh = questionTemplateVersionNumber 
  && pubTempVersion === questionTemplateVersionNumber;
    
  return (
    <>
      <Footer
        className="unity-footer"
        maxWidth="100%"
        data-testid="footer"
        buttonProps={
          templateVersion
            ? [
                {
                  label: !switchTempStatus ? PROPOSAL.SWITCH_TEMP : '',
                  icon: switchTempStatus ? (
                    <Lock fontSize="extraSmall" />
                  ) : (
                    <>
                      {pubTempVersion 
                        && !isBtnDisabledRefresh 
                        && <ExclamationTriangle data-testid="update-triangle" />}
                      <Sync 
                        fontSize="extraSmall" 
                        data-testid="sync-icon" 
                        style={{ marginRight: "5px"}} 
                      />
                    </>
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
          data-testid="switch-template"
          setOpenModal={setOpenSwitchTempModal}
          opportunityType={opportunityType || ''}
          selectedBidId={selectedBidId}
          otList={otList}
          isBtnDisabledRefresh={isBtnDisabledRefresh}
        />
      )}

      {/* Warning Modal */}
      {renderAlertModal}

      {/* Error Warning Modal */}
      {error && (
        <CustomModal
          open={error}
          title={DEFAULT.ALERT}
          message={errorMsg}
          variant="error"
          onClose={() => setError(false)}
          buttonProps={[
            { className: 'display-none' },
            { label: DEFAULT.CLOSE }
          ]}
          className="switch-temp-warning-modal"
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
