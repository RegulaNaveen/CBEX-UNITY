import React, { useEffect } from 'react';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Questions from '../../../screens/Opportunity/Questions';
import Documents from '../../../screens/Opportunity/Documents';
import Validate from '../../../screens/Opportunity/Validate';

const UnityTab = ({ id, enableValidateTab, selectedView }) => {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (selectedView && selectedView === 'documents') setValue(1);
  }, [selectedView]);
  const handleChangeTab = (event, value) => {
    setValue(value);
  };
  const renderTab = v => {
    if (v) {
      return (
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
      );
    }

    return (
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
    );
  };
  return <div className="tab-container">{renderTab(enableValidateTab)}</div>;
};

export default UnityTab;
