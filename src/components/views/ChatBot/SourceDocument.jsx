import React from 'react';
import Tooltip from 'apollo-react/components/Tooltip';

const SourceDocument = ({
  className = '',
  buttonLabel,
  title,
  content,
  pageNo
}) => (
  <div className={className}>
    <Tooltip
      id="answer-tooltip"
      variant="light"
      title={
        <div className="tooltip-title">
          <div>{title.replace(/^\/usr\/src\/app\/api\/data\//, '')}</div>
          <div>Page: {pageNo}</div>
        </div>
      }
      subtitle={content}
      placement="left-start"
    >
      <span className="src-doc-btn-label">{buttonLabel}</span>
    </Tooltip>
  </div>
);

export default SourceDocument;
