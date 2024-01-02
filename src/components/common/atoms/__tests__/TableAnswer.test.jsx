import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import TableAnswer from '../TableAnswer/TableAnswer';

let myMap = new Map();
myMap.set('sectionName', 'abc');

const props = {
  tableConfiguration: {
    rows: [
      {
        header: 'xyz'
      }
    ],
    columns: [
      {
        header: 'abc',
        headerTitle: 'a'
      }
    ]
  },
  section: myMap,
  onChange: jest.fn(),
  questionText: 'abc',
  lastAnswer: 'xyz'
};

const TableAnswersWithStore = () => {
  return (
    <Provider store={store}>
      <TableAnswer {...props} />
    </Provider>
  );
};

describe('Test cases for tableAnswer', () => {
  it('render the component', () => {
    render(<TableAnswersWithStore />);
  });

  it('Table answer should show modal', () => {
    const { getByTestId, queryByText } = render(<TableAnswersWithStore />);
    const togglemodel = getByTestId('togglebtn');
    fireEvent.click(togglemodel);
    const savebutton = getByTestId('myModel');
    expect(savebutton).toBeInTheDocument();
    expect(queryByText('Save')).toBeInTheDocument();
    fireEvent.click(queryByText('Save'));
  });
});
