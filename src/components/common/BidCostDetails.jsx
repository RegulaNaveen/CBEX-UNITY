import { map } from 'lodash';
import React from 'react';
import {
  getSelectedBid,
  getBidCostDetails
} from '../../redux/selectors/proposal';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'apollo-react/components/Card';

const INITIAL_LIST_TITLE = {
  bidValue: 'Total Bid Value',
  bottomLine: 'Bottom Line Labor Discount',
  budgetTools: 'Budget Tools'
};

export const INITIAL_LIST_VAL = {
  bidValue: '1',
  bottomLine: 'xyz',
  budgetTools: 'simran'
};

export const BidCostDetails = () => {
  const dispatch = useDispatch();
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const bidCostDetails = useSelector(getBidCostDetails)?.toJS();

  return (
    <Card style={{ marginLeft: '10px' }}>
      <div className="bid-cost ">
        <h2 className="bid-cost_title">Bid Cost Details</h2>
        <div className=" bid-cost_details">
          {map(INITIAL_LIST_VAL, (item, key) => {
            return (
              <div className="bid-cost_details-item" key={key}>
                <h3>{INITIAL_LIST_TITLE[key]}:</h3>
                <i>{item === '' || item === '' ? 'N/A' : item || 'N/A'}</i>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
