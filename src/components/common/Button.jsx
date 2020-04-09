// @flow
import React from 'react';

type Props = {
  id?: string,
  children: string,
  type: string,
  onClick: Function
};

const PrimaryButton = ({ id, type, onClick, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button id={id} type={type} className="primary-button" onClick={onClick}>
    {children}
  </button>
);

const LinkButton = ({ id, type, onClick, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button id={id} type={type} className="link-button" onClick={onClick}>
    {children}
  </button>
);

const CloseButton = ({ id, type, onClick, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button id={id} type={type} className="close-button" onClick={onClick}>
    {children}
  </button>
);

const OkayButton = ({ id, type, onClick, children }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button id={id} type={type} className="okay-button" onClick={onClick}>
    {children}
  </button>
);

const defaultProps = {
  id: undefined
};

PrimaryButton.defaultProps = defaultProps;
LinkButton.defaultProps = defaultProps;
CloseButton.defaultProps = defaultProps;
OkayButton.defaultProps = defaultProps;

export { PrimaryButton, LinkButton, CloseButton, OkayButton };
