import React, { useContext } from 'react';
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

const ActionButtons = ({ sectionId }) => {
  const { id: proposalId = '' } = useSelector(getSelectedBid)?.toJS();
  const { dispatchLoadingEvent } = useContext(ApprovalContext);
  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const { ArchivedData = [] } = approval;
  const dispatch = useDispatch();

  return (
    <>
      {!isEmpty(ArchivedData) && (
        <Button
          variant="text"
          size="small"
          icon={<Trash fontSize="extraSmall" />}
          style={{ marginRight: 10 }}
          className="delete-btn"
          onClick={() => {
            dispatchLoadingEvent('SET_LOADING', true);
            (async () => {
              const response = await dispatch(
                deleteApproval(proposalId, sectionId)
              );
              dispatchLoadingEvent('SET_LOADING', false);
              if (!response.status) {
                alert('Api Failed');
              }
            })();
          }}
        >
          Delete
        </Button>
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
              alert('Api Failed');
            }
          })();
        }}
      >
        Duplicate
      </Button>
      <Button
        variant="primary"
        icon={<EmailClick fontSize="extraSmall" />}
        style={{ marginRight: 10 }}
        className="email-btn"
      >
        Email
      </Button>
    </>
  );
};

ActionButtons.propTypes = {
  sectionId: PropTypes.string.isRequired
};

export default ActionButtons;
