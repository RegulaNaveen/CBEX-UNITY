/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Map, OrderedMap } from 'immutable';
import { store } from '../../../../store';
import QuestionsSectionMapping from '../QuestionsSectionMapping';
import StateData from './mockdata/QuestionSectionMapping.json';

const proposal = StateData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

const initState = {
  sections: OrderedMap(StateData.sections),
  filteredSections: Map(StateData.filteredSections),
  isQuestionsFiltersEnabled: false,
  filterMilestone: true,
  allSectionsExpanded: false,
  sidebarscroll: false,
  isNotepadOpen: true,
  proposal: Map(proposal),
  setQuestionToDisplayHistory: jest.fn(),
  setTabFromQuestionNotes: jest.fn(),
  onAddQuestion: jest.fn()
};

describe('QuestionSectionMapping component', () => {
  test('QuestionSectionMapping component render', async () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.openModal, () => { }]);
    React.useState = setHookState({
      openModal: true
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <QuestionsSectionMapping {...initState} />
      </Provider>
    );
    expect(getByTestId('question-section-test-id')).toBeInTheDocument();
  });
});
