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
  duplicateApproval
} from '../../../redux/actions/approval-actions';
import { getSelectedBid } from '../../../redux/selectors/proposal';
import { DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';

const ActionButtons = ({ sectionId }) => {
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
  const dispatch = useDispatch();

  const deleteAfterConfirmHandler = () => {
    setShowDeleteModal(false);
    dispatchLoadingEvent('SET_LOADING', true);
    (async () => {
      const response = await dispatch(deleteApproval(proposalId, sectionId));
      dispatchLoadingEvent('SET_LOADING', false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      }
    })();
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
          onClose={() => setWarning(false)}
          buttonProps={[{ className: 'hidden' }, { label: DEFAULT.CLOSE }]}
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </>
  );
};

ActionButtons.propTypes = {
  sectionId: PropTypes.string.isRequired
};

export default ActionButtons;
