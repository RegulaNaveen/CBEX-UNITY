import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckBox from '../Checkbox';

describe('CheckBox', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <CheckBox
        value="check"
        name="check"
        isChecked={false}
        onChange={() => {}}
      >
        Check this
      </CheckBox>
    );
    const checkbox = getByText('Check this');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.tagName).toBe('LABEL');
    expect(checkbox).toHaveClass('checkbox');
  });

  test('calls onChange when checked', () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <CheckBox
        value="check"
        name="check"
        isChecked={false}
        onChange={onChangeMock}
      >
        Check this
      </CheckBox>
    );
    const checkbox = getByLabelText('Check this');
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalled();
  });

  test('renders with default props', () => {
    const { getByText } = render(
      <CheckBox
        value="check"
        name="check"
        isChecked={false}
        onChange={() => {}}
      >
        Check this
      </CheckBox>
    );
    const checkbox = getByText('Check this');
    expect(checkbox).not.toHaveAttribute('id');
  });
});
