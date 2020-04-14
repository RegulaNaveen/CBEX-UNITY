// @flow
import React from 'react';

type Props = {
  id?: string,
  className: string,
  value: string,
  onChange: Function,
  placeholder: string
};

const TextArea = ({ id, className, value, onChange, placeholder }: Props) => {
  return (
    <textarea
      id={id}
      className={className || 'text-area-wrapper'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

TextArea.defaultProps = {
  id: undefined
};

export default TextArea;
