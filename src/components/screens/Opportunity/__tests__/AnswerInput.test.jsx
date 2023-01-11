import React from 'react';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import AnswerInput from '../QuestionsForCustomerTab/AnswerInput';

describe('testing answer input component', () => {
  test('render component', () => {
    <AnswerInput />;
  });
});
