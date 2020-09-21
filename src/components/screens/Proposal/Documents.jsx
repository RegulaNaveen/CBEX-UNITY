import React from 'react';
import Iframe from 'react-iframe';

const Documents = () => {
  return (
    <div className="documents">
      <Iframe
        url="https://app.box.com/folder/119641406123"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Documents;
