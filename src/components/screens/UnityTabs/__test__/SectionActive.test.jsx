import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import SectionActive from '../SectionActive';
import thunk from 'redux-thunk';
import { BrowserRouter, Router } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';

describe('SectionActive component', () => {
  const props = {
    UnityTabSectionTitle: 'Test Section Title',
    UnityTabSectionQuestions: ['question1', 'question2', 'question3'],
    setIsAllActiveDisplayed: jest.fn()
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(props);
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
