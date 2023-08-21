import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Notepad from '../index';
import selectIsFetchingNotes from '../../../../redux/selectors/notepad';

const mockStore = configureMockStore([thunk]);
jest.mock('../../../../redux/selectors/notepad', () => ({
  selectNotepad: jest.fn(),
  selectNotes: jest.fn(),
  selectIsFetchingNotes: jest.fn(),
  selectIsAddingNote: jest.fn(),
  selectNotepadMode: jest.fn(),
  selectedBid: jest.fn()
}));

describe('Notepad component', () => {
  let store;
  let component;

  beforeEach(() => {});

  it('should render correctly', () => {
    store = mockStore({
      notes: {},
      fetchingNotes: true,
      addingNote: false,
      mode: 'default',
      selectedBid: {}
    });

    component = (
      <Provider store={store}>
        <Notepad
          sections={{}}
          notes={{}}
          add={() => {}}
          id="1"
          update={() => {}}
          change={() => {}}
          fetchingNotes
          addingNote={false}
          mode="default"
          selectedtitle=""
          trackMatomoNoteSubmit={() => {}}
          selectedBid={{}}
        />
      </Provider>
    );
    const { container } = render(component);
    expect(container).toBeInTheDocument();
  });

  it.skip('should show loader while fetching notes', () => {
    store = mockStore({
      notes: {},
      fetchingNotes: true,
      addingNote: false,
      mode: 'default',
      selectedBid: {}
    });
    const fetchingNotesMock = true;
    component = (
      <Provider store={store}>
        <Notepad
          sections={{}}
          notes={{}}
          add={() => {}}
          id="1"
          update={() => {}}
          change={() => {}}
          fetchingNotes={fetchingNotesMock}
          addingNote={false}
          selectedtitle=""
          trackMatomoNoteSubmit={() => {}}
          selectedBid={{}}
        />
      </Provider>
    );

    const { getByText } = render(component);
    const text = getByText('Notes Loading');
    expect(text).toBeInTheDocument();
  });

  it('should show loader while adding note', () => {
    store = mockStore({
      notes: {},
      fetchingNotes: false,
      addingNote: true,
      mode: 'default',
      selectedBid: {}
    });

    component = (
      <Provider store={store}>
        <Notepad
          sections={{}}
          notes={{}}
          add={() => {}}
          id="1"
          update={() => {}}
          change={() => {}}
          fetchingNotes={false}
          addingNote
          mode="default"
          selectedtitle=""
          trackMatomoNoteSubmit={() => {}}
          selectedBid={{}}
        />
      </Provider>
    );

    const { container } = render(component);
    expect(container).toBeInTheDocument();

    // expect(screen.getByText('Uploading Note')).toBeInTheDocument();
  });

  it('should add a new note when AddNote component is used', async () => {
    const addNoteMock = jest.fn();
    store = mockStore({
      notes: {},
      fetchingNotes: false,
      addingNote: false,
      mode: 'default',
      selectedBid: {}
    });

    component = (
      <Provider store={store}>
        <Notepad
          sections={{}}
          notes={{}}
          add={addNoteMock}
          id="1"
          update={() => {}}
          change={() => {}}
          fetchingNotes={false}
          addingNote={false}
          mode="default"
          selectedtitle=""
          trackMatomoNoteSubmit={() => {}}
          selectedBid={{}}
        />
      </Provider>
    );

    const { container } = render(component);
    expect(container).toBeInTheDocument();
    // fireEvent.click(screen.getByText('Add Note'));
  });
});
