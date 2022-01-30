import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import chevronRight from '../../../img/chevron-right.svg';
import chevronDown from '../../../img/chevron-down.svg';
import { getBidList, getSelectedBid } from '../../redux/selectors/proposal';
import { parseMomentDate } from '../../utils/DateUtils';
import { Checkmark } from '../svg';
import { changeBid } from '../../redux/actions/proposal-actions';

const BidHistory = ({ changeBid }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const bidList = useSelector(getBidList);
  const selectedBid = useSelector(getSelectedBid);
  console.log('history comp', bidList);
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCollapse();
    }
  };
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bid-history task-wrapper">
      <button
        id="arrow-icon"
        className="task-icon-wrapper"
        onClick={handleCollapse}
        onKeyPress={handleKeyPress}
        type="button"
        tabIndex={0}
      >
        <img
          className="task-icon"
          src={isCollapsed ? chevronDown : chevronRight}
          alt="question arrow"
        />
      </button>
      {!isCollapsed ? (
        <div
          className="task-title-wrapper"
          role="button"
          onClick={handleCollapse}
          onKeyPress={handleKeyPress}
          tabIndex={-1}
        >
          <p id="task-title" className="task-title">
            Bid History
          </p>
        </div>
      ) : (
        <div className="task-table-wrapper">
          <div className="bid-history-content-wrapper">
            <div className="bid-history-left-content">
              <div
                className="task-table-headers bid-history-title"
                role="button"
                onClick={handleCollapse}
                onKeyPress={handleKeyPress}
                tabIndex={-1}
              >
                <div className="task-title bid-title">
                  <p>Bid History</p>
                </div>
              </div>
              <p className="helper-text">
                Select any bid to review questions and answers from that
                iteration
              </p>
              <div className="task-table-row bid-list-wrapper">
                <div className="bid-list-header-row">
                  <div>Bid Number</div>
                  <div>Bid Created</div>
                </div>
                {bidList.length > 0 &&
                  bidList.map(item => (
                    <div
                      onClick={() => changeBid(item)}
                      className={`bid-list-row ${
                        selectedBid.get('id') === item.bidId
                          ? 'selected-bid'
                          : ''
                      }`}
                      key={item.bidId}
                    >
                      <div>
                        {item.bidName} {item.isCurrent && '(Current)'}
                      </div>
                      <div>{parseMomentDate(item.bidDate)}</div>
                      {item.bidId === selectedBid.get('id') && (
                        <Checkmark
                          className="selected-bid-check"
                          style={{ marginLeft: '6px' }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="bid-history-right-content">
              <p className="review-title">For Review</p>
              <p className="summary-title">Bid Change Summary</p>
              <p className="pertinent-details-title">
                Pertinent Details / Specific Rebid Request
              </p>
              <div className="pertinent-details-section">
                <p>Customer Requested we evaluate the site/country</p>
              </div>
              <p className="helper-text">
                This text was provided by Salesforce user when latest bid was
                created
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default connect(null, { changeBid })(BidHistory);
