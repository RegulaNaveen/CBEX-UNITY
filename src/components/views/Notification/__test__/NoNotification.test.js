import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import NoNotification from '../NoNotification';
describe('NoNotification Test', () => {
  afterEach(() => {
    cleanup();
  });
  it('Should have No new notifications text', async () => {
    render(<NoNotification />);
    const noNotificationText = screen.getByText('No new notifications');
    expect(noNotificationText).toBeInTheDocument();
  });
});
