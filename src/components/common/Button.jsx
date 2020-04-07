// @flow
import React from 'react';

type Props = {
  children: string,
  type: string,
  onChange: Function
};

const PrimaryButton = ({ type, onChange, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className="primary-button" onChange={onChange}>
    {children}
  </button>
);

const LinkButton = ({ type, onChange, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className="link-button" onChange={onChange}>
    {children}
  </button>
);

export { PrimaryButton, LinkButton };
