import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnvelopeButton from '../EnvelopeButton';

describe('EnvelopeButton', () => {
  it('renders read icon when isSeen is true', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <EnvelopeButton isSeen={true} onClick={onClick} />
    );
    const envelopeRead = getByTestId('envelope-read');
    expect(envelopeRead).toBeInTheDocument();
    expect(envelopeRead.tagName).toBe('svg');
  });

  it('renders unread icon when isSeen is false', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <EnvelopeButton isSeen={false} onClick={onClick} />
    );
    const envelopeUnread = getByTestId('envelope-unread');
    expect(envelopeUnread).toBeInTheDocument();
    expect(envelopeUnread.tagName).toBe('svg');
  });

  it('calls onClick function when read icon is clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <EnvelopeButton isSeen={true} onClick={onClick} />
    );
    const envelopeRead = getByTestId('envelope-read');
    fireEvent.click(envelopeRead);
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick function when unread icon is clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <EnvelopeButton isSeen={false} onClick={onClick} />
    );
    const envelopeUnread = getByTestId('envelope-unread');
    fireEvent.click(envelopeUnread);
    expect(onClick).toHaveBeenCalled();
  });
});
