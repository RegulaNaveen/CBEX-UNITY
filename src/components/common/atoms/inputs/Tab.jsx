import React, { useState, useEffect, useMemo } from 'react';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import { shallowEqual, useSelector } from 'react-redux';
import Questions from '../../../screens/Opportunity/Questions';
import Documents from '../../../screens/Opportunity/Documents';
import Validate from '../../../screens/Opportunity/Validate';
import featureFlags from '../../../../constants/featureFlags';
import launchDarkly from '../../../../utils/launchDarkly';
import {
  getOpportunityData,
  getProposalQuestions,
  getSelectedBid,
} from '../../../../redux/selectors/proposal';

const UnityTab = ({ id, enableValidateTab, selectedView }) => {
  const [value, setValue] = useState(0);
  const [approvalsFlag, setApprovalsFlag] = useState(false);
  const [showApprovalTab, setShowApprovalTab] = useState(false);

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const oppData = useSelector(getOpportunityData)?.toJS();
  const proposalQuestions = useSelector(getProposalQuestions, shallowEqual);
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const proposalID = memoizeBid?.id;

  useEffect(() => {
    if (proposalID) {
      let opportunityData = oppData[proposalID];
      getApprovalQuestionIds(opportunityData);
    }
  }, [memoizeBid, proposalQuestions]);

  const getApprovalQuestionIds = (opportunityData) => {
    const approvalQIdsArr = [];
    opportunityData?.proposal?.approvals?.forEach((qIdApproval) => {
      if (qIdApproval?.ApprovalSectionLeftQuestions?.length !== 0) {
        qIdApproval.ApprovalSectionLeftQuestions.forEach((leftQId) => {
          approvalQIdsArr.push(leftQId);
        });
      }
      if (qIdApproval?.ApprovalSectionRightQuestions?.length !== 0) {
        qIdApproval.ApprovalSectionRightQuestions.forEach((rightQId) => {
          approvalQIdsArr.push(rightQId);
        });
      }
    });

    const uniqueArr = [...new Set(approvalQIdsArr)];
    let found = false;
    setShowApprovalTab(false);
    // eslint-disable-next-line no-restricted-syntax
    for (const quesId of uniqueArr) {
      if (found) break;
      if (proposalQuestions) {
        // eslint-disable-next-line no-restricted-syntax
        for (const proposalQues of proposalQuestions) {
          if (quesId === proposalQues?.questionId) {
            if (proposalQues?.active) {
              found = true;
              setShowApprovalTab(true);
              break;
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (selectedView && selectedView === 'documents') {
      // eslint-disable-next-line no-unused-expressions
      approvalsFlag && showApprovalTab ? setValue(2) : setValue(1);
    }
  }, [selectedView]);
  const handleChangeTab = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    (async () => {
      const approvalFlag = await launchDarkly(featureFlags.APPROVALS, false);
      setApprovalsFlag(approvalFlag);
    })();
  }, []);

  const renderTab = (v) => {
    if (v) {
      return (
        <>
          {approvalsFlag && showApprovalTab ? (
            <>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                truncate
                className="_question-tab"
              >
                <Tab label="Strategy Development" />
                <Tab label="Approvals" />
                <Tab label="Documents" />
                <Tab label="Validate" />
              </Tabs>
              <div style={{ padding: 20, paddingTop: 5 }}>
                {value === 0 && <Questions proposalID={id} />}
                {value === 1 && approvalsFlag && showApprovalTab && 'Approvals'}
                {value === 2 && <Documents />}
                {value === 3 && <Validate />}
              </div>
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                truncate
                className="_question-tab"
              >
                <Tab label="Strategy Development" />
                <Tab label="Documents" />
                <Tab label="Validate" />
              </Tabs>
              <div style={{ padding: 20, paddingTop: 5 }}>
                {value === 0 && <Questions proposalID={id} />}
                {value === 1 && <Documents />}
                {value === 2 && <Validate />}
              </div>
            </>
          )}
        </>
      );
    }

    return (
      <>
        {approvalsFlag && showApprovalTab ? (
          <>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              truncate
              className="_question-tab"
            >
              <Tab label="Strategy Development" />
              <Tab label="Approvals" />
              <Tab label="Documents" />
            </Tabs>
            <div style={{ padding: 20, paddingTop: 5 }}>
              {value === 0 && <Questions proposalID={id} />}
              {value === 1 && 'Approvals'}
              {value === 2 && <Documents />}
            </div>
          </>
        ) : (
          <>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              truncate
              className="_question-tab"
            >
              <Tab label="Strategy Development" />
              <Tab label="Documents" />
            </Tabs>
            <div style={{ padding: 20, paddingTop: 5 }}>
              {value === 0 && <Questions proposalID={id} />}
              {value === 1 && <Documents />}
            </div>
          </>
        )}
      </>
    );
  };
  return <div className="tab-container">{renderTab(enableValidateTab)}</div>;
};

export default UnityTab;
