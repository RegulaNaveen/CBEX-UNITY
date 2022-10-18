import React from 'react';
import Button from '@material-ui/core/Button';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback UI Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary" role="alert">
      <h1>Something went wrong:</h1>
      <pre>{error.stack}</pre>
      <Button
        variant="contained"
        onClick={resetErrorBoundary}
        className="try-again-btn"
      >
        Try again
      </Button>
    </div>
  );
}

const errorHandler = () => {
  // Do something with the error
  // E.g. log to an error logging client here
};

const ErrorBoundaryComponent = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryComponent;
