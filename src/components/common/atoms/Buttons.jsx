// @flow
import React from 'react';
import classnames from 'classnames';

type Props = {
  id?: string,
  children: any,
  onClick: Function,
  className?: string,
  disabled?: boolean
};

const defaultProps = {
  id: undefined,
  className: undefined,
  disabled: false
};

export const PrimaryButton = ({
  id,
  onClick,
  children,
  className,
  disabled
}: Props) => (
  <button
    id={id}
    type="button"
    className={classnames('primary-button', className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

PrimaryButton.defaultProps = defaultProps;

export const SecondaryButton = ({
  id,
  onClick,
  children,
  className
}: Props) => (
  <button
    id={id}
    type="button"
    className={classnames('secondary-button', className)}
    onClick={onClick}
  >
    {children}
  </button>
);

SecondaryButton.defaultProps = defaultProps;

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
