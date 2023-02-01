import { render } from '@testing-library/react';
import { SocketContext } from '../context/SocketContext';

const renderWithContext = (ui, options) =>
    render(ui, { wrapper: SocketContext, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };