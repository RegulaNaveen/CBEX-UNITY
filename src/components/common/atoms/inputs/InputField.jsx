// @flow
import React from 'react';

type Props = {
  label: string,
  title?: string,
  placeholder: string,
  type: string,
  id?: string,
  onChange: Function,
  defaultValue?: string,
  className?: string,
  value?: string
};

const InputField = ({
  label,
  title,
  placeholder,
  type,
  id,
  onChange,
  className,
  value,
  defaultValue
}: Props) => (
  <>
    {label ? <p className="input-title">{label}</p> : null}
    <input
      id={id}
      title={title}
      className={className || 'input'}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  </>
);

InputField.defaultProps = {
  id: undefined,
  title: undefined,
  defaultValue: '',
  className: '',
  value: ''
};

export default InputField;
