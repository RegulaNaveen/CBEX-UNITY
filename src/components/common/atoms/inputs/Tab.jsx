import React from 'react';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Questions from '../../../screens/Opportunity/Questions';
import Documents from '../../../screens/Opportunity/Documents';
import Validate from '../../../screens/Opportunity/Validate';
import { useEffect } from 'react';

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
            <Tab label="Questions" />
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
    } else {
      return (
        <>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            truncate
            className="_question-tab"
          >
            <Tab label="Questions" />
            <Tab label="Documents" />
          </Tabs>
          <div style={{ padding: 20, paddingTop: 5 }}>
            {value === 0 && <Questions proposalID={id} />}
            {value === 1 && <Documents />}
          </div>
        </>
      );
    }
  };
  return <div style={{ paddingLeft: 10 }}>{renderTab(enableValidateTab)}</div>;
};

export default UnityTab;
