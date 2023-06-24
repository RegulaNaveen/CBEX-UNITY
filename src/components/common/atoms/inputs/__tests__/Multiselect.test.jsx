import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Multiselect from '../Multiselect';

describe('Multiselect', () => {
  const mockOnClick = jest.fn();
  const mockOnCascadeChange = jest.fn();
  const mockSetSelectRow = jest.fn();
  const mockToggleWatch = jest.fn();
  const mockQuestionUnlockWrapper = jest.fn();

  const defaultProps = {
    placeholder: 'Select',
    items: [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' }
    ],
    onClick: mockOnClick,
    disabled: false,
    onCascadeChange: mockOnCascadeChange,
    setSelectRow: mockSetSelectRow,
    toggleWatch: mockToggleWatch,
    questionId: '1234',
    value: ['item1']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const { getByTestId } = render(<Multiselect {...defaultProps} />);
    const multiselect = getByTestId('multiselect-testId');
    expect(multiselect).toBeInTheDocument();
  });

  it('should show selected values', () => {
    const { getByText } = render(<Multiselect {...defaultProps} />);
    const selectedValues = getByText('item1');
    expect(selectedValues).toBeInTheDocument();
  });

  it('should show dropdown options when clicked', () => {
    const { getByTestId, getByText } = render(
      <Multiselect {...defaultProps} />
    );
    const multiselect = getByTestId('multiselect-testId');
    fireEvent.click(multiselect);
    const item1 = getByText('item1');

    expect(item1).toBeInTheDocument();
  });

  it.skip('should call onClick with selected values when dropdown is closed', () => {
    const { getByTestId, getByText } = render(
      <Multiselect {...defaultProps} />
    );
    const multiselect = getByTestId('multiselect-testId');
    fireEvent.click(multiselect);
    const item1 = getByText('item1');
    fireEvent.click(item1);
    fireEvent.click(multiselect);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should toggle dropdown when multiselect is clicked', () => {
    const { getByTestId } = render(<Multiselect {...defaultProps} />);
    const multiselect = getByTestId('multiselect-testId');
    fireEvent.click(multiselect);
    fireEvent.click(multiselect);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it.skip('should call onCascadeChange when an item is selected', () => {
    const { getByTestId, getByText } = render(
      <Multiselect {...defaultProps} />
    );
    const multiselect = getByTestId('multiselect-testId');
    fireEvent.click(multiselect);
    const item1 = getByText('item1');
    fireEvent.click(item1);
    expect(mockOnCascadeChange).toHaveBeenCalled();
  });

  it.skip('should call setSelectRow with true when multiselect is focused', () => {
    const { getByTestId } = render(<Multiselect {...defaultProps} />);
    const multiselect = getByTestId('multiselect-testId');
    fireEvent.focusIn(multiselect);
    expect(mockSetSelectRow).toHaveBeenCalled();
  });
});
