import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import NoNotification from '../NoNotification';
import { useHistory } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

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
