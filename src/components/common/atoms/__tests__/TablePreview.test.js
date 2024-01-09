import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import TablePreview from '../TableAnswer/TablePreview';

let myMap = new Map();
myMap.set('sectionName', 'abc');

const props = {
  rows: [
    {
      'column 1': 'r1c1',
      header: 'row 1',
      rowId: 0,
      canEdit: true
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
      canEdit: false
    },
    {
      hidden: false,
      alwaysVisible: false,
      accessor: 'column 1',
      header: 'column 1',
      frozen: false,
      locked: false,
      type: 'text',
      canEdit: false
    }
  ]
};

const TablePreviewWithStore = () => {
  return (
    <Provider store={store}>
      <TablePreview rows={props.rows} columns={props.columns} />
    </Provider>
  );
};

describe('Test cases for tablePreview', () => {
  it('render the component', () => {
    render(<TablePreviewWithStore />);
  });
});
