import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Modal from 'apollo-react/components/Modal';
import classNames from 'classnames';
import '../../../styles/modals/CustomModal.scss';

/**
 * Custom Modal: To create a modal with extra properties
 */
const CustomModal = ({ className, modalStyle, ...props }) => {
  const styles = { modal: modalStyle };
  const useStyles = makeStyles(styles, { index: 1 });
  const classes = useStyles();

  return (
    <Modal
      className={`${classes.modal} custom-modal ${classNames({
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
