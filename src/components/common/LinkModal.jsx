import React, { useState } from 'react';

const LinkModal = ({ onSave, onClose }) => {
  const [url, setUrl] = useState('');

  const handleInputChange = e => {
    setUrl(e.target.value);
  };

  const handleSave = () => {
    onSave(url);
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="link-modal-container">
      <div className="link-modal">
        <p>Link Address:</p>
        <input
          className="link-modal-input"
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter URL"
        />
        <div className="link-modal-actions">
          <button style={{ padding: '0px 26px 0px 26px' }} onClick={handleSave}>
            OK
          </button>
          <button
            style={{
              background: 'white',
              color: 'rgb(7, 104, 253)',
              border: '1px solid #d9d9d9'
              //   padding: '10px 20px'
            }}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
