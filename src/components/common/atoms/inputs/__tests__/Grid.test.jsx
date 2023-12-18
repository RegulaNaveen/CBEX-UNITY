import React from 'react';
import { Provider } from 'react-redux';
import {
  cleanup,
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

  beforeEach(() => {
    sinonSandbox.restore();
    cleanup();
  });

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
    const { container } = render(
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

  it('should stop loader if error on updating', async () => {
    const toggleFavStub = sinonSandbox
      .stub(SSOApis, 'toggleFavourite')
      .rejects();
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        favouriteFlag: true
      }
    });
    const { container } = render(
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

    await waitFor(() =>
      expect(
        container.querySelector('.MuiCircularProgress-root')
      ).not.toBeInTheDocument()
    );
    expect(toggleFavStub.callCount).toBe(1);
  });

  it('should show custom name when flag is on', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: true
      }
    });
    const { getByText } = render(
      <GridWithRedux
        updateFavouriteWrapper={jest.fn()}
        data={{}}
        favourite={false}
      />
    );
    expect(getByText('New Custom Name')).toBeInTheDocument();
  });

  it('should not show custom name when flag is off', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: false
      }
    });
    const { container, queryByText } = render(
      <GridWithRedux
        updateFavouriteWrapper={jest.fn()}
        data={{}}
        favourite={false}
      />
    );
    expect(queryByText('New Custom Name')).toBeNull();
  });

  it('should show bid no', async () => {
    const { getByText } = render(
      <GridWithRedux
        updateFavouriteWrapper={jest.fn()}
        data={{ bidNo: 1, bidType: 'Clinical_bid' }}
        favourite={false}
      />
    );
    expect(getByText('1')).toBeInTheDocument();
  });

  it('should show post award no', async () => {
    const { getByText } = render(
      <GridWithRedux
        updateFavouriteWrapper={jest.fn()}
        data={{ bidNo: 1, bidType: 'Post_Award_Bid' }}
        favourite={false}
      />
    );
    expect(getByText('Post Award 1')).toBeInTheDocument();
  });
});
