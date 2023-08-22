import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ErrorBoundaryComponent from '../ErrorBoundary';
import { store } from '../../../store';
import Typography from 'apollo-react/components/Typography';

describe('ErrorBoundaryComponent', () => {
  const props = {
    ErrorFallback: jest.fn()
  };

  it('render the component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ErrorBoundaryComponent />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('finding the error text', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ErrorBoundaryComponent />
      </Provider>
    );
    const header = <Typography>Something went wrong!</Typography>;
    expect(wrapper.find(header)).toBeTruthy();
  });
});
