import { isEmpty } from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';

import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import {
  fetchAllApprovals,
  setQuestionHashAction,
  fetchApprovalSendEmailFlag
} from '../../../redux/actions/approval-actions';
import { getSelectedBid } from '../../../redux/selectors/proposal';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import { selectProposalQuestions } from '../../../redux/selectors';
import { generateQuestionsHash } from './utils';
import { DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import Filters from './Filters';
import FilterButton from './FilterButton';

const Approvals = () => {
  const approvals = useSelector(state => state.approvals.allApprovals);
  const filters = useSelector(state => state.approvals.filters);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const dispatch = useDispatch();

  // get email flag status on mount
  useEffect(() => {
    dispatch(fetchApprovalSendEmailFlag());
  }, []);

  useEffect(() => {
    const proposalId = memoizeBid?.id;
    if (!proposalId) return () => {};
    setLoading(true);

    (async () => {
      const response = await dispatch(fetchAllApprovals(proposalId));
      setLoading(false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      }
    })();
    return () => {};
  }, [memoizeBid]);

  useEffect(() => {
    const quesHashData = generateQuestionsHash(proposalQuestions, filters);
    dispatch(setQuestionHashAction(quesHashData));
  }, [proposalQuestions, filters]);

  return (
    <div className="approvals-tab">
      <BidHistory data-testid="bid-history" />

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
              key={approval.ApprovalSectionId}
              sectionId={approval.ApprovalSectionId}
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
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </div>
  );
};

export default Approvals;
