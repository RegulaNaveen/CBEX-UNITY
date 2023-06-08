import { isEmpty } from 'lodash';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';

import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import {
  fetchAllApprovals,
  fetchApprovalSendEmailFlag
} from '../../../redux/actions/approval-actions';
import {
  getSelectedBid,
  getProposalQuestions
} from '../../../redux/selectors/proposal';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import { DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import Filters from './Filters';
import FilterButton from './FilterButton';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import { SocketContext } from '../../../context/SocketContext';

const Approvals = () => {
  const approvals = useSelector(state => state.approvals.allApprovals);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const questions = useSelector(getProposalQuestions);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);

  // get email flag status on mount
  useEffect(() => {
    if (allFlags && allFlags.approvalSendMailFlag) {
      dispatch(fetchApprovalSendEmailFlag(allFlags.approvalSendMailFlag));
    }
    setTimeout(() => {
      socketContext.questionLockDetailsWrapper();
    }, 2000);
  }, []);

  useEffect(() => {
    const proposalId = memoizeBid?.id;
    if (!proposalId) return () => {};
    setLoading(true);

    (async () => {
      const response = await dispatch(fetchAllApprovals(proposalId, questions));
      setLoading(false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      }
    })();
    return () => {};
  }, [memoizeBid]);

  return (
    <div className="approvals-tab">
      <ViewAboveVerticalTabs>
        <BidHistory data-testid="bid-history" />
      </ViewAboveVerticalTabs>

      <div className="filter-container">
        <div className="filter-btn">
          <FilterButton setIsShowFilters={setIsShowFilters} />
        </div>
        {isShowFilters && <Filters />}
      </div>

      <div className="all-approvals-container">
        {/* Modal Loading */}
        {loading && <Loader isInner />}

        {!isEmpty(approvals) ? (
          approvals.map(approval => (
            <Section
              keyForward={approval.key}
              sectionId={approval.ApprovalSectionId}
              title={approval.ApprovalSectionTitle}
            />
          ))
        ) : (
          <>
            <div className="no-approval-wrapper">
              <Card
                style={{
                  maxWidth: 600,
                  height: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#7f7f7f',
                  padding: '20px'
                }}
              >
                <ClipboardCheck
                  style={{ fontSize: '48px', marginBottom: '10px' }}
                  data-testid="No_approvals"
                />
                No Approval associated with your selected bid
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Warning Modal */}
      {warning && (
        <CustomModal
          open={warning}
          title={warningTitle}
          message={warningText}
          variant="error"
          onClose={() => setWarning(false)}
          buttonProps={[{ className: 'hidden' }, { label: DEFAULT.CLOSE }]}
          className="approvals-warning-modal"
        />
      )}
      <div id="modal-wrapper" />
    </div>
  );
};

export default Approvals;
