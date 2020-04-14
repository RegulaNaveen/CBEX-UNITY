// @flow
import React from 'react';

type Props = {
  children: any
};

const Modal = ({ children }: Props) => {
  return (
    <div className="blur-modal">
      <div className="modal-wrapper" id="showModal">
        {children}
      </div>
    </div>
  );
};

export default Modal;
