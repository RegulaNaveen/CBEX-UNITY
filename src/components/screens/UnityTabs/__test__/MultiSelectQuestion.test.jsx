import React from 'react';
import { shallow } from 'enzyme';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import MultiSelectQuestion from '../InputComponents/MultiSelectQuestion';

const mockStore = configureStore([]);

describe('MultiSelectQuestion', () => {
  let store;
  let wrapper;
  const changeHandler = jest.fn();
  const question = {};
  const lastAnswer = {};
  const disabled = false;
  const userData = {};
  const socketContext = {};
  const trackMatomoEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn(() => false);

  beforeEach(() => {
    store = mockStore({});

    wrapper = shallow(
      <MultiSelectQuestion
        question={question}
        lastAnswer={lastAnswer}
        disabled={disabled}
        userData={userData}
        socketContext={socketContext}
        trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
        checkDisableFlag={checkDisableFlag}
        changeHandler={changeHandler}
      />,
      { context: { store } }
    );
  });

  it('should render without errors', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should dispatch an action on change', () => {
    wrapper = shallow(
      <MultiSelectQuestion
        question={question}
        lastAnswer={lastAnswer}
        disabled={false}
        userData={userData}
        socketContext={socketContext}
        trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
        checkDisableFlag={() => false}
        changeHandler={changeHandler}
      />
    );
  });
});
