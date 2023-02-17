/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Filter from 'apollo-react-icons/Filter';

const FilterButton = ({ setIsShowFilters }) => {
  const unityTabFilters = useSelector(state => state.unitytab.filters);
  const appliedCount = unityTabFilters.filter(i => i.value).length;
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
