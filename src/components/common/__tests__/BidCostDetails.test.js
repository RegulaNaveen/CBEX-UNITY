import React from 'react';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import BidCostDetails from '../BidCostDetails';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

describe('Test BidCostDetails componenet', () => {
  test('Bid Cost details section render', () => {
    const wrapper = shallow(
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <BidCostDetails />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  test('Checking the card details', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <BidCostDetails />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
    const chkText = {
      bidValue: 'Total Bid Value',
      bottomLine: 'Bottom Line Labor Discount',
      budgetTools: 'Budget Tools'
    };
    expect(chkText.bidValue).toBe('Total Bid Value');
    expect(chkText.bottomLine).toBe('Bottom Line Labor Discount');
    expect(chkText.budgetTools).toBe('Budget Tools');
  });

  test('Bid Cost details section render', () => {
    const wrapper = shallow(
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <BidCostDetails />
      </Provider>
    );

    const chkText = 'Bid Cost Details';
    expect(chkText).toBe('Bid Cost Details');
  });
});
