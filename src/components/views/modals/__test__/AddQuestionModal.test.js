import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import * as data from './data.json';
import { Map, fromJS } from 'immutable';
import { store } from '../../../../store';
import { BrowserRouter, Router } from 'react-router-dom';
import { SocketContext } from '../../../../context/SocketContext';
import { mount } from 'enzyme';
import AddQuestionModal from '../AddQuestionModal';

describe('Add Question Modal component', () => {
  test('render question component without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddQuestionModal />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  test('show Edit Question when isEditMode is true', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddQuestionModal isEditMode={true} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/ Edit Question/i)).toBeTruthy();
  });
  test('show Edit Question when isEditMode is false', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AddQuestionModal isEditMode={false} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/ Add New Question/i)).toBeTruthy();
  });
});
