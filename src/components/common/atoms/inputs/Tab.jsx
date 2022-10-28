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
    console.log('useeffect called', proposalQuestions);
    if (proposalID) {
      oppData[proposalID].proposal.Approvals = [
        {
          ApprovalSectionTitle: 'DSda',
          ApprovalSectionRightQuestions: [],
          ApprovalSectionOrder: 4,
          ApprovalSectionLeftQuestions: [
            {
              ApprovalQuestion: 'Intervention type',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
          ],
        },
        {
          ApprovalSectionTitle: 'Test Approval Section31',
          ApprovalSectionRightQuestions: [
            {
              ApprovalQuestion:
                "High-level scope for opportunity. What customers want and what they definitely don't want. radio button man radio",
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
            {
              ApprovalQuestion: 'Akash Indicationn gyjaaaa',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 2,
            },
          ],
          ApprovalSectionOrder: 1,
          ApprovalSectionLeftQuestions: [
            {
              ApprovalQuestion: 'Opportunity Type',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
          ],
        },
        {
          ApprovalSectionTitle: 'DSSD',
          ApprovalSectionRightQuestions: [
            {
              ApprovalQuestion: 'Intervention type',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
          ],
          ApprovalSectionOrder: 3,
          ApprovalSectionLeftQuestions: [
            {
              ApprovalQuestion: 'Phase I study type',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
          ],
        },
        {
          ApprovalSectionTitle: 'New Test38',
          ApprovalSectionRightQuestions: [
            {
              ApprovalQuestion: 'Akash Indicationn gyjaaaa',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
          ],
          ApprovalSectionOrder: 2,
          ApprovalSectionLeftQuestions: [
            {
              ApprovalQuestion:
                'How many scenarios, if any, did the customer request?',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 1,
            },
            {
              ApprovalQuestion: 'Is this a rare disease?',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 2,
            },
            {
              ApprovalQuestion: 'Opportunity Type',
              ApprovalQuestionId: '97fa382a-6fe3-40f5-8af6-97b460fb261b',
              ApprovalQuestionOrder: 3,
            },
            {
              ApprovalQuestion: 'Which of the following applies?',
              ApprovalQuestionId: '01a4d805-3b4b-4549-b308-5a2dfb8cdaa9',
              ApprovalQuestionOrder: 4,
            },
          ],
        },
      ];
      let opportunityData = oppData[proposalID];
      getApprovalQuestionIds(opportunityData);
    }
  }, [memoizeBid, proposalQuestions]);

  const getApprovalQuestionIds = (opportunityData) => {
    const approvalQIdsArr = [];
    opportunityData?.proposal?.Approvals.forEach((qIdApproval) => {
      if (qIdApproval?.ApprovalSectionLeftQuestions?.length !== 0) {
        qIdApproval?.ApprovalSectionLeftQuestions?.map((leftQId) => {
          approvalQIdsArr.push(leftQId.ApprovalQuestionId);
        });
      }
      if (qIdApproval?.ApprovalSectionRightQuestions?.length !== 0) {
        qIdApproval?.ApprovalSectionRightQuestions?.forEach((rightQId) => {
          approvalQIdsArr.push(rightQId.ApprovalQuestionId);
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
