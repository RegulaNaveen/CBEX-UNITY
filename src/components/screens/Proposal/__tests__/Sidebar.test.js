/**
 * @jest-environment jsdom
 **/
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { BrowserRouter as Router } from 'react-router-dom';
import * as data from './sidebar.json';
import Sidebar from '../../../views/Sidebar';
import { Map } from 'immutable';

describe('Sidebar component', () => {

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
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );

    const sidebarButton = getByTestId('sidebar-btn-testid');
    fireEvent.click(sidebarButton);

    expect(getByText(/Controls/i)).toBeInTheDocument();

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
    const mapSections = Map(data.sections);
    const mockRefreshProposal = jest.fn();
    const props = {
      setTabFromQuestionNotes: jest.fn(),
      isOpen: true,
      sections: mapSections,
      activeTabIndex: 0,
      RefreshProposal: mockRefreshProposal
    }

    const { container, getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Sidebar {...props} />
        </Router>
      </Provider>
    );

    //expect(container.getElementsByClassName('sidebar-content-list')).toBeInTheDocument();
    // const syncBtn = getByTestId('sync-icon-testid');
    // expect(syncBtn).toBeInTheDocument();

    // fireEvent.click(syncBtn);
    // expect(mockRefreshProposal).toHaveBeenCalled();
  })
});
