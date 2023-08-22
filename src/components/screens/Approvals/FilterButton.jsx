import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Filter from 'apollo-react-icons/Filter';

const FilterButton = ({ setIsShowFilters }) => {
  const approvalFilters = useSelector(state => state.approvals.filters);
  const appliedCount = approvalFilters.filter(i => i.value).length;
  return (
    <Button
      variant="secondary"
      size="small"
      icon={<Filter fontSize="extraSmall" />}
      onClick={() => {
        setIsShowFilters(val => !val);
      }}
    >
      {appliedCount ? `Filter (${appliedCount})` : 'Filter'}
    </Button>
  );
};

export default FilterButton;
