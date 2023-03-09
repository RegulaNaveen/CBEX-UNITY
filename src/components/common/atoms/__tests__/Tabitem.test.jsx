import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabItem from '../TabItem';

describe('TabItem', () => {
  const mockOnClick = jest.fn();
  const mockItem = { props: { label: 'Test Tab' } };
  const mockIndex = 0;
  const mockSelected = 0;

  afterEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with correct label', () => {
    const { getByText } = render(
      <TabItem
        onClick={mockOnClick}
        item={mockItem}
        index={mockIndex}
        selected={mockSelected}
      />
    );
    expect(getByText('Test Tab')).toBeInTheDocument();
  });

  it('calls onClick function with correct index when clicked', () => {
    const { getByText } = render(
      <TabItem
        onClick={mockOnClick}
        item={mockItem}
        index={mockIndex}
        selected={mockSelected}
      />
    );
    fireEvent.click(getByText('Test Tab'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  it('renders with "selected" class when index matches selected prop', () => {
    const { getByText } = render(
      <TabItem
        onClick={mockOnClick}
        item={mockItem}
        index={mockIndex}
        selected={mockSelected}
      />
    );
    const tabItem = getByText('Test Tab');
    expect(tabItem).toHaveClass('selected');
  });

  it('renders without "selected" class when index does not match selected prop', () => {
    const { getByText } = render(
      <TabItem
        onClick={mockOnClick}
        item={mockItem}
        index={mockIndex}
        selected={1}
      />
    );
    const tabItem = getByText('Test Tab');
    expect(tabItem).not.toHaveClass('selected');
  });
});
