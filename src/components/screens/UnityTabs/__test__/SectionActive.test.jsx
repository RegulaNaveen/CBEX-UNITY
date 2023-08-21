import React from 'react';
import { shallow } from 'enzyme';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SectionActive from '../SectionActive';

describe('SectionActive component', () => {
  const props = {
    UnityTabSectionTitle: 'Test Section Title',
    UnityTabSectionQuestions: ['question1', 'question2', 'question3'],
    setIsAllActiveDisplayed: jest.fn()
  };

  const mockStore = configureStore();
  const store = mockStore({});

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
  });
});
