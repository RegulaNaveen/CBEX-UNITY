import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  getOpportunityData,
  getSelectedBid
} from '../../../redux/selectors/proposal';

import Section from './Section';

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const allOppData = useSelector(getOpportunityData)?.toJS();

  useEffect(() => {
    const proposalId = memoizeBid?.id;
    const opportunityData = allOppData[proposalId];
    const newApprovals = opportunityData?.proposal?.approvals;
    setApprovals(newApprovals);
  }, [memoizeBid]);

  return (
    <>
      {approvals.length > 0 ? (
        approvals.map(approval => {
          return <Section approval={approval} />;
        })
      ) : (
        <>No Approval Questions</>
      )}
      {console.log(approvals)}
    </>
  );
};

export default Approvals;
