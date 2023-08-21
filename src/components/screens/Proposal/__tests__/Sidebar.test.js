/**
 * @jest-environment jsdom
 **/
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../../views/Sidebar';
import { OrderedMap, Map } from 'immutable';
import { onHandleOpenClose } from '../../../../redux/actions/sidebar-actions';

describe('Sidebar component', () => {
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();
  document.addEventListener = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Sidebar section Load', async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>
    );

    expect(container).toBeInTheDocument();

  });

  test('check for sidebar button click open/close', () => {
    const props = {
      setTabFromQuestionNotes: jest.fn(),
    };
    
    store.dispatch(onHandleOpenClose(true));
    const { getByTestId, getByText, unmount } = render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );

    const sidebarButton = getByTestId('sidebar-btn-testid');
    fireEvent.click(sidebarButton);
    
    expect(getByText(/Controls/i)).toBeInTheDocument();
    fireEvent.click(sidebarButton);
    unmount();
  });

  test('check for add new question button', () => {
    const mockAddNewQuestion = jest.fn();
    const props = {
      setTabFromQuestionNotes: jest.fn(),
      onAddQuestion: jest.fn(),
      AddNewQuestion: mockAddNewQuestion
    }
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );

    expect(getByTestId('sidebar-panel-testid')).toBeInTheDocument();

    const addNewQuestionBtn = getByTestId('sidebar-panel-testid');
    fireEvent.click(addNewQuestionBtn);

    expect(mockAddNewQuestion).toHaveBeenCalled();
  });

  test('check for expand all button click', () => {
    const mockExpandAll = jest.fn();
    const props = {
      setTabFromQuestionNotes: jest.fn(),
      expandAll: mockExpandAll
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );

    expect(getByTestId('expandall-testid')).toBeInTheDocument();

    const expandallBtn = getByTestId('expandall-testid');
    fireEvent.click(expandallBtn);

    expect(mockExpandAll).toHaveBeenCalled();

  });

  test('check for export opportunity button click', () => {
    const mockhandleOpenClose = jest.fn();
    const props = {
      setTabFromQuestionNotes: jest.fn(),
      handleOpenClose: mockhandleOpenClose
    };

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );

    expect(getByTestId('export-opportunity-testid')).toBeInTheDocument();

    const exportOppBtn = getByTestId('export-opportunity-testid');
    fireEvent.click(exportOppBtn);

    //expect(mockhandleOpenClose).toHaveBeenCalled();
  });

  test('check for sections questions', () => {
    const sections = OrderedMap({
      "Adding new section 1": Map({
        "sectionName": "Adding new section 1",
        "questions": OrderedMap({
          "Adding new question 1": Map({
            active: true,
            visible: true,
            isCustomQuestion: true
          }),
        }),
      }),
      "Adding new section 2": Map({
        "sectionName": "Adding new section 2",
        "questions": OrderedMap({
          "Adding new question 2": Map({
            active: true,
            visible: true,
            isCustomQuestion: true
          }),
        }),
      }),
    });
    const mockOnScrollElement = jest.fn();
    const props = {
      sections: sections,
      onscrollelement: mockOnScrollElement,
      setTabFromQuestionNotes: jest.fn()
    };
    store.dispatch(onHandleOpenClose(true));
    render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );
    const sectionName = screen.getByText('Adding new section 1');
    fireEvent.click(sectionName);
    expect(mockOnScrollElement).toHaveBeenCalled();
  });
});
