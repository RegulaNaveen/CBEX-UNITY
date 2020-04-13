// @flow
import React from 'react';

type Props = {
  id?: string,
  children: string,
  onClick: Function,
  className: string
};

const PrimaryButton = ({ id, onClick, children, className }: Props) => (
  <button
    id={id}
    type="button"
    className={className || 'primary-button'}
    onClick={onClick}
  >
    {children}
  </button>
);

const LinkButton = ({ id, onClick, children, className }: Props) => (
  <button
    id={id}
    type="button"
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
