import React from 'react';

export default ({ icon, title, action, isActive = null }) => (
  <button
    className={`menu-item${!!isActive && !!isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
    style={{ height: '25px', width: '25px' }}
  >
    <svg className="remix">
      <use
        xlinkHref={`${window.location.origin}/assets/symbol.svg#ri-${icon}`}
      />
    </svg>
  </button>
);
