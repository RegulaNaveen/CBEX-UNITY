// @flow
import React, { useCallback } from 'react';
import Dropdown from './Dropdown';

type Props = {
  id: string,
  onChange: Function,
  title: string,
  placeholder: String,
  items: Array<Object>
};

const FilterDropDown = ({ id, onChange, title, items, placeholder }: Props) => {
  const filterChange = useCallback(value => onChange(id, value));
  return (
    <Dropdown
      title={title}
      id={id}
      onClick={filterChange}
      items={items}
      placeholder={placeholder}
      withReset
    />
  );
};

export default FilterDropDown;
