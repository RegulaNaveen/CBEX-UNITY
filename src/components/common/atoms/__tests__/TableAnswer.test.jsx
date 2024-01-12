import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableAnswer from '../TableAnswer/TableAnswer';
import { store } from '../../../../store';
import { Provider } from 'react-redux';

describe('TableAnswer Component', () => {
  const renderTableAnswer = props =>
    render(
      <Provider store={store}>
        <TableAnswer {...props} />
      </Provider>
    );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        rows: [],
        columns: []
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section',
      answers: [],
      answered: false,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };

    const { getByTestId } = renderTableAnswer(props);

    // Check if the component renders without crashing
    expect(getByTestId('togglebtn')).toBeInTheDocument();
  });

  xit('toggles the modal on click', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 1',
            'OClumn 2': 'It is a long established fact ',
            'Column 1':
              'Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.',
            canEdit: true,
            'column-3':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'column-4':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            index: 0,
            hidden: false,
            'column-5':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-4': 'It is a long established fact ',
            'column-3': 'It is a long established fact ',
            index: 1,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 2',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-3': 'It is a long established fact ',
            'column-4': 'It is a long established fact ',
            index: 2,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 4',
            canEdit: true,
            'Column 1': '',
            'OClumn 2': '',
            'column-4': '0',
            'column-3': '1',
            index: 3,
            hidden: true,
            'column-5': '2'
          },
          {
            header: 'row 5',
            canEdit: true,
            'OClumn 2': '',
            'Column 1': '',
            'column-4': '3',
            'column-3': '4',
            'column-5': '5',
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'Column 1',
            header: 'col 2',
            frozen: false,
            locked: false,
            type: 'text',
            index: 2,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 4'
          },
          {
            accessor: 'column-3',
            width: 100,
            canEdit: true,
            index: 4,
            hidden: true,
            header: 'col 3'
          },
          {
            accessor: 'column-5',
            width: 100,
            canEdit: true,
            index: 5,
            hidden: false,
            header: 'col 4'
          }
        ],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON:
        '{"blocks":[{"key":"1mkk2","text":"Hot buttons should be listed in order of priority","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      sectionName: 'Sample Section',
      answers: [],
      answered: false,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };

    const { getByTestId } = renderTableAnswer(props);

    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    // Wait for the modal to be present in the document
    await waitFor(() => {
      expect(getByTestId('tableAnswer-modal')).toBeInTheDocument();
    });

    // Check that the Title component is rendered correctly
    expect(getByTestId('question-tooltip-button')).toBeInTheDocument();

    // Simulate clicking the question tooltip button to open the popover
    fireEvent.click(getByTestId('question-tooltip-button'));
  });

  it('Not show add table data as placeholder text', () => {
    const props = {
      questionText: '',
      tableConfiguration: {
        rows: [],
        columns: []
      },
      questionHint: '',
      questionHintJSON: null,
      sectionName: '',
      answers: [],
      answered: false,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: true
    };

    renderTableAnswer(props);

    const element = screen.queryByText('Add Table Data');
    expect(element).not.toBeInTheDocument();
  });

  it('show edit table data when we have table data', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 1',
            'OClumn 2': 'It is a long established fact ',
            'Column 1':
              'Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.',
            canEdit: true,
            'column-3':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'column-4':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            index: 0,
            hidden: false,
            'column-5':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-4': 'It is a long established fact ',
            'column-3': 'It is a long established fact ',
            index: 1,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 2',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-3': 'It is a long established fact ',
            'column-4': 'It is a long established fact ',
            index: 2,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 4',
            canEdit: true,
            'Column 1': '',
            'OClumn 2': '',
            'column-4': '0',
            'column-3': '1',
            index: 3,
            hidden: true,
            'column-5': '2'
          },
          {
            header: 'row 5',
            canEdit: true,
            'OClumn 2': '',
            'Column 1': '',
            'column-4': '3',
            'column-3': '4',
            'column-5': '5',
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'Column 1',
            header: 'col 2',
            frozen: false,
            locked: false,
            type: 'text',
            index: 2,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 4'
          },
          {
            accessor: 'column-3',
            width: 100,
            canEdit: true,
            index: 4,
            hidden: true,
            header: 'col 3'
          },
          {
            accessor: 'column-5',
            width: 100,
            canEdit: true,
            index: 5,
            hidden: false,
            header: 'col 4'
          }
        ],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section',
      answers: [],
      answered: true,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };

    const { getByText } = renderTableAnswer(props);

    const element = getByText('Edit Table Data');
    expect(element).toBeInTheDocument();
  });

  it('when clicked on edit table data cancel and save button is visible', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 1',
            'OClumn 2': 'It is a long established fact ',
            'Column 1':
              'Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.',
            canEdit: true,
            'column-3':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'column-4':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            index: 0,
            hidden: false,
            'column-5':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-4': 'It is a long established fact ',
            'column-3': 'It is a long established fact ',
            index: 1,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 2',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-3': 'It is a long established fact ',
            'column-4': 'It is a long established fact ',
            index: 2,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 4',
            canEdit: true,
            'Column 1': '',
            'OClumn 2': '',
            'column-4': '0',
            'column-3': '1',
            index: 3,
            hidden: true,
            'column-5': '2'
          },
          {
            header: 'row 5',
            canEdit: true,
            'OClumn 2': '',
            'Column 1': '',
            'column-4': '3',
            'column-3': '4',
            'column-5': '5',
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'Column 1',
            header: 'col 2',
            frozen: false,
            locked: false,
            type: 'text',
            index: 2,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 4'
          },
          {
            accessor: 'column-3',
            width: 100,
            canEdit: true,
            index: 4,
            hidden: true,
            header: 'col 3'
          },
          {
            accessor: 'column-5',
            width: 100,
            canEdit: true,
            index: 5,
            hidden: false,
            header: 'col 4'
          }
        ],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section',
      answers: [],
      answered: true,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };

    const { getByText, getByTestId } = renderTableAnswer(props);

    const element = getByText('Edit Table Data');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(getByTestId('cancelButton')).toBeInTheDocument();
    expect(getByTestId('saveButton')).toBeInTheDocument();
  });

  it('cancel button is clicked', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 1',
            'OClumn 2': 'It is a long established fact ',
            'Column 1':
              'Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.',
            canEdit: true,
            'column-3':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'column-4':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            index: 0,
            hidden: false,
            'column-5':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-4': 'It is a long established fact ',
            'column-3': 'It is a long established fact ',
            index: 1,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 2',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-3': 'It is a long established fact ',
            'column-4': 'It is a long established fact ',
            index: 2,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 4',
            canEdit: true,
            'Column 1': '',
            'OClumn 2': '',
            'column-4': '0',
            'column-3': '1',
            index: 3,
            hidden: true,
            'column-5': '2'
          },
          {
            header: 'row 5',
            canEdit: true,
            'OClumn 2': '',
            'Column 1': '',
            'column-4': '3',
            'column-3': '4',
            'column-5': '5',
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'Column 1',
            header: 'col 2',
            frozen: false,
            locked: false,
            type: 'text',
            index: 2,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 4'
          },
          {
            accessor: 'column-3',
            width: 100,
            canEdit: true,
            index: 4,
            hidden: true,
            header: 'col 3'
          },
          {
            accessor: 'column-5',
            width: 100,
            canEdit: true,
            index: 5,
            hidden: false,
            header: 'col 4'
          }
        ],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section',
      answers: [],
      answered: true,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };

    const { getByText, getByTestId } = renderTableAnswer(props);

    const element = getByText('Edit Table Data');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);

    const cancelBtn = await screen.findByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    await waitFor(() => {
      expect(screen.queryByTestId('tableAnswer-modal')).not.toBeInTheDocument();
    });
  });

  it('save button should be disabled initially', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 1',
            'OClumn 2': 'It is a long established fact ',
            'Column 1':
              'Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.',
            canEdit: true,
            'column-3':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'column-4':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            index: 0,
            hidden: false,
            'column-5':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-4': 'It is a long established fact ',
            'column-3': 'It is a long established fact ',
            index: 1,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 2',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-3': 'It is a long established fact ',
            'column-4': 'It is a long established fact ',
            index: 2,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 4',
            canEdit: true,
            'Column 1': '',
            'OClumn 2': '',
            'column-4': '0',
            'column-3': '1',
            index: 3,
            hidden: true,
            'column-5': '2'
          },
          {
            header: 'row 5',
            canEdit: true,
            'OClumn 2': '',
            'Column 1': '',
            'column-4': '3',
            'column-3': '4',
            'column-5': '5',
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'Column 1',
            header: 'col 2',
            frozen: false,
            locked: false,
            type: 'text',
            index: 2,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 4'
          },
          {
            accessor: 'column-3',
            width: 100,
            canEdit: true,
            index: 4,
            hidden: true,
            header: 'col 3'
          },
          {
            accessor: 'column-5',
            width: 100,
            canEdit: true,
            index: 5,
            hidden: false,
            header: 'col 4'
          }
        ],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section',
      answers: [],
      answered: true,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };

    const { getByText } = renderTableAnswer(props);

    const element = getByText('Edit Table Data');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);

    const saveBtn = await screen.findByRole('button', { name: /save/i });
    expect(saveBtn).toBeDisabled();
  });

  it.skip('Title function renders correctly and opens popover', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 1',
            'OClumn 2': 'It is a long established fact ',
            'Column 1':
              'Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.',
            canEdit: true,
            'column-3':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'column-4':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            index: 0,
            hidden: false,
            'column-5':
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-4': 'It is a long established fact ',
            'column-3': 'It is a long established fact ',
            index: 1,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 2',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            'column-3': 'It is a long established fact ',
            'column-4': 'It is a long established fact ',
            index: 2,
            hidden: false,
            'column-5': ''
          },
          {
            header: 'row 4',
            canEdit: true,
            'Column 1': '',
            'OClumn 2': '',
            'column-4': '0',
            'column-3': '1',
            index: 3,
            hidden: true,
            'column-5': '2'
          },
          {
            header: 'row 5',
            canEdit: true,
            'OClumn 2': '',
            'Column 1': '',
            'column-4': '3',
            'column-3': '4',
            'column-5': '5',
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'Column 1',
            header: 'col 2',
            frozen: false,
            locked: false,
            type: 'text',
            index: 2,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 4'
          },
          {
            accessor: 'column-3',
            width: 100,
            canEdit: true,
            index: 4,
            hidden: true,
            header: 'col 3'
          },
          {
            accessor: 'column-5',
            width: 100,
            canEdit: true,
            index: 5,
            hidden: false,
            header: 'col 4'
          }
        ],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section',
      answers: [],
      answered: true,
      lastAnswer: null,
      onChange: jest.fn(),
      disabled: false
    };
    // Render the TableAnswer component with necessary props
    const { getByText, getByTestId } = renderTableAnswer(props);

    // Simulate clicking the table icon to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    // Wait for the modal to open and the Title component to render
    await act(async () => new Promise(resolve => setTimeout(resolve, 1000)));

    // Check that the Title component is rendered correctly
    expect(getByTestId('question-tooltip-button')).toBeInTheDocument();

    // Simulate clicking the question tooltip button to open the popover
    fireEvent.click(getByTestId('question-tooltip-button'));

    // Check that the popover is rendered correctly
    expect(getByTestId('question-popover')).toBeInTheDocument();
  });

  it('add new column', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [],
        columns: []
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    //Click on cog icon to open the column menu
    fireEvent.click(getByTestId('settingsMenuButton'));

    // Click on Add Column text
    fireEvent.click(screen.getByText('Add Column'));
  });

  it('add new row', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [],
        columns: []
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    //Click on cog icon to open the column menu
    fireEvent.click(getByTestId('settingsMenuButton'));

    // Click on Add Column text
    fireEvent.click(screen.getByText('Add Row'));
  });

  it('edit rows', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 4',
            canEdit: true,
            index: 3,
            hidden: true
          },
          {
            header: 'row 5',
            canEdit: true,
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          }
        ]
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    //Click on cog icon to open the column menu
    fireEvent.click(getByTestId('settingsMenuButton'));

    // Click on Add Column text
    fireEvent.click(screen.getByText('Edit Rows'));

    // Assert that row 4 is present
    expect(screen.getAllByText('row 4')).toBeTruthy();

    // find checkbox input and fire click event
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    // find apply button and fire click event
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
  });

  it('edit columns', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 4',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 3,
            hidden: true
          },
          {
            header: 'row 5',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 2'
          }
        ]
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    //Click on cog icon to open the column menu
    fireEvent.click(getByTestId('settingsMenuButton'));

    // Click on Add Column text
    fireEvent.click(screen.getByText('Edit Columns'));

    // Assert that col 1 is present
    const col1 = screen.getAllByText('col 1');
    expect(col1).toBeTruthy();
  });

  it('expand all', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 4',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 3,
            hidden: true
          },
          {
            header: 'row 5',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: true,
            index: 3,
            hidden: false,
            header: 'col 2'
          }
        ]
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    // Fire event to expand all column
    const expandAll = screen.getByRole('checkbox', { name: /expand all/i });
    fireEvent.click(expandAll);
  });

  xit('change column name', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 4',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 3,
            hidden: true
          },
          {
            header: 'row 5',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: false,
            index: 3,
            hidden: false,
            header: 'col 2'
          }
        ]
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    // Change the column name
    const input = screen.getByDisplayValue('col 1');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input, { target: { value: 'col 2' } });
  });

  it('change row name', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canAddColumn: true,
        canAddRow: true,
        rows: [
          {
            header: 'row 4',
            'OClumn 2': '',
            'column-4': '',
            canEdit: false,
            index: 3,
            hidden: false
          },
          {
            header: 'row 5',
            'OClumn 2': '',
            'column-4': '',
            canEdit: true,
            index: 4,
            hidden: false
          }
        ],
        columns: [
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'header',
            header: '',
            frozen: true,
            locked: false,
            type: 'text',
            canEdit: true,
            index: 0
          },
          {
            hidden: false,
            alwaysVisible: false,
            accessor: 'OClumn 2',
            header: 'col 1',
            frozen: false,
            locked: false,
            type: 'text',
            index: 1,
            canEdit: true
          },
          {
            accessor: 'column-4',
            width: 100,
            canEdit: false,
            index: 3,
            hidden: false,
            header: 'col 2'
          }
        ]
      },
      questionHint: 'Sample Hint',
      questionHintJSON: null,
      sectionName: 'Sample Section'
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));

    // Change the column name
    const input = screen.getAllByRole('textbox');
    screen.debug(input[1]);
    fireEvent.change(input[1], { target: { value: '' } });
    fireEvent.change(input[1], { target: { value: 'row 4' } });
  });
});
