// @flow
import React from 'react';
import InputField from './InputField';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';

type Props = {
  onChange: Function
};

const DashboardFilters = ({ onChange }: Props) => (
  <div id="dashboard-filters">
    <div className="filter-wrapper">
      <InputField
        title="Opportunity #"
        id="opportunity #"
        onChange={onChange}
        placeholder="Opportunity number"
        type="text"
      />
    </div>
    <div className="filter-wrapper">
      <InputField
        title="Opportunity name"
        id="opportunityName"
        onChange={onChange}
        placeholder="Opportunity name"
        type="text"
      />
    </div>
    <div className="filter-wrapper">
      <InputField
        title="Customer"
        id="account"
        onChange={onChange}
        placeholder="Customer"
        type="text"
      />
    </div>
    <div className="filter-wrapper">
      <InputField
        title="Protocol #"
        id="protocol #"
        onChange={onChange}
        placeholder="Protocol number"
        type="text"
      />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Phase" id="phase" onClick={onChange} />
    </div>
    <div className="filter-wrapper">
      <InputField
        title="Product"
        id="product"
        onChange={onChange}
        placeholder="Product"
        type="text"
      />
    </div>
    <div className="filter-wrapper">
      <Dropdown
        title="Therapeutic area"
        id="therapeuticArea"
        onClick={onChange}
      />
    </div>
    <div className="filter-wrapper">
      <Dropdown title="Indication" id="indication" onClick={onChange} />
    </div>
    <div className="filter-wrapper">
      <DatePicker label="Bid due date" id="bid due date" onChange={onChange} />
    </div>
    <div className="filter-wrapper">
      <Dropdown
        title="Opportunity status"
        id="opportunityStatus"
        onClick={onChange}
      />
    </div>
    <div className="filter-wrapper">
      <InputField title="Team member" id="teamMember" onChange={onChange} />
    </div>
  </div>
);

export default DashboardFilters;
