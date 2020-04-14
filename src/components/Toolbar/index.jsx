// @flow

import React from 'react';

const Toolbar = () => {
  return (
    <div className="toolbar-wrapper">
      <p className="toolbar-title-one">IQVIA™</p>
      <p className="toolbar-title-two">Unity</p>
      <div className="toolbar-navigation-wrapper">
        <p className="toolbar-navigation-title">Home</p>
        <p className="toolbar-navigation-title proposals">Proposals</p>
        <p className="toolbar-navigation-title">Q & A</p>
      </div>
      <div className="toolbar-profile-spacer">
        <div className="toolbar-profile-wrapper">
          <p className="toolbar-navigation-title">Home</p>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
