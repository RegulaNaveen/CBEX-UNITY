import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import Bidhistory from '../Bidhistory';
import { shallow } from 'enzyme';
import * as Redux from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import * as data from '../__tests__/data.json';
const cloneData = cloneDeep(data);
import { Map } from 'immutable';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
  };
});
describe('Render Bidhistory component', () => {
  let myMap = new Map([
    ['isCurrent', true],
    ['isEditable', true],
    ['typeOfActivity', 'Test'],
    ['bidType', ['Post_Award_Bid', 'RFI_Request', 'Bid RFI_Request']]
  ]);
  it('Bidhistory component with isEditable true', () => {
    jest
      .spyOn(Redux, 'useSelector')
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(Map(cloneData.proposal.opportunityData));
    // Render the component
    const { getByTestId } = render(
      <Provider store={store}>
        <Bidhistory />
      </Provider>
    );
    //expect(getByTestId('status-dotoutline')).toBeInTheDocument();
    //expect(screen.getByTestId('status-dotsolid')).toBeInTheDocument();
  });
});
