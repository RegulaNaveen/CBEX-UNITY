// @flow
import React from 'react';

type Props = {
  title: string,
  placeholder: string,
  onChange: Function,
  type: string,
  id?: string
};

const InputField = ({ title, placeholder, onChange, type, id }: Props) => (
  <>
    <p className='input-title'>{title}</p>
    <input
      id={id}
      className='input'
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  </>
);

InputField.defaultProps = {
    id: undefined
}

export default InputField
