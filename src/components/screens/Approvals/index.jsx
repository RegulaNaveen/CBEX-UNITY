import { isEmpty } from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';

import { fetchAllApprovals } from '../../../redux/actions/approval-actions';

import {
  getOpportunityData,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';

const Approvals = () => {
  const approvals = useSelector(state => state.approvals.allApprovals);

  // const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  // const allOppData = useSelector(getOpportunityData)?.toJS();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const proposalId = memoizeBid?.id;
    console.log('Bid Change Triggered - (useEffect)');
    // const opportunityData = allOppData[proposalId];
    // const newApprovals = opportunityData?.proposal?.approvals;

    (async () => {
      await dispatch(fetchAllApprovals(proposalId));
      setLoading(false);
    })();

    // setApprovals(newApprovals);
  }, [memoizeBid]);

  return (
    <div className="approvals-tab">
      {/* Modal Loading */}
      {loading && <Loader isInner />}

      <BidHistory />

      {!isEmpty(approvals) ? (
        approvals.map(approval => {
          return (
            <Section key={approval.ApprovalSectionTitle} approval={approval} />
          );
        })
      ) : (
        <p className="no-approval">No Approval Questions</p>
      )}
    </div>
  );
};

export default Approvals;
