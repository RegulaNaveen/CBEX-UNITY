import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import AccordionSummary from '@mui/material/AccordionSummary';
import ChevronRight from 'apollo-react-icons/ChevronRight';

const CustomAccordionSummary = ({ children, className }) => {
  return (
    <AccordionSummary
      expandIcon={<ChevronRight />}
      className={`custom-accordion-summary ${className || ''}`}
    >
      {children}
    </AccordionSummary>
  );
};

CustomAccordionSummary.defaultProps = {
  className: '',
  children: null
};

CustomAccordionSummary.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default CustomAccordionSummary;
