import React from 'react';
import Iframe from 'react-iframe';

const Documents = () => {
  return (
    <div className="documents">
      <Iframe url="https://account.box.com/login" width="100%" height="100%" />
    </div>
  );
};

export default Documents;
