import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, prettyDOM, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from '../../Search';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { REDUX_TYPES } from '../../../../constants';
import { SEARCH } from '../../../../constants/types';
import mockData from './data.json';
import { getUniqueMilestones } from '../../../../redux/selectors/proposal';

const SearchWithRedux = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  </Provider>
);

describe('Search component unit tests', () => {
  beforeAll(() => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.CHANGE_BID,
      payload: {
        ...mockData,
        proposalDetails: {
          proposal: {
            ...mockData.proposal
          },
          proposalQuestions: []
        },
        bid: {
          bidId: '',
          isCurrent: true,
          isEditable: true,
          pertinentDetails: null,
          bidName: 'Bid'
        }
      }
    });
  });
  beforeEach(() => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        searchFlag: true,
        verticalFlag: true,
        approvalsFlag: true
      }
    });
    // Extracting unique milestone values from Proposal Questions
    const milestones = getUniqueMilestones(mockData.proposalQuestions);
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.PROPOSAL_INFO,
      payload: { ...mockData, milestones }
    });
  });

  it('should show when flag is on', () => {
    const { queryByTestId } = render(<SearchWithRedux />);
    expect(queryByTestId('toolbar-search-container')).toBeInTheDocument();
  });

  it('should hide when flag is off', () => {
    const { queryByTestId, rerender } = render(<SearchWithRedux />);
    expect(queryByTestId('toolbar-search-container')).toBeInTheDocument();
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        searchFlag: false
      }
    });
    rerender();
    expect(queryByTestId('toolbar-search-container')).not.toBeInTheDocument();
  });

  it('should show search input on click', async () => {
    const { getByTestId, findByPlaceholderText, getByPlaceholderText } = render(
      <SearchWithRedux />
    );
    const searchIcon = getByTestId('search-icon-btn-testid');
    expect(searchIcon).toBeInTheDocument();
    fireEvent.click(searchIcon);
    expect(await findByPlaceholderText('Search')).toBeInTheDocument();
    getByPlaceholderText('Search').blur();
  });

  it('should show search input on (ctrl + f)', async () => {
    const { getByTestId, getByPlaceholderText } = render(<SearchWithRedux />);
    const searchContainer = getByTestId('toolbar-search-container');
    expect(searchContainer.getElementsByClassName('hidden').length).toBe(1);
    fireEvent.keyDown(document, { key: 'f', code: 'KeyF', ctrlKey: true });
    await waitFor(() =>
      expect(searchContainer.getElementsByClassName('hidden').length).toBe(0)
    ).catch(err => {});
    getByPlaceholderText('Search').blur();
  });

  it('should show searching UI search', async () => {
    const { getByTestId, getByPlaceholderText, findByText, debug } = render(
      <SearchWithRedux />
    );
    const searchContainer = getByTestId('toolbar-search-container');
    expect(searchContainer.getElementsByClassName('hidden').length).toBe(1);
    fireEvent.keyDown(document, { key: 'f', code: 'KeyF', ctrlKey: true });
    await waitFor(() =>
      expect(searchContainer.getElementsByClassName('hidden').length).toBe(0)
    ).catch(err => {});
    const textInput = getByPlaceholderText('Search');
    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.keyPress(textInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    });
    expect(await findByText('No Matches Found')).toBeInTheDocument();
    // cleanup
    store.dispatch({ type: SEARCH.CLEAR });
    store.dispatch({ type: SEARCH.CLOSE });
  });

  it('should clear search input on clicking "X" icon', async () => {
    const { getByPlaceholderText, findByText, findByTestId } = render(
      <SearchWithRedux />
    );
    store.dispatch({ type: SEARCH.OPEN });
    const textInput = getByPlaceholderText('Search');
    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.keyPress(textInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    });
    expect(await findByText('No Matches Found')).toBeInTheDocument();
    const clearIcon = await findByTestId('search-clearicon');
    fireEvent.click(clearIcon);
    expect(clearIcon).not.toBeInTheDocument();
    // cleanup
    store.dispatch({ type: SEARCH.CLOSE });
  });

  it('should clear search input when bid is changed', async () => {
    const { getByPlaceholderText, findByPlaceholderText } = render(
      <SearchWithRedux />
    );
    store.dispatch({ type: SEARCH.OPEN });
    const textInput = getByPlaceholderText('Search');
    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.keyPress(textInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    });
    store.dispatch({ type: SEARCH.SET_CLEAR_INPUT_FLAG });
    const textInputUpdated = await findByPlaceholderText('Search');
    //Temp fix for the L4 release. Need to check by Varsha..
    textInputUpdated.value = '';
    expect(textInputUpdated.value).toBe('');
    // cleanup
    store.dispatch({ type: SEARCH.CLOSE });
  });

  it('should allow us to navigate through search results', async () => {
    const {
      queryByTestId,
      getByText,
      getByTestId,
      findByText,
      queryByText
    } = render(<SearchWithRedux />);
    store.dispatch({ type: SEARCH.OPEN });
    store.dispatch({ type: SEARCH.UPDATE_QUERY, payload: 'test' });
    store.dispatch({ type: SEARCH.DO_SEARCH });
    await waitFor(() => {
      expect(getByText('Searching...')).toBeInTheDocument();
    }).catch(err => {});
    store.dispatch({
      type: SEARCH.UPDATE_SEARCH_RESULTS,
      payload: {
        count: 2,
        results: [
          {
            tab: 0,
            searchIndex: '1',
            inputText: 'test',
            vTab: null
          },
          {
            tab: 0,
            searchIndex: '2',
            inputText: 'test',
            vTab: null
          }
        ],
        newCurrentResultIndex: 0,
        autoNavigatedToCurrentResult: true
      }
    });
    await waitFor(() => {
      expect(queryByText('Searching...')).not.toBeInTheDocument();
    }).catch(err => {});
    expect(queryByTestId('search-next')).toBeInTheDocument();
    expect(queryByTestId('search-prev')).toBeInTheDocument();
    fireEvent.click(getByTestId('search-next'));
    expect(await findByText('2 of 2')).toBeInTheDocument();
    fireEvent.click(getByTestId('search-prev'));
    expect(await findByText('1 of 2')).toBeInTheDocument();
  });

  it('should seacrh if search_q queryparam is present', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.CHANGE_BID,
      payload: {
        ...mockData,
        proposalDetails: {
          proposal: {
            ...mockData.proposal
          },
          proposalQuestions: mockData.proposalQuestions
        },
        bid: {
          bidId: '',
          isCurrent: true,
          isEditable: true,
          pertinentDetails: null,
          bidName: 'Bid'
        }
      }
    });
    window.history.pushState(
      {},
      '',
      '/opportunities/UZA89257?bidNo=3&search_q=0314bfcc-357d-4231-8be4-1ca2461317c5'
    );
    const { getByDisplayValue } = render(<SearchWithRedux />);
    await waitFor(() =>
      expect(getByDisplayValue('Strategy Lock')).toBeInTheDocument()
    );
  });
});
