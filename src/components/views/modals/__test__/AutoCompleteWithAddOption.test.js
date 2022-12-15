import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configure, render, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import * as data from './data.json';
import thunk from 'redux-thunk';
import AutoCompleteWithAddOption from '../AutoCompleteWithAddOption';
import { Map, fromJS } from 'immutable';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.skip('AutoCompleteWithAddOption component', () => {
  test('testing autocomplete component', () => {
    const props = {
      sfObject,
      lov,
      sfField,
      answer,
      disabled,
      onChange,
      onFocus,
      onBlur,
      multiple,
      loading,
      toggleWatch,
      onCascadeChange,
      forceBlur,
    };
    const container = render(
      <Provider>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    expect(container).toBeDefined();
  });
});
