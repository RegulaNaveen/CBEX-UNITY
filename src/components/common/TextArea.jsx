// @flow
import React from 'react';

type Props = {
  id?: string,
  className: string,
  value: string,
  onChange: Function,
  placeholder: string,
  title?: string
};

const TextArea = ({
  id,
  className,
  value,
  onChange,
  placeholder,
  title
}: Props) => {
  return (
    <>
      <p className="text-area-title">{title}</p>
      <textarea
        id={id}
        className={className || 'text-area-wrapper'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

TextArea.defaultProps = {
  id: undefined,
  title: undefined
};

export default TextArea;
