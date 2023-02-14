import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import BidDoneBanner from '../BidDoneBanner';

afterEach(cleanup);

describe('BidDoneBanner', () => {
  it('should display the success message', () => {
    const { getByText } = render(<BidDoneBanner isOpen />);
    const message = getByText(
      'All done. New bid created and is now available for review!'
    );
    expect(message).toBeInTheDocument();
  });

  it('should call onCloseHandler after 10 seconds', () => {
    jest.useFakeTimers();
    const onCloseHandler = jest.fn();
    render(<BidDoneBanner isOpen onCloseHandler={onCloseHandler} />);
    jest.advanceTimersByTime(10000);
    expect(onCloseHandler).toHaveBeenCalled();
  });

  it('should not display the success message if isOpen is false', () => {
    const { queryByText } = render(<BidDoneBanner />);
    const message = queryByText(
      'All done. New bid created and is now available for review!'
    );
    expect(message).toBeNull();
  });

  it('should call onCloseHandler when the close button is clicked', () => {
    const onCloseHandler = jest.fn();
    const { getByRole } = render(
      <BidDoneBanner isOpen onCloseHandler={onCloseHandler} />
    );
    const closeButton = getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseHandler).toHaveBeenCalled();
  });
});
