import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trash from 'apollo-react-icons/Trash';
import EmailClick from 'apollo-react-icons/EmailClick';
import isEmpty from 'lodash/isEmpty';
import Button from 'apollo-react/components/Button';
import Tooltip from 'apollo-react/components/Tooltip';
import PropTypes from 'prop-types';
import { ApprovalContext } from './Section';
import {
  deleteApproval,
  duplicateApproval
} from '../../../redux/actions/approval-actions';
import {
  getOpportunityData,
  getSelectedBid,
  selectProposalQuestions
} from '../../../redux/selectors/proposal';
import { selectCanSendEmail } from '../../../redux/selectors/approvals';
import {
  generateApprovalEmailInfo,
  generateApprovalEmailURL
} from '../../../utils/emailUtils';
import { getProposalDetails } from '../../../redux/selectors';
import { APPROVALS, DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import MatomoHOC from '../../HOC/MatomoHOC';
import { cloneDeep } from 'lodash';
import { SocketContext } from '../../../context/SocketContext';
import { getUserEmail } from '../../../SessionHandler';

const ActionButtons = ({
  sectionId,
  trackEvent,
  eventCategories,
  proposalId,
  selectedBidIsCurrent
}) => {
  const { dispatchLoadingEvent } = useContext(ApprovalContext);
  const {
    approvalSectionDuplicatingWrapper,
    approvalSectionDuplicatedWrapper,
    approvalSectionDeletingWrapper,
    approvalSectionDeletedWrapper
  } = useContext(SocketContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const [sectionLocked, setSectionLocked] = useState(false);
  const approval = useSelector(state =>
    state.approvals.allApprovals.find(i => i.ApprovalSectionId === sectionId)
  );
  const canSendEmail = useSelector(selectCanSendEmail);
  const proposalDetails = useSelector(getProposalDetails);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const approvalFilters = useSelector(state => state.approvals.filters);
  const questions = useSelector(selectProposalQuestions);

  const { ArchivedData = [] } = approval;

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const pId = selectedBid?.id;
  const opportunityData = allOppData[pId];

  const dispatch = useDispatch();

  useEffect(() => {
    let questionIds = [];
    if (approval) {
      questionIds = approval.ApprovalSectionLeftQuestions.concat(
        approval.ApprovalSectionRightQuestions
      );
    }
    const approvalSectionQuestions = questions.filter(question =>
      questionIds.includes(question.questionId)
    );
    const lockStatus = approvalSectionQuestions.some(
      question =>
        question.questionLockInfo &&
        question.questionLockInfo.userInfo !== getUserEmail()
    );
    setSectionLocked(lockStatus);
  }, [approval, questions]);

  const deleteEventMatomo = (action, aprovaldata) => {
    const proposalDetail = opportunityData?.proposal?.proposalDetails;
    const { ApprovalSectionTitle } = aprovaldata;
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval ${action}`,
      name: `Approval: ${action}: ${ApprovalSectionTitle} ${ArchivedData.length +
        1}`,
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
      name: `Approval: Duplicate Count: ${ArchivedData.length - 1}`,
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
  };

  const duplicateEventMatomo = (action, aprovaldata) => {
    try {
      const proposalDetail = opportunityData?.proposal?.proposalDetails;
      const { ApprovalSectionTitle } = aprovaldata;
      trackEvent({
        category: eventCategories.crmNo,
        action: `Approval: creation`,
        name: `Approval Answer: creation: ${ApprovalSectionTitle} ${ArchivedData.length +
          2}`,
        customDimensions: [
          {
            id: 1,
            value: JSON.stringify({
              proposalDetail,
              aprovaldata,
              totalApproval: ArchivedData.length + 1
            })
          }
        ]
      });
      trackEvent({
        category: eventCategories.crmNo,
        action: `Approval:  ${action} count`,
        name: `Approval Answer: Approval ${action} count: ${ArchivedData.length +
          1}`,
        customDimensions: [
          {
            id: 1,
            value: JSON.stringify({
              proposalDetail,
              aprovaldata,
              totalApproval: ArchivedData.length + 1
            })
          }
        ]
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const emailEventMatomo = (action, aprovaldata) => {
    const proposalDetail = opportunityData?.proposal?.proposalDetails;
    const { ApprovalSectionTitle } = aprovaldata;
    trackEvent({
      category: eventCategories.crmNo,
      action: `Approval ${action}`,
      name: `Approval: ${action}: ${ApprovalSectionTitle} ${ArchivedData.length +
        1}`,
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
  };

  const trackMatomoEventSubmitAnswer = (action, aprovaldata) => {
    if (action === 'Duplicate') {
      duplicateEventMatomo(action, aprovaldata);
    }

    if (action === 'Delete') {
      deleteEventMatomo(action, aprovaldata);
    }

    if (action === 'Email') {
      emailEventMatomo(action, aprovaldata);
    }
  };

  async function handleSendEmailClick() {
    const emailInfo = generateApprovalEmailInfo(
      approval,
      cloneDeep(proposalQuestions),
      proposalDetails,
      approvalFilters,
      flags
    );
    trackMatomoEventSubmitAnswer('Email', approval);
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
  }
  const deleteAfterConfirmHandler = () => {
    setShowDeleteModal(false);
    approvalSectionDeletingWrapper({
      sectionId,
      deleting: true
    });
    dispatchLoadingEvent('SET_LOADING', true);
    (async () => {
      const response = await dispatch(deleteApproval(proposalId, sectionId));
      if (response) {
        trackMatomoEventSubmitAnswer('Delete', approval);
      }
      approvalSectionDeletingWrapper({
        sectionId,
        deleting: false
      });
      dispatchLoadingEvent('SET_LOADING', false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      } else {
        approvalSectionDeletedWrapper({
          sectionId,
          proposalId
        });
      }
    })();
  };

  // Delete & Duplicate Button Jsx
  let renderDeleteAndDuplicate = null;
  if (selectedBidIsCurrent) {
    renderDeleteAndDuplicate = (
      <>
        {!isEmpty(ArchivedData) && (
          <Tooltip
            title={
              sectionLocked ? APPROVALS.ACTION_BUTTON_LOCKED_TOOLTIP_MSG : ''
            }
          >
            <span style={{ display: 'inline-block' }}>
              <Button
                variant="text"
                size="small"
                icon={<Trash fontSize="extraSmall" />}
                style={{ marginRight: 10 }}
                className="delete-btn"
                onClick={() => setShowDeleteModal(true)}
                disabled={sectionLocked}
              >
                {DEFAULT.DELETE}
              </Button>
            </span>
          </Tooltip>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <CustomModal
            open={showDeleteModal}
            title={DEFAULT.ARE_YOU_SURE}
            message={APPROVALS.DELETE_MSG}
            variant="error"
            onClose={() => setShowDeleteModal(false)}
            buttonProps={[
              {},
              {
                label: DEFAULT.DELETE,
                onClick: deleteAfterConfirmHandler
              }
            ]}
            className="approvals-delete-confirm-modal"
          />
        )}
        <Tooltip
          title={
            sectionLocked ? APPROVALS.ACTION_BUTTON_LOCKED_TOOLTIP_MSG : ''
          }
        >
          <span style={{ display: 'inline-block' }}>
            <Button
              disabled={sectionLocked}
              variant="secondary"
              style={{ marginRight: 10 }}
              className="duplicate-btn"
              onClick={() => {
                approvalSectionDuplicatingWrapper({
                  sectionId,
                  duplicating: true
                });
                dispatchLoadingEvent('SET_LOADING', true);
                (async () => {
                  const response = await dispatch(
                    duplicateApproval(proposalId, sectionId)
                  );
                  approvalSectionDuplicatingWrapper({
                    sectionId,
                    duplicating: false
                  });
                  dispatchLoadingEvent('SET_LOADING', false);
                  trackMatomoEventSubmitAnswer('Duplicate', approval);
                  if (!response.status) {
                    setWarningTitle(response.title);
                    setWarningText(response.message);
                    setWarning(true);
                  } else {
                    approvalSectionDuplicatedWrapper({
                      sectionId,
                      proposalId
                    });
                  }
                })();
              }}
            >
              {DEFAULT.DUPLICATE}
            </Button>
          </span>
        </Tooltip>
      </>
    );
  }

  return (
    <>
      {/* Render Delete & Duplicate Buttons */}
      {renderDeleteAndDuplicate}

      {/* Email Button */}
      {canSendEmail ? (
        <Button
          variant="primary"
          icon={<EmailClick fontSize="extraSmall" />}
          style={{ marginRight: 10 }}
          className="email-btn"
          onClick={handleSendEmailClick}
        >
          {DEFAULT.EMAIL}
        </Button>
      ) : null}

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
  sectionId: PropTypes.string.isRequired,
  trackEvent: PropTypes.func.isRequired,
  eventCategories: PropTypes.object.isRequired,
  proposalId: PropTypes.string.isRequired,
  selectedBidIsCurrent: PropTypes.bool.isRequired
};

export default MatomoHOC(ActionButtons);
