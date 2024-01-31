/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import chevronRight from '../../../img/chevron-right.svg';
import chevronDown from '../../../img/chevron-down.svg';
import {
  getBidList,
  getSelectedBid,
  getIsQuestionAnswered,
  getProposalQuestions,
  selectCurrentWidget,
  getOpportunityData
} from '../../redux/selectors/proposal';
import { parseMomentDate } from '../../utils/DateUtils';
import { Checkmark } from '../svg';
import { changeBid } from '../../redux/actions/proposal-actions';
import PriceModeler from './PriceModeler';
import BidCostDetails from './BidCostDetails';
import { getfetchUserTagFlag } from '../../redux/selectors';
import TextField from 'apollo-react/components/TextField';
import StatusDotOutline from 'apollo-react-icons/StatusDotOutline';
import StatusDotSolid from 'apollo-react-icons/StatusDotSolid';

const BidHistory = () => {
  const winLocationSearch = window.location.search;

  const selectedView = new URLSearchParams(winLocationSearch).get('viewType');
  const currentbidNo = new URLSearchParams(winLocationSearch).get('bidNo');
  const currentBidType =
    new URLSearchParams(winLocationSearch).get('bidType') || 'Clinical_Bid';
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showHoverText, setShowHoverText] = useState(false);
  const [bidVal, setBidVal] = useState('');
  const [showBidCostDetail, setShowBidCostDetail] = useState(false);
  const dispatch = useDispatch();
  const bidList = useSelector(getBidList);
  const selectedBid = useSelector(getSelectedBid);
  const typeOfActivity = selectedBid.get('typeOfActivity');
  let typeOfActivityValues = '';

  if (typeOfActivity) {
    if (typeof typeOfActivity === 'string') {
      typeOfActivityValues = typeOfActivity.split(';').join(', ');
    } else if (Array.isArray(typeOfActivity)) {
      typeOfActivityValues = typeOfActivity?.join(', ');
    }
  }

  const isCurrentBid = selectedBid.get('isCurrent');
  const isEditableBid = selectedBid.get('isEditable');
  const bidType = selectedBid.get('bidType');
  const isQuestionAnswered = useSelector(getIsQuestionAnswered);
  const flags = useSelector(getfetchUserTagFlag);
  const bidCostDetailFlag = flags.bidCostDetail;
  const currentWidget = useSelector(selectCurrentWidget);
  const proposalQuestion = useSelector(getProposalQuestions);
  const allOppData = useSelector(getOpportunityData)?.toJS();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCollapse();
    }
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(allOppData)) {
      const {
        isCurrent,
        proposal: { typeOfWidget }
      } = value;

      if (isCurrent && typeOfWidget === 'Bid_Cost') {
        setShowBidCostDetail(true);
        break;
      }
    }
  }, [isCurrentBid]);

  useEffect(() => {
    let bidValue = '';

    proposalQuestion.forEach(item => {
      if (item?.section?.sectionName === 'Details-For-Backend') {
        if (item?.sfField === 'Total_Bid_Value_Labor_Direct_Discount__c') {
          item?.answers?.forEach(i => (bidValue = String(i?.answer).trim()));
        }
      }
    });

    setBidVal(bidValue);
  }, [bidVal, proposalQuestion]);

  useEffect(() => {
    if (!isQuestionAnswered && showHoverText) {
      setShowHoverText(false);
    }
  }, [isQuestionAnswered]);

  return (
    <>
      {bidList.length ? (
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
                      <div>Bid Due Date</div>
                    </div>
                    <div
                      style={{ width: '100%' }}
                      onMouseEnter={() => {
                        if (isQuestionAnswered && !showHoverText)
                          setShowHoverText(true);
                      }}
                      onMouseLeave={() => {
                        if (showHoverText) setShowHoverText(false);
                      }}
                    >
                      {bidList.length > 0 &&
                        bidList.map(item => (
                          <div
                            onClick={() => {
                              if (
                                !isQuestionAnswered &&
                                (currentbidNo !== item.bidNo ||
                                  currentBidType !== item.bidType)
                              ) {
                                dispatch(changeBid(item, selectedView));
                              }
                            }}
                            className={`bid-list-row ${
                              selectedBid.get('id') === item.bidId
                                ? 'selected-bid'
                                : ''
                            }
                      ${isQuestionAnswered ? 'bid-switching-not-allowed' : ''}`}
                            key={item.bidId}
                          >
                            <div>
                              {item.isEditable === true ? (
                                <StatusDotOutline
                                  className="statusdotoutline"
                                  fontSize="extraSmall"
                                  style={{ color: 'blue', marginRight: '2px' }}
                                />
                              ) : (
                                <StatusDotSolid
                                  fontSize="extraSmall"
                                  style={{ marginRight: '2px' }}
                                />
                              )}
                              {item.bidName.startsWith('Early Engagement')
                                ? `EE Bid ${item.bidNo}`
                                : item.bidName.startsWith('Post Award')
                                ? `Post Award ${item.bidNo}`
                                : item.bidName.startsWith('RFI')
                                ? `RFI ${item.bidNo}`
                                : item.bidName}
                              {selectedBid.get('id') === item.bidId &&
                              selectedBid.get('bidStatus')
                                ? '(processing)'
                                : item.isCurrent && ' (Current)'}
                            </div>
                            <div>{parseMomentDate(item.bidDueDate)}</div>
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
                  {showHoverText && (
                    <div className="hover-text">
                      <p>Please wait for the question to be answered</p>
                    </div>
                  )}
                </div>
                <div className="bid-history-right-content">
                  <p className="summary-title summury-bold">
                    Bid Change Summary
                  </p>
                  <p className="review-title">For Review</p>
                  <p className="pertinent-details-title">
                    {bidType && bidType.includes('Early_Engagement_Bid')
                      ? 'Early Engagement Development Plan'
                      : bidType && bidType.includes('Post_Award_Bid')
                      ? ''
                      : bidType && bidType.includes('RFI_Request')
                      ? ''
                      : 'Pertinent Details / Specific Rebid Request'}
                  </p>
                  {bidType && bidType.includes('Post_Award_Bid') ? (
                    <div>
                      <p className="pertinent-details-title">
                        Describe Activity
                      </p>
                      <div className="pertinent-details-section">
                        <p>{selectedBid.get('describeActivity')}</p>
                      </div>
                      <p className="pertinent-details-title">
                        Type of Activity
                      </p>
                      <div className="pertinent-details-section">
                        <p>{typeOfActivityValues}</p>
                      </div>
                    </div>
                  ) : bidType &&
                    bidType.includes(
                      'Early_Engagement_Bid' || 'Bid Early_Engagement_Bid'
                    ) ? (
                    <div className="pertinent-details-section">
                      <p>{selectedBid.get('earlyEngagementDevelopmentPlan')}</p>
                    </div>
                  ) : bidType &&
                    bidType.includes('RFI_Request' || 'Bid RFI_Request') ? (
                    <div>
                      <p className="pertinent-details-title req-detail-title">
                        Request Detail
                      </p>
                      <div className="rfi-textfield-container">
                        <TextField
                          placeholder="Describe details"
                          sizeAdjustable
                          maxWidth={500}
                          maxHeight={150}
                          fullWidth
                          value={selectedBid.get('requestDetail')}
                          InputProps={{ readOnly: true }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pertinent-details-section">
                      <p>{selectedBid.get('pertinentDetails')}</p>
                    </div>
                  )}
                  <p className="helper-text">
                    This text was provided by Salesforce user when the latest
                    bid was created
                  </p>
                </div>

                <div className="bid-history-pricemodeler-content">
                  <>
                    {(showBidCostDetail ||
                      !isEditableBid ||
                      bidVal ||
                      currentWidget.currentWidget === 'BidCostDetail') &&
                    bidCostDetailFlag ? (
                      <BidCostDetails />
                    ) : (
                      <PriceModeler />
                    )}
                  </>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};
export default BidHistory;
