import React from 'react';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import * as t from './testing.js';
import * as math from './math.js';
import { Map, fromJS } from 'immutable';
import * as data from './mockdata/document.json';
import QuestionsForCustomer from '../QuestionsForCustomerTab/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const testMath = (_tc) => {
  t.describe('math.abs');
};

const ssoAuth = Map(Object.entries(data.ssoAuth));
const proposals = Map(Object.entries(data.proposals));
const proposal = Map(Object.entries(data.proposal));
const question = fromJS(data.question);
const initalstate = {
  ssoAuth,
  proposals,
  question,
  proposal
};
const store = mockStore(initalstate);

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 1)
  };
});

describe('testing answer input component', () => {
  test('render component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <QuestionsForCustomer />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
