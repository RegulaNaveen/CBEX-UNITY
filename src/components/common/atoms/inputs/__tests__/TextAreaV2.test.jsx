import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextAreaV2 from '../TextAreaV2';

describe('TextAreaV2', () => {
  it('renders without errors', () => {
    const { getByPlaceholderText } = render(
      <TextAreaV2 placeholder="Enter text" />
    );
    expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('updates the value when the user types', () => {
    const { getByPlaceholderText } = render(
      <TextAreaV2 placeholder="Enter text" />
    );
    const textarea = getByPlaceholderText('Enter text');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(textarea.value).toBe('Hello');
  });

  it('triggers the onBlur event when the textarea loses focus', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <TextAreaV2 placeholder="Enter text" onBlur={onBlur} />
    );
    const textarea = getByPlaceholderText('Enter text');
    fireEvent.blur(textarea);
    expect(onBlur).toHaveBeenCalled();
  });

  it('triggers the onFocus event when the textarea gains focus', () => {
    const onFocus = jest.fn();
    const { getByPlaceholderText } = render(
      <TextAreaV2 placeholder="Enter text" onFocus={onFocus} />
    );
    const textarea = getByPlaceholderText('Enter text');
    fireEvent.focus(textarea);
    expect(onFocus).toHaveBeenCalled();
  });
});
