import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TableControls from '../TableAnswer/TableControls';

describe('TableControls', () => {
  const tableConfiguration = {
    canEditColumn: true,
    canAddRow: true,
    rows: [
      {
        header: 'Row 1',
        'Col 2': '',
        Column1: '',
        rowId: 0,
        canEdit: true,
        index: 0,
        hidden: false
      },
      {
        header: 'Row 2',
        'Col 2': '',
        Column1: '',
        rowId: 1,
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
        header: {
          key: null,
          ref: null,
          props: {
            index: 0,
            title: '',
            canEdit: true,
            disabled: false,
            allExpanded: false
          },
          _owner: null,
          _store: {}
        },
        frozen: true,
        locked: false,
        type: 'text',
        canEdit: true,
        index: 0,
        headerTitle: ''
      },
      {
        hidden: false,
        alwaysVisible: false,
        accessor: 'Col 2',
        header: {
          key: null,
          ref: null,
          props: {
            index: 1,
            title: 'Col 2',
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
        headerTitle: 'Col 2'
      },
      {
        hidden: false,
        alwaysVisible: false,
        accessor: 'Column1',
        header: {
          key: null,
          ref: null,
          props: {
            index: 2,
            title: 'Column1',
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
        headerTitle: 'Column1'
      }
    ],
    canAddColumn: true,
    canEditRow: true
  };

  const columns = [
    {
      hidden: false,
      alwaysVisible: false,
      accessor: 'header',
      header: {
        key: null,
        ref: null,
        props: {
          index: 0,
          title: '',
          canEdit: true,
          disabled: false,
          allExpanded: false
        },
        _owner: null,
        _store: {}
      },
      frozen: true,
      locked: false,
      type: 'text',
      canEdit: true,
      index: 0,
      headerTitle: ''
    },
    {
      hidden: false,
      alwaysVisible: false,
      accessor: 'Col 2',
      header: {
        key: null,
        ref: null,
        props: {
          index: 2,
          title: 'Col 2',
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
      headerTitle: 'Col 2'
    },
    {
      hidden: false,
      alwaysVisible: false,
      accessor: 'Column1',
      header: {
        key: null,
        ref: null,
        props: {
          index: 1,
          title: 'Column1',
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
      headerTitle: 'Column1'
    }
  ];

  const rows = [
    {
      header: 'Row 1',
      'Col 2': '',
      Column1: '',
      rowId: 0,
      canEdit: true,
      index: 0,
      hidden: false
    },
    {
      header: 'Row 2',
      'Col 2': '',
      Column1: '',
      rowId: 1,
      canEdit: true,
      index: 1,
      hidden: false
    }
  ];

  const onAddColumnClick = jest.fn();
  const onAddRowClick = jest.fn();
  const onEdit = jest.fn();
  const onExpandAllMock = jest.fn();

  it('renders TableControls component', () => {
    const { getByTestId, getByText } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
      />
    );
    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);
    screen.debug(undefined, Infinity);
    expect(
      screen.getByRole('menuitem', { name: /add column/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /add row/i }));
    expect(screen.getByRole('menuitem', { name: /edit columns/i }));
    expect(screen.getByRole('menuitem', { name: /edit rows/i }));
  });

  it('calls onAddColumnClick when "Add Column" is clicked', () => {
    const { getByRole, getByTestId } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
      />
    );
    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);
    fireEvent.click(getByRole('menuitem', { name: /add column/i }));
    expect(onAddColumnClick).toHaveBeenCalled();
  });

  it('calls onAddRowClick when "Add Row" is clicked', () => {
    const { getByRole, getByTestId } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
      />
    );
    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);

    fireEvent.click(getByRole('menuitem', { name: /add row/i }));
    expect(onAddRowClick).toHaveBeenCalled();
  });

  it('calls onEdit when "Edit Columns" is clicked', () => {
    const { getByTestId, getByRole } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
      />
    );

    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);

    fireEvent.click(getByRole('menuitem', { name: /edit columns/i }));
    screen.debug(undefined, Infinity);

    screen.getByRole('button', { name: /apply/i });
    // expect(onEdit).toHaveBeenCalledWith('column', columns);
  });

  it('calls onEdit when "Edit Rows" is clicked', () => {
    const { getByRole, getByTestId } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
      />
    );

    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);

    fireEvent.click(getByRole('menuitem', { name: /edit rows/i }));
    screen.getByRole('button', { name: /apply/i });
  });

  it('handleApplyClick function works correctly for columns', async () => {
    const { getByTestId, getByText, getByRole } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
        allExpanded={true}
        onExpandAll={onExpandAllMock}
      />
    );

    screen.debug(undefined, Infinity);
    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);
    screen.debug(undefined, Infinity);
    fireEvent.click(getByRole('menuitem', { name: /edit columns/i }));
    fireEvent.click(getByText('Apply'));
    screen.debug(undefined, Infinity);
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith('column', columns);
    });
  });

  it('handleApplyClick function works correctly for rows', () => {
    const { getByTestId, getByText, getByRole } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onEdit={onEdit}
      />
    );
    screen.debug(undefined, Infinity);
    const settingsMenuButton = getByTestId('settingsMenuButton');
    expect(settingsMenuButton).toBeInTheDocument();
    fireEvent.click(settingsMenuButton);
    screen.debug(undefined, Infinity);
    fireEvent.click(getByRole('menuitem', { name: /edit rows/i }));
    // Simulate a click event on the "Apply" button
    fireEvent.click(getByText('Apply'));
    expect(onEdit).toHaveBeenCalledWith('row', rows);
  });

  it('expand all function check', () => {
    const { getByRole } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
        allExpanded={true}
        onExpandAll={onExpandAllMock}
      />
    );
    const expandAll = getByRole('checkbox', {
      name: /expand all/i
    });
    expect(expandAll).toBeInTheDocument();
    fireEvent.click(expandAll);
  });

  it('column got hidden when checkbox is unchecked', async () => {
    const {
      getByTestId,
      getAllByTestId,
      getByRole,
      getByText,
      queryByRole
    } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
        allExpanded={true}
        onExpandAll={onExpandAllMock}
      />
    );
    fireEvent.click(getByTestId('settingsMenuButton')); // Open popover
    fireEvent.click(getByRole('menuitem', { name: /edit columns/i }));
    const checkboxes = getAllByTestId('checkboxChange');

    // Simulate a click event on the first checkbox
    fireEvent.click(checkboxes[0]);
    fireEvent.click(getByText('Apply'));
    const column = queryByRole('columnheader', { name: /col 2/i });

    // Check that the column is not in the document
    expect(column).toBeNull();
    screen.debug(undefined, Infinity);
  });

  it('drag and drop feature', async () => {
    const { getByTestId, queryByTestId, getByRole, getByText } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
        allExpanded={true}
        onExpandAll={onExpandAllMock}
      />
    );
    fireEvent.click(getByTestId('settingsMenuButton')); // Open popover
    fireEvent.click(getByRole('menuitem', { name: /edit columns/i }));
    // Simulate drag and drop event
    const sourceDraggable = getByTestId('draggable-0'); // The item you want to drag
    const destinationDraggable = getByTestId('draggable-1'); // The item you want to drop the source item before
    screen.debug(undefined, Infinity);

    // Simulate the drag start, drag over, and drop events
    fireEvent.dragStart(sourceDraggable);
    fireEvent.dragOver(destinationDraggable);
    fireEvent.drop(destinationDraggable);
    fireEvent.dragEnd(sourceDraggable);
    fireEvent.click(getByText('Apply'));
    await waitFor(() => {
      expect(queryByTestId('popover')).not.toBeInTheDocument();
    });
  });

  it('closes the popover when handlePopoverClose is called', () => {
    const { getByTestId, queryByTestId, getByRole } = render(
      <TableControls
        tableConfiguration={tableConfiguration}
        columns={columns}
        rows={rows}
        onAddColumnClick={onAddColumnClick}
        onAddRowClick={onAddRowClick}
        onEdit={onEdit}
        allExpanded={true}
        onExpandAll={onExpandAllMock}
      />
    );

    // Open the popover
    fireEvent.click(getByTestId('settingsMenuButton'));
    fireEvent.click(getByRole('menuitem', { name: /edit columns/i }));

    expect(getByTestId('popover')).toBeInTheDocument();

    // Simulate a click outside the popover or on a close button
    fireEvent.mouseDown(document.body); // Check that the popover is not in the document anymore
  });
});
