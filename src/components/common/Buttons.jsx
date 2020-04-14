// @flow
import React from 'react';
import classnames from 'classnames';

type Props = {
  id?: string,
  children: string,
  onClick: Function,
  className?: string
};

const defaultProps = {
  id: undefined,
  className: undefined
};

export const PrimaryButton = ({ id, onClick, children, className }: Props) => (
  <button
    id={id}
    type="button"
    className={classnames('primary-button', className)}
    onClick={onClick}
  >
    {children}
  </button>
);

PrimaryButton.defaultProps = defaultProps;

export const LinkButton = ({ id, onClick, children, className }: Props) => (
  <button
    id={id}
    type="button"
    className={classnames('link-button', className)}
    onClick={onClick}
  >
    {children}
  </button>
);

LinkButton.defaultProps = defaultProps;
