import React from 'react';
import Tooltip from 'apollo-react/components/Tooltip';

const SourceDocument = ({ className = '', buttonLabel, title, content }) => (
  <div className={className}>
    <Tooltip
      id="answer-tooltip"
      variant="light"
      title={title}
      subtitle={content}
      placement="left-start"
    >
      <span className="src-doc-btn-label">{buttonLabel}</span>
    </Tooltip>
  </div>
);

export default SourceDocument;
