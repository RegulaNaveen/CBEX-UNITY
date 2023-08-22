// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';

const CustomAccordion = ({ children, className, ...props }) => {
  return (
    <Accordion
      {...props}
      TransitionProps={{ unmountOnExit: true }}
      className={`unity-custom-accordion ${className || ''}`}
    >
      {children}
    </Accordion>
  );
};

CustomAccordion.defaultProps = {
  className: '',
  children: null
};

CustomAccordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default CustomAccordion;
