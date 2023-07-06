import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  const mockHandleDayChange = jest.fn();
  const mockHandleFormatDate = jest.fn();
  const mockHandleDate = jest.fn();
  const selectedDay = '2022-03-07';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the selected day and placeholder text', () => {
    const { getByPlaceholderText } = render(
      <DatePicker
        selectedDay={selectedDay}
        handleDayChange={mockHandleDayChange}
        handleFormatDate={mockHandleFormatDate}
        handleDate={mockHandleDate}
      />
    );
    const datePicker = getByPlaceholderText('DD/MM/YYYY');
    expect(datePicker).toBeInTheDocument();
  });

  it('calls handleDayChange when a new day is picked', () => {
    const { getByPlaceholderText } = render(
      <DatePicker
        selectedDay={selectedDay}
        handleDayChange={mockHandleDayChange}
        handleFormatDate={mockHandleFormatDate}
        handleDate={mockHandleDate}
      />
    );
    const datePicker = getByPlaceholderText('DD/MM/YYYY');
    fireEvent.change(datePicker, { target: { value: '08/03/2022' } });
    expect(mockHandleDayChange).toHaveBeenCalled();
  });

  it('renders the component with a label', () => {
    const { getByText } = render(
      <DatePicker
        label="Pick a day"
        selectedDay={selectedDay}
        handleDayChange={mockHandleDayChange}
        handleFormatDate={mockHandleFormatDate}
        handleDate={mockHandleDate}
      />
    );
    const label = getByText('Pick a day');
    expect(label).toBeInTheDocument();
  });
});
