// Import dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';

// Import component to test
import Modal from '../Modal';

describe('Modal component', () => {
  it('should render its children', () => {
    // Render the component with some children
    render(
      <Modal>
        <h1>Test Modal</h1>
      </Modal>
    );

    // Check that the children are rendered
    const modalTitle = screen.getByRole('heading', { name: /test modal/i });
    expect(modalTitle).toBeInTheDocument();
  });

  it('should have a blur background and a dialog wrapper', () => {
    // Render the component
    render(<Modal />);

    // Check that the blur background and dialog wrapper are present
    const blurBackground = screen.getByTestId('modal-blur');
    const dialogWrapper = screen.getByTestId('modal-dialog');
    expect(blurBackground).toBeInTheDocument();
    expect(dialogWrapper).toBeInTheDocument();
  });
});
