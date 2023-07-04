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
  clearFilter: Function,
  filters: any
};

const DashboardFilters = ({
  onTextFilterChange,
  onDropDownFilterChange,
  onDateRangeChange,
  fetchFilterValues,
  fetchUsers,
  filterValues,
  clearFilter,
  filters
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
    <div id="dashboard-filters" data-testid="dashboard-filters">
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
          id="opportunity number"
          type="text"
          label="Opportunity number"
          placeholder="Type text..."
          className="inputsize"
          defaultValue={filters['opportunity number']}
          onChange={onTextFilterChange}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          id="opportunityName"
          type="text"
          label="Opportunity name"
          placeholder="Type text..."
          className="inputsize"
          defaultValue={filters.opportunityName}
          onChange={onTextFilterChange}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          id="customer"
          type="text"
          label="Customer"
          placeholder="Type text..."
          className="inputsize"
          defaultValue={filters.customer}
          onChange={onTextFilterChange}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          id="protocol number"
          type="text"
          label="Protocol number"
          placeholder="Type text..."
          className="inputsize"
          defaultValue={filters['protocol number']}
          onChange={onTextFilterChange}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Phase"
          id="phase"
          placeholder="Select value..."
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.phases : []}
          defaultValue={filters.phase}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          type="text"
          id="product"
          label="Product"
          placeholder="Type text..."
          className="inputsize"
          defaultValue={filters.product}
          onChange={onTextFilterChange}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Therapeutic area"
          id="therapeuticArea"
          placeholder="Select value..."
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.therapeuticAreas : []}
          defaultValue={filters.therapeuticArea}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          type="text"
          id="verbatim indication"
          label="Verbatim indication"
          placeholder="Type text..."
          className="inputsize"
          defaultValue={filters['verbatim indication']}
          onChange={onTextFilterChange}
        />
      </div>
      <div className="filter-wrapper">
        <DateRange
          label="Bid due date"
          id="bid due date"
          onSetRange={changeDate}
          defaultValue={filters['bid due date']}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title="Opportunity stage"
          id="opportunity status"
          placeholder="Select value..."
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.opportunityStatuses : []}
          defaultValue={filters['opportunity status']}
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
          defaultValue={filters.teamMember}
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
