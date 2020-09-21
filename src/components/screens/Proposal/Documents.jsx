import React from 'react';
import Iframe from 'react-iframe';

const Documents = () => {
  return (
    <div className="documents">
      <Iframe
        url="https://quintiles.app.box.com/folder/66838506693"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Documents;
