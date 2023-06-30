import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropdownItem from '../DropdownItem';

describe('DropdownItem', () => {
  const props = {
    onClick: jest.fn(),
    item: 'test item',
    focused: false,
    parentOffsetTop: 0
  };

  it('renders the component', () => {
    const { getByRole } = render(<DropdownItem {...props} />);
    const dropdownItem = getByRole('option');
    expect(dropdownItem).toBeInTheDocument();
  });

  it('renders the item text', () => {
    const { getByRole } = render(<DropdownItem {...props} />);
    const dropdownItem = getByRole('option');
    expect(dropdownItem).toHaveTextContent('test item');
  });

  it('adds "active" class if focused prop is true', () => {
    const { getByRole } = render(<DropdownItem {...props} focused={true} />);
    const dropdownItem = getByRole('option');
    expect(dropdownItem).toHaveClass('active');
  });

  it('calls the onClick handler when clicked', () => {
    const { getByRole } = render(<DropdownItem {...props} />);
    const dropdownItem = getByRole('option');
    fireEvent.click(dropdownItem);
    expect(props.onClick).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenCalledWith(expect.any(Object), 'test item');
  });
});
