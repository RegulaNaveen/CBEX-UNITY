import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import TablePreview from '../TableAnswer/TablePreview';
import configureMockStore from 'redux-mock-store';
import { SocketContext } from '../../../../context/SocketContext';
const mockStore = configureMockStore();
const initialState = {
  search: {
    query: 'Column 1',
    isOpen: false,
    currentResultIndex: 0,
    prevResult: null,
    totalResultsFound: 0,
    searching: false,
    searchResults: [
      {
        tab: 0,
        searchIndex: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
        inputText: 'Column 1',
        vTab: null,
        startIndex: 0,
        endIndex: 8,
        matchIndex: 0,
        tabName: 'Strategy Development',
        sectionName: 'TestCRMEE'
      }
    ],
    autoNavigatedToCurrentResult: false,
    clearInputFlag: false,
    showModal: false,
    modalTitle: '',
    modalContent: ''
  }
};

const store = mockStore(initialState);
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

const props = {
  columns: [
    {
      accessor: 'header',
      frozen: true,
      hidden: false,
      locked: false,
      type: 'text',
      alwaysVisible: false,
      canEdit: true,
      index: 0,
      header: {
        key: null,
        ref: null,
        props: {
          index: 0,
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      }
    },
    {
      hidden: false,
      alwaysVisible: false,
      accessor: 'Column 5',
      header: {
        key: null,
        ref: null,
        props: {
          index: 1,
          title: 'Column 5',
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      },
      frozen: false,
      locked: false,
      type: 'text',
      canEdit: true,
      index: 1,
      headerTitle: 'Column 5'
    },
    {
      hidden: true,
      alwaysVisible: false,
      accessor: 'Column 1',
      header: {
        key: null,
        ref: null,
        props: {
          index: 2,
          title: 'Column 1',
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      },
      frozen: false,
      locked: false,
      type: 'text',
      canEdit: true,
      index: 2,
      headerTitle: 'Column 1'
    },
    {
      hidden: true,
      alwaysVisible: false,
      accessor: 'Column 2',
      header: {
        key: null,
        ref: null,
        props: {
          index: 3,
          title: 'Column 2',
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      },
      frozen: false,
      locked: false,
      type: 'text',
      canEdit: true,
      index: 3,
      headerTitle: 'Column 2'
    },
    {
      hidden: true,
      alwaysVisible: false,
      accessor: 'Column 3',
      header: {
        key: null,
        ref: null,
        props: {
          index: 4,
          title: 'Column 3',
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      },
      frozen: false,
      locked: false,
      type: 'text',
      canEdit: true,
      index: 4,
      headerTitle: 'Column 3'
    },
    {
      hidden: true,
      alwaysVisible: false,
      accessor: 'Column 4',
      header: {
        key: null,
        ref: null,
        props: {
          index: 5,
          title: 'Column 4',
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      },
      frozen: false,
      locked: false,
      type: 'text',
      canEdit: true,
      index: 5,
      headerTitle: 'Column 4'
    }
  ],
  rows: [
    {
      'Column 1': '',
      'Column 3': '',
      header: 'Row 6',
      'Column 2': '',
      'Column 5': '',
      'Column 4': '',
      rowId: 0,
      canEdit: true,
      index: 0,
      hidden: true
    },
    {
      'Column 1': '',
      'Column 3': '',
      header: 'Row 1',
      'Column 2': '',
      'Column 5': '',
      'Column 4': '',
      rowId: 1,
      canEdit: true,
      index: 1,
      hidden: true
    },
    {
      'Column 1': '',
      'Column 3': '',
      header: 'Row 3',
      'Column 2': '',
      'Column 5': '',
      'Column 4': '',
      rowId: 2,
      canEdit: true,
      index: 2,
      hidden: true
    },
    {
      'Column 1': '',
      'Column 3': '',
      header: 'Row 22',
      'Column 2': '',
      'Column 5': '',
      'Column 4': '',
      rowId: 3,
      canEdit: true,
      index: 3,
      hidden: true
    },
    {
      'Column 1': '',
      'Column 3': '',
      header: 'Row 4',
      'Column 2': '',
      'Column 5': '',
      'Column 4': '',
      rowId: 4,
      canEdit: true,
      index: 4,
      hidden: true
    },
    {
      'Column 1': '',
      'Column 3': '',
      header: 'Row 5',
      'Column 2': '',
      'Column 5': '',
      'Column 4': '',
      rowId: 5,
      canEdit: true,
      index: 5,
      hidden: true
    }
  ]
};

const TablePreviewWithStore = () => {
  return (
    <Provider store={store}>
      <SocketContext.Provider store={store}>
        <TablePreview rows={props.rows} columns={props.columns} />
      </SocketContext.Provider>
    </Provider>
  );
};

describe('Test cases for tablePreview', () => {
  it('render the component withpout props', () => {
    render(
      <Provider store={store}>
        <SocketContext.Provider store={store}>
          <TablePreview rows={[]} columns={[]} />
        </SocketContext.Provider>
      </Provider>
    );
  });
  it('render the component', () => {
    render(<TablePreviewWithStore />);
  });
});
