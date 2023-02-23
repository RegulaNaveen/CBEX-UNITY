import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilterButton from '../FilterButton';

describe('FilterButton', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      unitytab: {
        filters: [
          { label: 'Approved', value: false },
          { label: 'Pending', value: true },
          { label: 'Rejected', value: false }
        ]
      }
    });
  });

  it('should render the button', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <FilterButton />
      </Provider>
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should show the number of applied filters in the button text', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FilterButton />
      </Provider>
    );

    expect(getByText('Filter (1)')).toBeInTheDocument();
  });

  it('should not show the number of applied filters if none are applied', () => {
    store = mockStore({
      unitytab: {
        filters: [
          { label: 'Approved', value: false },
          { label: 'Pending', value: false },
          { label: 'Rejected', value: false }
        ]
      }
    });

    const { getByText } = render(
      <Provider store={store}>
        <FilterButton />
      </Provider>
    );

    expect(getByText('Filter')).toBeInTheDocument();
  });

  it('should call the setIsShowFilters function when the button is clicked', () => {
    const setIsShowFilters = jest.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <FilterButton setIsShowFilters={setIsShowFilters} />
      </Provider>
    );

    fireEvent.click(getByRole('button'));

    expect(setIsShowFilters).toHaveBeenCalled();
  });
});
