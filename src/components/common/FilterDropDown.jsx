// @flow
import React, { useCallback } from 'react';
import Dropdown from './Dropdown';

type Props = {
  id: string,
  onChange: Function,
  title: string,
  items: Array<Object>
};

const FilterDropDown = ({ id, onChange, title, items }: Props) => {
  const filterChange = useCallback(value => onChange(id, value));
  return (
    <Dropdown
      title={title}
      id={id}
      onClick={filterChange}
      items={items}
      placeholder={title}
      withReset
    />
  );
};

export default FilterDropDown;
