import React from 'react';
import Modal from 'apollo-react/components/Modal';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import PropTypes from 'prop-types';

const ProcessingCRM = ({ isOpen }) => {
  const title = 'Processing CRM data';
  const message = `A new Bid is being created based on CRM data`;
  return (
    <Modal
      id={'processingcrm'}
      open={isOpen}
      alt={title}
      title={title}
      subtitle=""
      hideButtons={true}
      variant="warning"
    >
      <p>{message}</p>
      <div className="apollo-progress-flexed">
        <ApolloProgress />
      </div>
    </Modal>
  );
};

ProcessingCRM.propTypes = {
  isOpen: PropTypes.bool
};
ProcessingCRM.defaultProps = {
  isOpen: false
};
export default ProcessingCRM;
