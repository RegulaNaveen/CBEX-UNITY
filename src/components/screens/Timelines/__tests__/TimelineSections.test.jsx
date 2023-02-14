import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import TimelineSections from '../TimelineSections';
import StateData from './mockData/data.json';

const initState = {
  sectionName: StateData.Services.sectionName,
  sectionOrder: StateData.Services.sectionOrder,
  questions: StateData.Services.questions,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);
describe('TimelineSections component', () => {
  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <TimelineSections />
      </Provider>
    );
  });

  it('renders the section name in the AccordionSummary', () => {
    render(
      <Provider store={store}>
        <TimelineSections />
      </Provider>
    );
    console.log('initial state section name', StateData.Services.sectionName);
    const section = screen.getByTestId('timeline-section-title');
    expect(section).toBeInTheDocument();
    fireEvent.click(section);
    const accordion = screen.getByTestId(
      'timeline-timeline-questions-list-container'
    );
    expect(accordion).toBeInTheDocument();
    // fireEvent.click(section);
  });
});
