import React from 'react';
import InputField from './InputField';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';

const DashboardFilters = ({ onChange }) => (
  <div id="dashboard-filters">
    <div className="filter-wrapper">
      <InputField
        title="Opportunity #"
        id="opportunityNumber"
        onChange={onChange}
      />
    </div>
    <div className="filter-wrapper">
      <InputField
        title="Opportunity name"
        id="opportunityName"
        onChange={onChange}
      />
    </div>
    <div className="filter-wrapper">
      <InputField title="Customer" id="customer" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <InputField title="Protocol #" id="protocolNumber" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Phase" id="phase" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <InputField title="Product" id="product" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <Dropdown
        title="Therapeutic area"
        id="therapeuticArea"
        onChange={onChange}
      />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Indication" id="indication" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <DatePicker label="Bid due date" id="bidDueDate" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <Dropdown
        title="Opportunity status"
        id="opportunityStatus"
        onChange={onChange}
      />
    </div>
    <div className="filter-wrapper">
      <InputField title="Team member" id="teamMember" onChange={onChange} />
    </div>
  </div>
);

export default DashboardFilters;
