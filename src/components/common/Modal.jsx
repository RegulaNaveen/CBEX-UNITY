// @flow
import React from 'react';

type Props = {
  children: any
};

const Modal = ({ children }: Props) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-dialog-wrapper">{children}</div>
    </div>
  );
};

export default Modal;
