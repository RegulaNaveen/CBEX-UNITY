import React, { useState, useEffect } from 'react';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Questions from '../../../screens/Opportunity/Questions';
import Documents from '../../../screens/Opportunity/Documents';
import Validate from '../../../screens/Opportunity/Validate';
import featureFlags from '../../../../constants/featureFlags';
import launchDarkly from '../../../../utils/launchDarkly';

const UnityTab = ({ id, enableValidateTab, selectedView }) => {
  const [value, setValue] = useState(0);
  const [approvalsFlag, setApprovalsFlag] = useState(false);

  useEffect(() => {
    if (selectedView && selectedView === 'documents') {
      // eslint-disable-next-line no-unused-expressions
      approvalsFlag ? setValue(2) : setValue(1);
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
          {approvalsFlag ? (
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
          ) : (
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
          )}
          <div style={{ padding: 20, paddingTop: 5 }}>
            {value === 0 && <Questions proposalID={id} />}
            {value === 1 && approvalsFlag && 'Approvals'}
            {value === 2 && <Documents />}
            {value === 3 && <Validate />}
          </div>
        </>
      );
    }

    return (
      <>
        {approvalsFlag ? (
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
        ) : (
          <Tabs
            value={value}
            onChange={handleChangeTab}
            truncate
            className="_question-tab"
          >
            <Tab label="Strategy Development" />
            <Tab label="Documents" />
          </Tabs>
        )}
        <div style={{ padding: 20, paddingTop: 5 }}>
          {value === 0 && <Questions proposalID={id} />}
          {value === 1 && approvalsFlag && 'Approvals'}
          {value === 2 && <Documents />}
        </div>
      </>
    );
  };
  return <div className="tab-container">{renderTab(enableValidateTab)}</div>;
};

export default UnityTab;
