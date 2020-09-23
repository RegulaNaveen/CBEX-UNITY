// @flow
import React from 'react';
import '../../../styles/App.scss';

type Props = {
  id?: string,
  value: string,
  name: string,
  isChecked: boolean,
  children: string,
  onChange: Function
};

const CheckBox = ({
  id,
  value,
  name,
  onChange,
  isChecked,
  children
}: Props) => (
  <label htmlFor={id} className="checkbox" tabIndex={-1}>
    <input
      id={id}
      name={name}
      value={value}
      type="checkbox"
      onChange={onChange}
      ischecked={isChecked.toString()}
    />
    {children}
  </label>
);

CheckBox.defaultProps = {
  id: undefined
};

export default CheckBox;
