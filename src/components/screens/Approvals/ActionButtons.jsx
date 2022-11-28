import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trash from 'apollo-react-icons/Trash';
import EmailClick from 'apollo-react-icons/EmailClick';
import isEmpty from 'lodash/isEmpty';
import Button from 'apollo-react/components/Button';
import PropTypes from 'prop-types';
import { ApprovalContext } from './Section';
import {
  deleteApproval,
  duplicateApproval,
} from '../../../redux/actions/approval-actions';
import { getOpportunityData, getSelectedBid } from '../../../redux/selectors/proposal';
import { DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import MatomoHOC from '../../HOC/MatomoHOC';

const ActionButtons = ({ sectionId, trackEvent, eventCategories }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id: proposalId = '' } = useSelector(getSelectedBid)?.toJS();
  const { dispatchLoadingEvent } = useContext(ApprovalContext);
  const [warning, setWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const { ArchivedData = [] } = approval;

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const P_Id = selectedBid?.id;
  const opportunityData = allOppData[P_Id];


  const dispatch = useDispatch();

  const deleteAfterConfirmHandler = () => {
    setShowDeleteModal(false);
    dispatchLoadingEvent('SET_LOADING', true);
    (async () => {
      const response = await dispatch(deleteApproval(proposalId, sectionId));
      if (response) {
        trackMatomoEventSubmitAnswer('Delete', approval);
      }
      dispatchLoadingEvent('SET_LOADING', false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      }
    })();
  };
  const deleteEventMatomo = (action, aprovaldata) => {
    const proposalDetail = opportunityData?.proposal?.proposalDetails;
    const { ApprovalSectionTitle, ApprovalSectionOrder } = aprovaldata;
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval ${action}`,
      name: `Approval Answer: ${action}: (${ApprovalSectionTitle}) (${ApprovalSectionOrder})`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            proposalDetail,
            aprovaldata
          })
        }
      ]
    });
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval ${action}`,
      name: `Approval Answer: ${action} click event`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            proposalDetail,
            aprovaldata
          })
        }
      ]
    });
  }

  const duplicateEventMatomo = (action, aprovaldata) => {
    const proposalDetail = opportunityData?.proposal?.proposalDetails;
    const { ApprovalSectionTitle, ApprovalSectionOrder } = aprovaldata;
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval ${action}`,
      name: `Approval Answer: ${action}: (${ApprovalSectionTitle}) (${ApprovalSectionOrder})`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            proposalDetail,
            aprovaldata
          })
        }
      ]
    });
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval ${action}`,
      name: `Approval Answer: ${action}: click event`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            proposalDetail,
            aprovaldata
          })
        }
      ]
    });
  }

  const trackMatomoEventSubmitAnswer = (action, aprovaldata) => {
    if (action == 'Duplicate') {
      duplicateEventMatomo(action, aprovaldata)
    }

    if (action == 'Delete') {
      deleteEventMatomo(action, aprovaldata)
    }

    if (action == 'Email') {
      duplicateEventMatomo(action, aprovaldata)
    }
  };

  return (
    <>
      {!isEmpty(ArchivedData) && (
        <>
          <Button
            variant="text"
            size="small"
            icon={<Trash fontSize="extraSmall" />}
            style={{ marginRight: 10 }}
            className="delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            {DEFAULT.DELETE}
          </Button>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <CustomModal
              open={showDeleteModal}
              title="Alert"
              message="The content of that approval section will be removed."
              variant="warning"
              onClose={() => setShowDeleteModal(false)}
              buttonProps={[
                {},
                {
                  label: 'Yes, Delete',
                  onClick: deleteAfterConfirmHandler
                }
              ]}
              modalStyle={{ maxWidth: 460 }}
            />
          )}
        </>
      )}

      <Button
        variant="secondary"
        style={{ marginRight: 10 }}
        className="duplicate-btn"
        onClick={() => {
          dispatchLoadingEvent('SET_LOADING', true);
          (async () => {
            const response = await dispatch(
              duplicateApproval(proposalId, sectionId)
            );
            if (response && response.data) {
              trackMatomoEventSubmitAnswer('Duplicate', response.data);
            }
            dispatchLoadingEvent('SET_LOADING', false);
            if (!response.status) {
              setWarningTitle(response.title);
              setWarningText(response.message);
              setWarning(true);
            }
          })();
        }}
      >
        {DEFAULT.DUPLICATE}
      </Button>
      <Button
        variant="primary"
        icon={<EmailClick fontSize="extraSmall" />}
        style={{ marginRight: 10 }}
        className="email-btn"
      >
        {DEFAULT.EMAIL}
      </Button>

      {/* Warning Modal */}
      {warning && (
        <CustomModal
          open={warning}
          title={warningTitle}
          message={warningText}
          variant="error"
          handleClose={() => setWarning(false)}
          buttonProps={[{ className: 'hidden' }, { label: DEFAULT.CLOSE }]}
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </>
  );


};

ActionButtons.propTypes = {
  sectionId: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired
};

export default MatomoHOC(ActionButtons);

