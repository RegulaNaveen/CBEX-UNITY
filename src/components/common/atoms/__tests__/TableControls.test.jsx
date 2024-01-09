import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TableControls from '../TableAnswer/TableControls';

describe('TableControls', () => {
  const tableConfiguration = {
    canEditColumn: true,
    canAddRow: true,
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
      }
    ],
    columns: [
      {
        accessor: 'header',
        frozen: true,
        hidden: false,
        locked: false,
        type: 'text',
        alwaysVisible: false,
        canEdit: true,
        index: 0
      }
    ],
    canAddColumn: true,
    canEditRow: true
  };

  const columns = [
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
          disabled: false
        },
        _owner: null,
        _store: {}
      }
    }
  ];

  const rows = [
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
    }
  ];

  const onAddColumnClick = jest.fn();
  const onAddRowClick = jest.fn();
  const onEdit = jest.fn();

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
});
