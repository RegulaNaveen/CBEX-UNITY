// @flow
import React from 'react';
import '../../../styles/App.scss';

type Props = {
  id: string,
  value: string,
  name: string,
  onChange: Function,
  checked?: boolean,
  children: any
};

const CheckBox = ({ id, value, name, onChange, checked, children }: Props) => (
  <label id={id} htmlFor={id} className='checkbox' tabIndex={-1}>
    <input
      id={id}
      name={name}
      value={value}
      type='checkbox'
      onChange={onChange}
      checked={checked}
    />
    {children}
  </label>
);

CheckBox.defaultProps = {
  checked: false
};

export default CheckBox;
