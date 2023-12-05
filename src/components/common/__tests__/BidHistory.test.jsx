import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import Bidhistory from '../Bidhistory';
import { shallow } from 'enzyme';

describe('Bidhistory component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Bidhistory />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('should render bid history Title', () => {
    const children = <p>Bid History</p>;
    const wrapper = shallow(
      <Provider store={store}>
        <Bidhistory>{children}</Bidhistory>
      </Provider>
    );
    expect(wrapper.contains(children)).toBe(true);
  });

  it('displays the bid history details', () => {
    const children = (
      <div>
        <div>Bid Number</div>
        <div>Bid Due Date</div>
      </div>
    );
    const wrapper = shallow(
      <Provider store={store}>
        <Bidhistory>{children}</Bidhistory>
      </Provider>
    );
    expect(wrapper.contains(children)).toBe(true);
  });
});
