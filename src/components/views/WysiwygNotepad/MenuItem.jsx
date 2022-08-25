import React from 'react';
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

export default ({ icon, title, action, isActive = null }) => (
  <button
    className={`menu-item${!!isActive && !!isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
    style={{ height: '25px', width: '25px' }}
  >
    <svg className="remix">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg>
  </button>
);
