// @flow
import React from 'react';

type Props = {
  id?: string,
  children: string,
  type: string,
  onClick: Function,
  className: string
};

const PrimaryButton = ({ id, type, onClick, children, className }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button
    id={id}
    type={type}
    className={className || 'primary-button'}
    onClick={onClick}
  >
    {children}
  </button>
);

const LinkButton = ({ id, type, onClick, children, className }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button
    id={id}
    type={type}
    className={className || 'link-button'}
    onClick={onClick}
  >
    {children}
  </button>
);

const defaultProps = {
  id: undefined
};

PrimaryButton.defaultProps = defaultProps;
LinkButton.defaultProps = defaultProps;

export { PrimaryButton, LinkButton };
