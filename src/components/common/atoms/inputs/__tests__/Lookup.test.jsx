import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lookup from '../Lookup';

describe.skip('Lookup', () => {
  const data = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Doe', email: 'jane.doe@example.com' }
  ];
  const placeholder = 'Enter a value';
  it('renders the component', () => {
    const { container } = render(<Lookup data={data} />);
    expect(container).toBeInTheDocument();
  });

  it('filters the data based on the input value', () => {
    const { getByPlaceholderText, getByText } = render(
      <Lookup data={data} placeholder={placeholder} />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    expect(getByText('John Doe (john.doe@example.com)')).toBeInTheDocument();
  });

  it('displays the filtered data', () => {
    const { getByPlaceholderText, getByText } = render(
      <Lookup data={data} placeholder={placeholder} />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    expect(getByText('John Doe (john.doe@example.com)')).toBeInTheDocument();
  });

  it.skip('resets the search value when the reset button is clicked', () => {
    const getSelectedItem = jest.fn();
    const { getByPlaceholderText, getByText, getByRole, queryByText } = render(
      <Lookup data={data} withReset placeholder={placeholder} />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    expect(getByText('John Doe (john.doe@example.com)')).toBeInTheDocument();
    const resetButton = getByRole('presentation');
    fireEvent.click(resetButton);
    expect(
      queryByText('John Doe (john.doe@example.com)')
    ).not.toBeInTheDocument();
  });

  it('calls the getSelectedItem function when an item is selected', () => {
    const getSelectedItem = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Lookup
        data={data}
        getSelectedItem={getSelectedItem}
        placeholder={placeholder}
      />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    const johnDoe = getByText('John Doe (john.doe@example.com)');
    fireEvent.click(johnDoe);
    expect(getSelectedItem).toHaveBeenCalledWith(
      'John Doe (john.doe@example.com)'
    );
  });

  it('calls the getSelectedItem function with an empty string when the reset button is clicked', () => {
    const getSelectedItem = jest.fn();
    const { getByRole } = render(
      <Lookup
        data={data}
        withReset
        getSelectedItem={getSelectedItem}
        text="John Doe"
      />
    );
    const resetButton = getByRole('button');
    fireEvent.click(resetButton);
    expect(getSelectedItem).toHaveBeenCalledWith('');
  });

  it.skip('calls the getSelectedItem function with an empty string when the input value is empty', () => {
    const getSelectedItem = jest.fn();
    const { getByPlaceholderText } = render(
      <Lookup
        data={[]}
        getSelectedItem={getSelectedItem}
        placeholder={placeholder}
        text=""
      />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: '' } });
    expect(getSelectedItem).toHaveBeenCalled();
  });
});
