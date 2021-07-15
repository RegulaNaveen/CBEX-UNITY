// @flow
import React from 'react';

type Props = {
  label: string,
  title?: string,
  placeholder: string,
  type: string,
  id?: string,
  onChange: Function,
};

const InputField = ({
  label,
  title,
  placeholder,
  type,
  id,
  onChange,
}: Props) => (
  <>
    <p className="input-title">{label}</p>
    <input
      id={id}
      title={title}
      className="input"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  </>
);

InputField.defaultProps = {
  id: undefined,
  title: undefined,
};

export default InputField;
