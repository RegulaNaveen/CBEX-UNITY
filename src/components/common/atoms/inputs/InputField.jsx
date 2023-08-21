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
  className?: string
};

const InputField = ({
  label,
  title,
  placeholder,
  type,
  id,
  onChange,
  className,
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
      defaultValue={defaultValue}
    />
  </>
);

InputField.defaultProps = {
  id: undefined,
  title: undefined,
  defaultValue: '',
  className: ''
};

export default InputField;
