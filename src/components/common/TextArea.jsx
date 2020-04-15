// @flow
import React from 'react';
import classnames from 'classnames';

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
        className={classnames('text-area-wrapper', className)}
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
