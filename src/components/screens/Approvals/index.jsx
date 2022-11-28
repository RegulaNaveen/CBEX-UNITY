import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import {
  getOpportunityData,
  getSelectedBid,
} from '../../../redux/selectors/proposal';
import BidHistory from '../../common/Bidhistory';
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
      <div>
        <div>
          <BidHistory data-testid="bid-history" />
        </div>
        {approvals?.length > 0 ? (
          approvals?.map((approval) => {
            return (
              <Section
                key={approval.ApprovalSectionTitle}
                approval={approval}
              />
            );
          })
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
                  padding: '20px',
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
    </>
  );
};

export default Approvals;
