import { map } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'apollo-react/components/Card';
import {
  getSelectedBid,
  getProposalQuestions
} from '../../redux/selectors/proposal';
import { REDUX_TYPES } from '../../constants';

const INITIAL_LIST_TITLE = {
  bidValue: 'Total Bid Value',
  bottomLine: 'Bottom Line Labor Discount',
  budgetTools: 'Budget Tools'
};

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
      }
    });
    setBidCostValue({ bidValue, bottomLine, budgetTools });
  }, [proposalQuestion]);

  return (
    <div className="bid-cost-details">
      <div className="bid-cost ">
        <h2 className="bid-cost_title">Bid Cost Details</h2>
        <div className=" bid-cost_details">
          {map(bidCostValue, (item, key) => {
            return (
              <div className="bid-cost_details-item" key={key}>
                <h3>{INITIAL_LIST_TITLE[key]}:</h3>
                <i>{item === '' || item === '' ? 'N/A' : item || 'N/A'}</i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default BidCostDetails;
