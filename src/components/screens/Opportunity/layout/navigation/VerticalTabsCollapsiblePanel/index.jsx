import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/styles';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import ClipboardPencil from 'apollo-react-icons/ClipboardPencil';
import './styles.scss';

const VerticalTabs = styled(Tabs)({
  '&::before': {
    borderBottom: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: '#ecf3ff',
    color: '#0557d5 !important'
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
});

const VerticalTab = styled(Tab)({
  marginRight: 0,
  minWidth: '60px'
});

function VerticalTabsCollapsiblePanel({ renderPanel }) {
  const [activeTab, setActiveTab] = useState(0);

  function handleTabChange(event, newActiveTab) {
    setActiveTab(newActiveTab);
  }

  return (
    <div className="vertical-tabs-collapsible-panel">
      <VerticalTabs
        value={activeTab}
        onChange={handleTabChange}
        orientation="vertical"
      >
        <VerticalTab icon={<ClipboardPencil />} />
        <VerticalTab icon={<ClipboardPencil />} />
      </VerticalTabs>
      {renderPanel(activeTab)}
    </div>
  );
}

export default VerticalTabsCollapsiblePanel;
