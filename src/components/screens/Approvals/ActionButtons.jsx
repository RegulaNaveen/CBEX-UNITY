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
import {
  selectCanSendEmail,
  selectQuestionsHash
} from '../../../redux/selectors/approvals';
import {
  generateApprovalEmailInfo,
  generateApprovalEmailURL
} from '../../../utils/emailUtils';
import { getProposalDetails } from '../../../redux/selectors';

const ActionButtons = ({ sectionId }) => {
  const { id: proposalId = '' } = useSelector(getSelectedBid)?.toJS();
  const { dispatchLoadingEvent } = useContext(ApprovalContext);
  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const canSendEmail = useSelector(selectCanSendEmail);
  const questionsMap = useSelector(selectQuestionsHash);
  const proposalDetails = useSelector(getProposalDetails);

  const { ArchivedData = [] } = approval;
  const dispatch = useDispatch();

  async function handleSendEmailClick() {
    const emailInfo = generateApprovalEmailInfo(
      approval,
      Object.values(questionsMap),
      proposalDetails
    );
    if (
      emailInfo.subject &&
      Array.isArray(emailInfo.to) &&
      emailInfo.to.length > 0 &&
      Array.isArray(emailInfo.cc)
    ) {
      try {
        const blob = new Blob([emailInfo.body], { type: 'text/html' });
        const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
        await navigator.clipboard.write([clipboardItem]);
      } catch (e) {
        console.log(
          '[Approvals] ActionButtons: Error in copying approval data to clipboard',
          e
        );
      }
      window.open(
        generateApprovalEmailURL(emailInfo.subject, emailInfo.to, emailInfo.cc)
      );
    } else {
      console.log(
        '[Approvals] ActionButtons: Error in email data. please check subject, to and cc',
        e
      );
    }
  }

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
      {canSendEmail ? (
        <Button
          variant="primary"
          icon={<EmailClick fontSize="extraSmall" />}
          style={{ marginRight: 10 }}
          className="email-btn"
          onClick={handleSendEmailClick}
        >
          Email
        </Button>
      ) : null}
    </>
  );
};

ActionButtons.propTypes = {
  sectionId: PropTypes.string.isRequired
};

export default ActionButtons;
