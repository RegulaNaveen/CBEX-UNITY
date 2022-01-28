import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import chevronRight from '../../../img/chevron-right.svg';
import chevronDown from '../../../img/chevron-down.svg';
import { getBidList, getSelectedBid } from '../../redux/selectors/proposal';
import { parseMomentDate } from '../../utils/DateUtils';

const BidHistory = () => {
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
                className="task-table-headers"
                role="button"
                onClick={handleCollapse}
                onKeyPress={handleKeyPress}
                tabIndex={-1}
              >
                <div className="task-title">
                  <p>Bid History</p>
                </div>
              </div>
              <div className="task-table-row bid-list-wrapper">
                <div className="bid-list-header-row">
                  <div>Bid Number</div>
                  <div>Bid Created</div>
                </div>
                {bidList.length > 0 &&
                  bidList.map(item => (
                    <div
                      className={`bid-list-row ${
                        selectedBid === item.bidId ? 'selected-bid' : ''
                      }`}
                    >
                      <div>
                        {item.bidName}{' '}
                        {item.bidId === selectedBid && '(Current)'}
                      </div>
                      <div>{parseMomentDate(item.bidDate)}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bid-history-right-content">hello</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BidHistory;
