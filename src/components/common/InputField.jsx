// @flow
import React from 'react';

type Props = {
  title: string,
  placeholder: string,
  type: string,
  id?: string,
  onChange: Function
};

const InputField = ({ title, placeholder, type, id, onChange }: Props) => (
  <>
    <p className="input-title">{title}</p>
    <input
      id={id}
      className="input"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  </>
);

InputField.defaultProps = {
  id: undefined
};

export default InputField;
