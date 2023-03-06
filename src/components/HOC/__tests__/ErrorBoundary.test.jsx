import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import ErrorBoundaryComponent, { ErrorFallback } from '../ErrorBoundary';

describe('ErrorBoundaryComponent', () => {
  const props = {
    ErrorFallback: jest.fn()
  };
  it('renders its children without error', () => {
    render(
      <ErrorBoundaryComponent>
        <p>Child Component</p>
      </ErrorBoundaryComponent>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders the fallback UI component when an error is thrown', () => {
    const ThrowErrorComponent = () => {
      throw new Error('Test Error');
    };
    render(
      <ErrorBoundaryComponent>
        <ThrowErrorComponent />
      </ErrorBoundaryComponent>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
