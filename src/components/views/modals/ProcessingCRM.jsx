import React from 'react';
import Modal from 'apollo-react/components/Modal';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import PropTypes from 'prop-types';

const ProcessingCRM = ({ isOpen, title, message }) => {
  return (
    <Modal
      id="processingcrm"
      open={isOpen}
      alt={title}
      title={title}
      hideButtons
      variant="warning"
    >
      <p style={{ textAlign: 'center' }}>{message}</p>
      <div className="apollo-progress-flexed">
        <ApolloProgress />
      </div>
    </Modal>
  );
};

ProcessingCRM.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string
};
ProcessingCRM.defaultProps = {
  isOpen: false,
  title: 'Title',
  message: 'Message Text'
};
export default ProcessingCRM;
