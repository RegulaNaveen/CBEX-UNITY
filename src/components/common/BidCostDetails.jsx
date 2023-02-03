import { map } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSelectedBid,
  getProposalQuestions
} from '../../redux/selectors/proposal';
import { REDUX_TYPES } from '../../constants';

const { SET_BID_COST_DATA_FIELDS } = REDUX_TYPES.PROPOSAL;

const BidCostDetails = () => {
  const dispatch = useDispatch();
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const proposalQuestion = useSelector(getProposalQuestions);
  const [bidCostValue, setBidCostValue] = useState({
    bidValue: '',
    bottomLine: '',
    budgetTools: ''
  });

  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);

  useEffect(() => {
    dispatch({ type: SET_BID_COST_DATA_FIELDS, payload: bidCostValue });
  }, [
    memoizeBid,
    bidCostValue?.bidValue,
    bidCostValue?.bottomLine,
    bidCostValue?.budgetTools
  ]);

  const options2 = { currency: 'USD' };
  const numberFormat2 = new Intl.NumberFormat('en-US', options2);

  const bidVal = numberFormat2.format(bidCostValue?.bidValue);

  const options3 = { currency: 'USD' };
  const numberFormat3 = new Intl.NumberFormat('en-US', options3);

  const bottomLineVal = numberFormat3.format(bidCostValue?.bottomLine);

  const newBidItem = [
    {
      'Total Bid Value: ':
        bidVal === 0 || bidVal === '0' ? 'N/A' : `USD ${bidVal}`
    },
    { 'Bottom Line Labor Discount: ': bottomLineVal },
    { 'Budget Tools: ': bidCostValue?.budgetTools }
  ];

  useEffect(() => {
    let bidValue = '';
    let bottomLine = '';
    let budgetTools = '';

    proposalQuestion.forEach((item) => {
      if (item?.section?.sectionName === 'Details-For-Backend') {
        if (item?.sfField === 'Total_Bid_Value_Labor_Direct_Discount__c') {
          item?.answers?.forEach((i) => (bidValue = String(i?.answer).trim()));
        }
        if (item?.sfField === 'Bottom_Line_Labor_Discount__c') {
          item?.answers?.forEach(
            (i) => (bottomLine = String(i?.answer).trim())
          );
        }
        if (item?.sfField === 'Budget_Tools__c') {
          item?.answers?.forEach(
            (i) => (budgetTools = String(i?.answer).trim())
          );
        }
      }
    });
    setBidCostValue({
      bidValue,
      bottomLine,
      budgetTools: budgetTools?.split(';')?.join('; ')
    });
  }, [proposalQuestion]);

  return (
    <div className="bid-cost-details">
      <div className="bid-cost ">
        <h2 className="bid-cost_title">Bid Cost Details</h2>
        <div className=" bid-cost_details">
          {map(newBidItem, (item, key) => {
            return (
              <div className="bid-cost_details-item" key={key}>
                <h3>{Object.keys(item)[0]}</h3>
                <i>
                  {Object.values(item)[0] === '' ||
                  Object.values(item)[0] === 0 ||
                  Object.values(item)[0] === '0'
                    ? 'N/A'
                    : Object.values(item)[0] || 'N/A'}
                </i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default BidCostDetails;
