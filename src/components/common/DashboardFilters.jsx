// @flow
import React, { useCallback } from 'react';
import InputField from './InputField';
import FilterDropDown from './FilterDropDown';
import DateRange from './DateRange';
import UserLookup from './UserLookup';

type Props = {
  onTextFilterChange: Function,
  onDropDownFilterChange: Function,
  onDateRangeChange: Function
};

const DashboardFilters = ({
  onTextFilterChange,
  onDropDownFilterChange,
  onDateRangeChange
}: Props) => {
  const changeDate = useCallback(range => {
    onDateRangeChange('bid due date', range);
  });

  const changeUser = useCallback(value => {
    onDropDownFilterChange('teamMember', value);
  });

  return (
    <div id="dashboard-filters">
      <div className="filter-wrapper">
        <InputField
          title="Opportunity #"
          id="opportunity #"
          onChange={onTextFilterChange}
          placeholder="Opportunity number"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          title="Opportunity name"
          id="opportunityName"
          onChange={onTextFilterChange}
          placeholder="Opportunity name"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          title="Customer"
          id="account"
          onChange={onTextFilterChange}
          placeholder="Customer"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          title="Protocol #"
          id="protocol #"
          onChange={onTextFilterChange}
          placeholder="Protocol number"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Phase"
          id="phase"
          onChange={onDropDownFilterChange}
          items={['1', '2', '3']}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          title="Product"
          id="product"
          onChange={onTextFilterChange}
          placeholder="Product"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Therapeutic area"
          id="therapeuticArea"
          onChange={onDropDownFilterChange}
          items={['1', '2', '3']}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Indication"
          id="indication"
          onChange={onDropDownFilterChange}
          items={['1', '2', '3']}
        />
      </div>
      <div className="filter-wrapper">
        <DateRange
          label="Bid due date"
          id="bid due date"
          onSetRange={changeDate}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Opportunity status"
          id="opportunityStatus"
          onChange={onDropDownFilterChange}
          items={['a', 'b', 'c']}
        />
      </div>
      <div className="filter-wrapper">
        <UserLookup title="Team member" id="teamMember" onChange={changeUser} />
      </div>
    </div>
  );
};

export default DashboardFilters;
