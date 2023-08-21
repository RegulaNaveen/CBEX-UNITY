import React, { useEffect } from 'react';
import Banner from 'apollo-react/components/Banner';
import PropTypes from 'prop-types';

const BidDoneBanner = ({ isOpen, onCloseHandler }) => {
  const message = `All done. New bid created and is now available for review!`;
   useEffect(()=>{
    let timeoutId;
    if(onCloseHandler && isOpen){
      timeoutId = setTimeout(onCloseHandler, 10000)
    }
    return ()=>{
      if(timeoutId)
        clearTimeout(timeoutId)
    }
  })

  return (
    <Banner
      variant="success"
      open={isOpen}
      message={message}
      onClose={onCloseHandler}
    ></Banner>
  );
};

BidDoneBanner.propTypes = {
  isOpen: PropTypes.bool,
  onCloseHandler: PropTypes.func
};
BidDoneBanner.defaultProps = {
  isOpen: false,
  onCloseHandler() {}
};
export default BidDoneBanner;
