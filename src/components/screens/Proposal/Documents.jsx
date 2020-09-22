import React from 'react';

const Documents = () => {
  return (
    <div className="documents">
      <iframe
        src="https://app.box.com/embed/folder/122413951982?sortColumn=date&view=list"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        webkitallowfullscreen
        msallowfullscreen
        title="Box Documents"
      />
    </div>
  );
};

export default Documents;
