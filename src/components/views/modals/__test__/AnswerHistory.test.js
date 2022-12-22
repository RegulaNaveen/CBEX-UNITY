/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnswerHistory from '../AnswerHistory';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as data from './data.json';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ssoAuth = Map(Object.entries(data.ssoAuth));
const sidebar = Map(Object.entries(data.sidebar));
const notepad = Map(Object.entries(data.notepad));
const proposals = Map(Object.entries(data.proposals));
const proposal = Map(Object.entries(data.proposal));
const question = fromJS(data.question);
const closeModal = jest.fn();
let initalstate = {
  ssoAuth,
  sidebar,
  notepad,
  proposals,
  question,
  proposal,
  closeModal
};
const store = mockStore(initalstate);

describe('Answer History component', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
  });
  test('Answer History component Load', async () => {
    const { container } = await render(
      <Provider store={store}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
    expect(
      container.getElementsByClassName('modal-content').length
    ).toBeGreaterThan(0);
  });

  test('Answer History modal Load', async () => {
    const { container } = await render(
      <Provider store={store}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
    expect(
      container.getElementsByClassName('modal-content').length
    ).toBeGreaterThan(0);
  });

  test.skip('Answer History Count', async () => {
    const { container } = await render(
      <Provider store={store}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
    expect(container.getElementsByClassName('answer-container')).toHaveLength(
      5
    );
  });

  test('If Answer is empty', async () => {
    const ssoAuth = Map(Object.entries(data.ssoAuth));
    const sidebar = Map(Object.entries(data.sidebar));
    const notepad = Map(Object.entries(data.notepad));
    const proposals = Map(Object.entries(data.proposals));
    const proposal = Map(Object.entries(data.proposal));
    data.question.answers = [];
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      ssoAuth,
      sidebar,
      notepad,
      proposals,
      question,
      proposal,
      closeModal
    };
    const dumystore = mockStore(initalstate);
    await render(
      <Provider store={dumystore}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
  });
  test('If Answer is text', async () => {
    const ssoAuth = Map(Object.entries(data.ssoAuth));
    const sidebar = Map(Object.entries(data.sidebar));
    const notepad = Map(Object.entries(data.notepad));
    const proposals = Map(Object.entries(data.proposals));
    const proposal = Map(Object.entries(data.proposal));
    data.question = data.selectquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      ssoAuth,
      sidebar,
      notepad,
      proposals,
      question,
      proposal,
      closeModal
    };
    const dumystore = mockStore(initalstate);
    await render(
      <Provider store={dumystore}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
  });

  test('If Answer is select', async () => {
    const ssoAuth = Map(Object.entries(data.ssoAuth));
    const sidebar = Map(Object.entries(data.sidebar));
    const notepad = Map(Object.entries(data.notepad));
    const proposals = Map(Object.entries(data.proposals));
    const proposal = Map(Object.entries(data.proposal));
    data.question = data.selectquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      ssoAuth,
      sidebar,
      notepad,
      proposals,
      question,
      proposal,
      closeModal
    };
    const dumystore = mockStore(initalstate);
    await render(
      <Provider store={dumystore}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
  });
  test('If Answer is date', async () => {
    const ssoAuth = Map(Object.entries(data.ssoAuth));
    const sidebar = Map(Object.entries(data.sidebar));
    const notepad = Map(Object.entries(data.notepad));
    const proposals = Map(Object.entries(data.proposals));
    const proposal = Map(Object.entries(data.proposal));
    data.question = data.datequestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      ssoAuth,
      sidebar,
      notepad,
      proposals,
      question,
      proposal,
      closeModal
    };
    const dumystore = mockStore(initalstate);
    await render(
      <Provider store={dumystore}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
  });

  test('If Answer is number', async () => {
    const ssoAuth = Map(Object.entries(data.ssoAuth));
    const sidebar = Map(Object.entries(data.sidebar));
    const notepad = Map(Object.entries(data.notepad));
    const proposals = Map(Object.entries(data.proposals));
    const proposal = Map(Object.entries(data.proposal));
    data.question = data.numberquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      ssoAuth,
      sidebar,
      notepad,
      proposals,
      question,
      proposal,
      closeModal
    };
    const dumystore = mockStore(initalstate);
    await render(
      <Provider store={dumystore}>
        <AnswerHistory {...initalstate} />
      </Provider>
    );
  });
  afterAll(cleanup);
});
