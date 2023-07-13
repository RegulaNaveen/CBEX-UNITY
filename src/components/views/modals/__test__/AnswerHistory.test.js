/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import * as data from './data.json';
import { Map, fromJS } from 'immutable';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import AnswerHistory from '../AnswerHistory';

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

describe('Answer History component', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
      </Provider>
    );
  });
  test('Answer History component Load', async () => {
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(
      container.getElementsByClassName('modal-content').length
    ).toBeGreaterThan(0);
  });

  test('Answer History modal Load', async () => {
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(
      container.getElementsByClassName('modal-content').length
    ).toBeGreaterThan(0);
  });

  test('Answer History Count', async () => {
    const { container, debug } = await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
      </Provider>
    );

    expect(container.getElementsByClassName('modal-body')).toHaveLength(1);
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

    await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
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

    await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
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

    await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
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

    await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
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

    await render(
      <Provider store={store}>
        <SocketContext.Provider value={{ socket: null, questionLockWrapper: jest.fn() }}>
          <AnswerHistory {...initalstate} />
        </SocketContext.Provider>
      </Provider>
    );
  });
  afterAll(cleanup);
});
