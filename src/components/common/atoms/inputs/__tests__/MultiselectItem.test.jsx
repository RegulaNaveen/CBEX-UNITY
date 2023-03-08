import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MultiselectItem from '../MultiselectItem';

describe('MultiselectItem component', () => {
  const props = {
    onClick: jest.fn(),
    item: 'Item 1',
    isSelected: false,
    parentRef: {
      current: {
        scrollTop: 0
      }
    },
    focused: false,
    key: 'item-1'
  };

  it('renders correctly', () => {
    const { getByRole, getByText } = render(<MultiselectItem {...props} />);
    expect(getByRole('presentation')).toBeInTheDocument();
    expect(getByText(props.item)).toBeInTheDocument();
  });

  it('calls onClick function when clicked', () => {
    const { getByRole } = render(<MultiselectItem {...props} />);
    fireEvent.click(getByRole('presentation'));
    expect(props.onClick).toHaveBeenCalledTimes(1);
    expect(props.onClick).toHaveBeenCalledWith(expect.any(Object), props.item);
  });

  it('applies "selected" class when isSelected prop is true', () => {
    const { getByRole } = render(<MultiselectItem {...props} isSelected />);
    expect(getByRole('presentation')).toHaveClass('selected');
  });

  it('applies "focused" class when focused prop is true', () => {
    const { getByRole } = render(<MultiselectItem {...props} focused />);
    expect(getByRole('presentation')).toHaveClass('focused');
  });

  it.skip('scrolls parent element to selected item when focused prop is true', () => {
    const parentRef = { current: { scrollTop: 0 } };
    const { rerender } = render(
      <MultiselectItem {...props} parentRef={parentRef} />
    );
    const itemRef = { current: { offsetTop: 50 } };
    rerender(
      <MultiselectItem
        {...props}
        parentRef={parentRef}
        focused
        itemRef={itemRef}
      />
    );
    expect(parentRef.current.scrollTop).toBe(itemRef.current.offsetTop);
  });
});
