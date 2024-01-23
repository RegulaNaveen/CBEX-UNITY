import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  cleanup
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
    cleanup();
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

  it('toggles the modal on click and tooltip check', async () => {
    const props = {
      questionText: 'Sample Question',
      tableConfiguration: {
        canEditColumn: true,
        canAddRow: true,
        rows: [],
        columns: [],
        canAddColumn: true,
        canEditRow: true
      },
      questionHint: 'Sample Hint',
      questionHintJSON:
        '{"blocks":[{"key":"andp9","text":"Hyperlink Font color","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":10,"length":10,"style":"color-#e20000"}],"entityRanges":[{"offset":0,"length":9,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://dev-unity.dev.iqvia.app/ubuild","target":"_blank"}}}}',
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
            canEdit: true,
            index: 0,
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
    // Get by text col 1
    const col1 = screen.getByTestId('column-header');
    const row1 = screen.getByTestId('row-header');
    const data = screen.getByTestId('table-cell');
    // Fire mouse over event
    fireEvent.mouseOver(col1);
    // Fire mouse out event
    fireEvent.mouseOut(col1);
    // Fire focus event
    fireEvent.focus(col1);
    fireEvent.mouseOver(row1);
    // Fire mouse out event
    fireEvent.mouseOut(row1);
    // Fire focus event
    fireEvent.focus(row1);
    fireEvent.mouseOver(data);
    // Fire mouse out event
    fireEvent.mouseOut(data);
    // Fire focus event
    fireEvent.focus(data);
    fireEvent.blur(data);

    const saveBtn = await screen.findByRole('button', { name: /save/i });
    expect(saveBtn).toBeDisabled();
  });

  xit('Title function renders correctly', async () => {
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
            index: 0,
            hidden: false
          },
          {
            header: 'row 3',
            'OClumn 2': 'It is a long established fact ',
            'Column 1': 'It is a long established fact ',
            canEdit: true,
            index: 1,
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
    const { getByTestId } = renderTableAnswer(props);
    // Check that the Title component is rendered correctly
    expect(getByTestId('question-tooltip-button')).toBeInTheDocument();
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
      sectionName: 'Sample Section',
      onChange: jest.fn(),
      toggleWatch: jest.fn(),
      onblur: jest.fn(),
      onCascadeChange: jest.fn()
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));
    //Click on cog icon to open the column menu
    fireEvent.click(getByTestId('settingsMenuButton'));
    // Click on Add Column text
    fireEvent.click(screen.getByText('Add Column'));
    // Get input box and enter column name
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Column 1' } });
    fireEvent.blur(input);
    // Get Save button and click
    const saveButton = screen.getByText('Save');
    // Assert save button is enabled
    expect(saveButton).toBeEnabled();
    fireEvent.click(saveButton);
    // Assert onChange is called
    // expect(props.onChange).toHaveBeenCalled();
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
      sectionName: 'Sample Section',
      onChange: jest.fn(),
      toggleWatch: jest.fn(),
      onblur: jest.fn(),
      onCascadeChange: jest.fn()
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));
    //Click on cog icon to open the column menu
    fireEvent.click(getByTestId('settingsMenuButton'));
    // Click on Add Row text
    fireEvent.click(screen.getByText('Add Row'));
    // Get input box and enter row name
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Row 1' } });
    // Get Save button and click
    const saveButton = screen.getByText('Save');
    // Assert save button is enabled
    expect(saveButton).toBeEnabled();
    fireEvent.click(saveButton);
    // Assert row is not added
    expect(screen.queryByText('Row 1')).not.toBeInTheDocument();
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

  it.skip('change column name and duplicate check', async () => {
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
      sectionName: 'Sample Section',
      onChange: jest.fn()
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));
    // Change the column name
    const input = screen.getAllByRole('textbox');
    fireEvent.change(input[0], { target: { value: '' } });
    fireEvent.change(input[0], { target: { value: 'col 2' } });
    fireEvent.blur(input[0]);
    // Change row name
    fireEvent.change(input[3], { target: { value: 'row 4' } });
    fireEvent.blur(input[3]);
    fireEvent.click(screen.getByText('Save'));
    // Assert alert modal will appear
    expect(screen.getByText('Alert')).toBeInTheDocument();
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
      sectionName: 'Sample Section',
      onChange: jest.fn()
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));
    // Change the row name
    const input = screen.getAllByRole('textbox');
    fireEvent.change(input[3], { target: { value: '' } });
    fireEvent.change(input[3], { target: { value: 'row 4' } });
    fireEvent.blur(input[3]);
    fireEvent.click(screen.getByText('Save'));
    // Assert alert modal will appear
    // expect(screen.getByText('Alert')).toBeInTheDocument();
  });

  it('force blur', async () => {
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
      sectionName: 'Sample Section',
      onChange: jest.fn(),
      toggleWatch: jest.fn(),
      onblur: jest.fn(),
      onCascadeChange: jest.fn(),
      forceBlur: true
    };
    // Render the TableAnswer component with necessary props
    const { getByTestId } = renderTableAnswer(props);
    // Click on the toggle button to open the modal
    fireEvent.click(getByTestId('togglebtn'));
  });

  it('drag and drop column', async () => {
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
    // Click on Edit Columns text
    fireEvent.click(screen.getByText('Edit Columns'));
    // Assert that col 2 is present
    const dragElement = screen.getByTestId('draggable-0');
    const dropElement = screen.getByTestId('draggable-1');
    expect(dragElement).toBeTruthy();
    expect(dropElement).toBeTruthy();
    // drag col1 to col2
    const SPACE = { keyCode: 32 };
    const ARROW_DOWN = { keyCode: 40 };
    fireEvent.keyDown(dragElement, SPACE); // Begins the dnd
    fireEvent.keyDown(dragElement, ARROW_DOWN); // Moves the element
    fireEvent.keyDown(dragElement, SPACE); // Ends the dnd
    // find apply button and fire click event
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);
  });
  test('cancel button is clicked', async () => {
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
    const { getByText, queryByTestId, findByRole } = renderTableAnswer(props);
    const element = getByText('Edit Table Data');
    expect(element).toBeInTheDocument();
    expect(await queryByTestId('tableAnswer-modal')).not.toBeInTheDocument();
    fireEvent.click(element);
    await waitFor(
      async () => {
        const cancelBtn = await findByRole('button', { name: /cancel/i });
        if (cancelBtn) {
          fireEvent.click(cancelBtn);
        }
      },
      { timeout: 500 }
    ).catch(err => {
      console.log(error);
    });
  });
});
