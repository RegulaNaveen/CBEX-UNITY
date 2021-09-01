// @flow
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
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
          label=""
          id="opportunity number"
          onChange={onTextFilterChange}
          placeholder="Opportunity number"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label=""
          id="opportunityName"
          onChange={onTextFilterChange}
          placeholder="Opportunity name"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label=""
          id="customer"
          onChange={onTextFilterChange}
          placeholder="Customer"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label=""
          id="protocol number"
          onChange={onTextFilterChange}
          placeholder="Protocol number"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title=""
          id="phase"
          placeholder='Phase'
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.phases : []}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label=""
          id="product"
          onChange={onTextFilterChange}
          placeholder="Product"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title=""
          id="therapeuticArea"
          placeholder='Therapeutic area'
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.therapeuticAreas : []}
        />
      </div>
      <div className="filter-wrapper">
        <InputField
          label=""
          id="verbatim indication"
          onChange={onTextFilterChange}
          placeholder="Verbatim indication"
          type="text"
        />
      </div>
      <div className="filter-wrapper">
        <DateRange
          label=""
          id="bid due date"
          placeholder="Bid due date"
          onSetRange={changeDate}
        />
      </div>
      <div className="filter-wrapper">
        <FilterDropDown
          title=""
          id="opportunity status"
          placeholder="Opportunity status"
          onChange={onDropDownFilterChange}
          items={filterValues ? filterValues.opportunityStatuses : []}
        />
      </div>
      <div className="filter-wrapper">
        <UserLookup
          title=""
          id="teamMember"
          placeholder="Team member"
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
