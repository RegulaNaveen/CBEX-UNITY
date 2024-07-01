import Button from 'apollo-react/components/Button';
import React from 'react';
export const MultiResponseChat = ({ className = '', data }) => {
  return (
    <div className={className}>
      <p>It seems there are multiple answers for this request!</p>
      <ol>
        <li>
          {' '}
          <p>
            The document name of the document states that the final percentage
            is 30%{' '}
          </p>
          <Button variant="secondary" size="small" style={{ marginRight: 10 }}>
            Show me the eCOA recommended services
          </Button>
        </li>
        <li>
          {' '}
          <p>
            The document name of the document states that the final percentage
            is 30%{' '}
          </p>
          <Button variant="secondary" size="small" style={{ marginRight: 10 }}>
            Show me the eCOA recommended services
          </Button>
        </li>
        <li>
          {' '}
          <p>
            The document name of the document states that the final percentage
            is 30%{' '}
          </p>
          <Button variant="secondary" size="small" style={{ marginRight: 10 }}>
            Show me the eCOA recommended services
          </Button>
        </li>
      </ol>
    </div>
  );
};
