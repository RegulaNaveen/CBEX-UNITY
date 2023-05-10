// @flow
import React from 'react';

type Props = {
  children: any
};

const Modal = ({ children }: Props) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-dialog-blur" data-testid="modal-blur" />
      <div className="modal-dialog-wrapper" data-testid="modal-dialog">
        {children}
      </div>
    </div>
  );
};

export default Modal;
