import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';
import classNames from 'classnames';
import '../../../styles/modals/CustomModal.scss';

/**
 * Custom Modal: To create a modal with extra properties
 */
const CustomModal = ({ className, ...props }) => {
  return (
    <Modal
      className={`custom-modal ${classNames({
        [className]: !!className
      })}`}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

CustomModal.defaultProps = {
  className: '',
  modalStyle: { maxWidth: 600 },
  children: null
};

CustomModal.propTypes = {
  className: PropTypes.string,
  modalStyle: PropTypes.object,
  children: PropTypes.any
};

export default CustomModal;
