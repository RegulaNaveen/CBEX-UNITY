// @flow
import React, { useCallback } from 'react';
import Dropdown from './Dropdown';

type Props = {
  id: string,
  onChange: Function,
  title: string,
  placeholder: String,
  items: Array<Object>,
  defaultValue?: string
};

const FilterDropDown = ({
  id,
  onChange,
  title,
  items,
  placeholder,
  defaultValue
}: Props) => {
  const filterChange = useCallback(value => onChange(id, value));
  return (
    <Dropdown
      title={title}
      id={id}
      onClick={filterChange}
      items={items}
      placeholder={placeholder}
      withReset
      selectedValue={defaultValue}
    />
  );
};

FilterDropDown.defaultProps = {
  defaultValue: ''
};

export default FilterDropDown;
