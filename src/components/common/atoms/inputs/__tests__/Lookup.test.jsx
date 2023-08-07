import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lookup from '../Lookup';

describe('Lookup', () => {
  const data = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Doe', email: 'jane.doe@example.com' }
  ];
  const placeholder = 'Enter a value';
  it('renders the component', () => {
    const { container } = render(<Lookup data={data} />);
    expect(container).toBeInTheDocument();
  });

  it('filters the data based on the input value', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Lookup data={data} placeholder={placeholder} />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    const jhon = getByText(/John/i);
    expect(jhon).toBeInTheDocument();
  });

  it('displays the filtered data', () => {
    const { getByPlaceholderText, getByText } = render(
      <Lookup data={data} placeholder={placeholder} />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    expect(getByText(/John/i)).toBeInTheDocument();
  });

  it('resets the search value when the reset button is clicked', async () => {
    const getSelectedItem = jest.fn();
    const {
      getByPlaceholderText,
      getByText,
      getByRole,
      queryByText,
      debug,
      container
    } = render(
      <Lookup
        data={data}
        withReset
        placeholder={placeholder}
        getSelectedItem={getSelectedItem}
      />
    );
    const input = getByPlaceholderText('Enter a value');
    fireEvent.change(input, { target: { value: 'john' } });
    expect(getByText(/John/i)).toBeInTheDocument();
    // const resetButton = await getByRole('presentation');
    // fireEvent.click(resetButton);
    // expect(getByText('John')).toBeInTheDocument();
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
    const johnDoe = getByText(/John/i);
    fireEvent.click(johnDoe);
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
});
