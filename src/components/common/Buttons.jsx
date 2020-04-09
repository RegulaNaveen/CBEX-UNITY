// @flow
import React from 'react';

type Props = {
  id?: string,
  children: string,
  type: string,
  onChange: Function
};

const PrimaryButton = ({ id, type, onChange, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button id={id} type={type} className="primary-button" onChange={onChange}>
    {children}
  </button>
);

const LinkButton = ({ id, type, onChange, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button id={id} type={type} className="link-button" onChange={onChange}>
    {children}
  </button>
);

const defaultProps = {
  id: undefined
};

PrimaryButton.defaultProps = defaultProps;
LinkButton.defaultProps = defaultProps;

export { PrimaryButton, LinkButton };
