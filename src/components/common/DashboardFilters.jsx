// @flow
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Link from 'apollo-react/components/Link';
import { getFilteringValues } from '../../redux/actions/proposals-actions';
import { getProposalsFilters } from '../../redux/selectors';
import InputField from './atoms/inputs/InputField';
import FilterDropDown from './atoms/inputs/FilterDropDown';
import DateRange from './atoms/inputs/DateRange';
import UserLookup from './atoms/inputs/UserLookup';
import { getAllUsers } from '../../redux/actions/sso-auth-actions';

type Props = {
  onTextFilterChange: Function,
  onDropDownFilterChange: Function,
  onDateRangeChange: Function,
  fetchFilterValues: Function,
  fetchUsers: Function,
  filterValues: Object,
  clearFilter: Function
};

const DashboardFilters = ({
  onTextFilterChange,
  onDropDownFilterChange,
  onDateRangeChange,
  fetchFilterValues,
  fetchUsers,
  filterValues,
  clearFilter
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
      <div className="filter-clear">
        <Link
          style={{ borderBottom: 'none' }}
          size="small"
          onClick={() => clearFilter()}
        >
          <span style={{ verticalAlign: 'top' }}>Clear All</span>
        </Link>
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Opportunity number"
          id="opportunity number"
          className="inputsize"
          onChange={onTextFilterChange}
          placeholder="Type text..."
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Opportunity name"
          id="opportunityName"
          className="inputsize"
          onChange={onTextFilterChange}
          placeholder="Type text..."
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Customer"
          id="customer"
          className="inputsize"
          onChange={onTextFilterChange}
          placeholder="Type text..."
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Protocol number"
          id="protocol number"
          className="inputsize"
          onChange={onTextFilterChange}
          placeholder="Type text..."
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Phase"
          id="phase"
          placeholder="Select value..."
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.phases : []}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Product"
          id="product"
          className="inputsize"
          onChange={onTextFilterChange}
          placeholder="Type text..."
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Therapeutic area"
          id="therapeuticArea"
          placeholder="Select value..."
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.therapeuticAreas : []}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label="Verbatim indication"
          id="verbatim indication"
          className="inputsize"
          onChange={onTextFilterChange}
          placeholder="Type text..."
          type="text"
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
          id="opportunity status"
          placeholder="Select value..."
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.opportunityStatuses : []}
        />
      </div>
      <div className="filter-wrapper">
        <UserLookup
          title="Team member"
          id="teamMember"
          className="lookup-wrapper-border"
          placeholder="Type text..."
          onChange={changeUser}
          withReset
        />
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
