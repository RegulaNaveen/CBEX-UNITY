import { isEmpty } from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';

import {
  fetchAllApprovals,
  setQuestionHashAction
} from '../../../redux/actions/approval-actions';
import { getSelectedBid } from '../../../redux/selectors/proposal';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import { selectProposalQuestions } from '../../../redux/selectors';
import { generateQuestionsHash } from './utils';

const Approvals = () => {
  const approvals = useSelector(state => state.approvals.allApprovals);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const [loading, setLoading] = useState(false);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const proposalId = memoizeBid?.id;
    console.log('Bid Change Triggered - (useEffect)');

    (async () => {
      const response = await dispatch(fetchAllApprovals(proposalId));
      setLoading(false);
      if (!response.status) {
        alert('Api Failed');
      }
    })();
  }, [memoizeBid]);

  useEffect(() => {
    const quesHashData = generateQuestionsHash(proposalQuestions);
    dispatch(setQuestionHashAction(quesHashData));
  }, [proposalQuestions]);

  return (
    <div className="approvals-tab">
      {/* Modal Loading */}
      {loading && <Loader isInner />}

      <BidHistory />

      {!isEmpty(approvals) ? (
        approvals.map(approval => (
          <Section
            key={approval.ApprovalSectionId}
            sectionId={approval.ApprovalSectionId}
          />
        ))
      ) : (
        <p className="no-approval">No Approval Questions</p>
      )}
    </div>
  );
};

export default Approvals;
