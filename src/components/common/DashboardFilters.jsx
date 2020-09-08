import React from 'react';
import InputField from './InputField';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';

const DashboardFilters = ({}) => (
  <div id="dashboard-filters">
    <div className="filter-wrapper">
      <InputField title="Opportunity #" />
    </div>
    <div className="filter-wrapper">
      <InputField title="Opportunity name" />
    </div>
    <div className="filter-wrapper">
      <InputField title="Customer" />
    </div>
    <div className="filter-wrapper">
      <InputField title="Protocol #" />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Phase" />
    </div>
    <div className="filter-wrapper">
      <InputField title="Product" />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Therapeutic area" />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Indication" />
    </div>
    <div className="filter-wrapper">
      <DatePicker label="Bid due date" />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Opportunity status" />
    </div>
    <div className="filter-wrapper">
      <InputField title="Team member" />
    </div>
  </div>
);

export default DashboardFilters;
