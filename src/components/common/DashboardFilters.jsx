// @flow
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { getFilteringValues } from '../../actions/proposals-actions';
import { getProposalsFilters } from '../../selectors';
import InputField from './InputField';
import FilterDropDown from './FilterDropDown';
import DateRange from './DateRange';
import UserLookup from './UserLookup';
import { getAllUsers } from '../../actions/auth-actions';

type Props = {
  onTextFilterChange: Function,
  onDropDownFilterChange: Function,
  onDateRangeChange: Function,
  fetchFilterValues: Function,
  fetchUsers: Function,
  filterValues: Object
};

const DashboardFilters = ({
  onTextFilterChange,
  onDropDownFilterChange,
  onDateRangeChange,
  fetchFilterValues,
  fetchUsers,
  filterValues
}: Props) => {
  useEffect(() => {
    fetchFilterValues();
    fetchUsers();
  }, []);
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
          label="Opportunity number"
          id="opportunity number"
          onChange={onTextFilterChange}
          placeholder="Opportunity number"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Opportunity name"
          id="opportunityName"
          onChange={onTextFilterChange}
          placeholder="Opportunity name"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Customer"
          id="customer"
          onChange={onTextFilterChange}
          placeholder="Customer"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Protocol number"
          id="protocol number"
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
          items={filterValues ? filterValues.phases : []}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Product"
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
          items={filterValues ? filterValues.therapeuticAreas : []}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Indication"
          id="indication"
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.indications : []}
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
          items={filterValues ? filterValues.opportunityStatuses : []}
        />
      </div>
      <div className="filter-wrapper">
        <UserLookup title="Team member" id="teamMember" onChange={changeUser} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  filterValues: getProposalsFilters(state)
});

const mapDispatchToProps = {
  fetchFilterValues: getFilteringValues,
  fetchUsers: getAllUsers
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardFilters);
