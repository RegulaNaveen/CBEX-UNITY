import React from 'react';
import { Provider } from 'react-redux';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import Sinon from 'sinon';
import SocketContextProvider from '../../../../../context/SocketContext';
import { store } from '../../../../../store';
import Grid from '../Grid';
import { REDUX_TYPES } from '../../../../../constants';
import * as SSOApis from '../../../../../api/sso-auth';

const GridWithRedux = ({ updateFavouriteWrapper, ...props }) => (
  <Provider store={store}>
    <SocketContextProvider value={{ updateFavouriteWrapper }}>
      <Grid {...props} />
    </SocketContextProvider>
  </Provider>
);

describe('<Grid /> unit tests', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => sinonSandbox.restore());

  afterAll(() => {
    sinonSandbox.restore();
  });

  it('should show fav icon', async () => {
    const toggleFavStub = sinonSandbox
      .stub(SSOApis, 'toggleFavourite')
      .resolves({
        data: {
          favourties: []
        }
      });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        favouriteFlag: true
      }
    });
    const { container, debug } = render(
      <GridWithRedux
        updateFavouriteWrapper={jest.fn()}
        data={{}}
        favourite={false}
      />
    );
    expect(
      container.querySelector('.fav-icon-button .MuiSvgIcon-root')
    ).toHaveStyle({ color: '#999999' });
    fireEvent.click(container.querySelector('.fav-icon-button'));
    await waitFor(() => {
      expect(
        container.querySelector('.MuiCircularProgress-root')
      ).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(
      container.querySelector('.MuiCircularProgress-root')
    );
    expect(toggleFavStub.callCount).toBe(1);
  });
});
