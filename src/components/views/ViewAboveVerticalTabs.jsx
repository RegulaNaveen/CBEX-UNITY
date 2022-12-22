import React from 'react';
import * as ReactDOM from 'react-dom';

function ViewAboveVerticalTabs({ children }) {
  if (document.getElementById('fullwidth-view-above-vertical-tabs') !== null) {
    return ReactDOM.createPortal(
      children,
      document.getElementById('fullwidth-view-above-vertical-tabs')
    );
  }
  return ReactDOM.createPortal(children, document.createElement('div'));
}

export default ViewAboveVerticalTabs;
