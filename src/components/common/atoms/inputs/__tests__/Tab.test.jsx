/**
 * js-dom jest environment
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { store } from '../../../../../store';
import { UNITY_TABS } from '../../../../../constants/types';
import { REDUX_TYPES } from '../../../../../constants';
import { SocketContext } from '../../../../../context/SocketContext';
import * as UtilsFunc from '../../../../screens/UnityTabs/utils';
import Tab from '../Tab';

const customTab = [
  {
    UnityTabSectionOrder: 2,
    UnityTabSectionId: '1f596d74-1cc3-4404-9fd2-b31bdb5ebdca',
    UnityTabSectionQuestions: [],
    UnityTabSectionTitle: 'Test 13',
    TabID: 'a9955e73-6966-42d2-8daa-a875f6bd6287',
    UnityTabOrder: 6,
    UnityTabId: 'a9955e73-6966-42d2-8daa-a875f6bd6287',
    UnityTabTitle: 'Tab Last'
  },
  {
    UnityTabSectionOrder: 1,
    UnityTabSectionId: '3480d053-5f4b-44c8-9ea9-76785d56e969',
    UnityTabSectionQuestions: [],
    UnityTabSectionTitle: 'Test 12',
    TabID: 'a9955e73-6966-42d2-8daa-a875f6bd6287',
    UnityTabOrder: 6,
    UnityTabId: 'a9955e73-6966-42d2-8daa-a875f6bd6287',
    UnityTabTitle: 'Tab Last'
  },
  {
    UnityTabSectionOrder: 2,
    UnityTabSectionId: '44f320ed-1843-455d-bec0-090542f8e800',
    UnityTabSectionQuestions: [
      '8959b856-0f49-4c4e-8ec8-f5955320866a',
      '1cb03885-9579-4922-9550-7f618b52e74a',
      'Award Timelines-Z4C',
      'f7d58225-b324-4770-ac1d-3352398653ac',
      'Opportunity Overview-J5U',
      'Country Strategy-U8V',
      'ebb984bf-257f-4b29-ac48-3b4e0c00836f',
      'dfda9761-37a0-4c01-a9a7-cadbe11b9134',
      'eb5151cb-e89d-4cb1-a57f-27fce7d42247',
      'c8940199-749f-4d1c-817d-86d3f745a774',
      '7da9dea4-ace3-4208-849e-a6ecb50d5192',
      '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
      'dcba66de-6595-4a1d-b364-f7bc85030d4c',
      'Study Timelines-B5M',
      '69d1f9a6-c21e-4209-a0fc-ecceda468bf5',
      'f25567df-155f-49bd-8545-17cc6bf07661',
      '0859813c-0ff6-41f7-b2d8-d275d335f486',
      'af1d2c50-0d8d-4b7a-ab86-83071d33f5ed',
      '890b0eb9-df56-41a7-a4ba-cceefd042428',
      'b2bac498-d182-4f20-bb60-1335312f07f1'
    ],
    UnityTabSectionTitle: 'Section 2',
    TabID: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabOrder: 1,
    UnityTabId: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabTitle: 'Tab 1'
  },
  {
    UnityTabSectionOrder: 3,
    UnityTabSectionId: '81fa95fe-ff2c-4b1f-8ec6-883fdc81816b',
    UnityTabSectionQuestions: ['8daca6cc-2c99-4571-ae6d-470f0e7068b5'],
    UnityTabSectionTitle: 'TEST',
    TabID: '8012c1fd-d09f-4661-a88b-281f31b62d5b',
    UnityTabOrder: 4,
    UnityTabId: '8012c1fd-d09f-4661-a88b-281f31b62d5b',
    UnityTabTitle: 'test1'
  },
  {
    UnityTabSectionOrder: 5,
    UnityTabSectionId: '9ddef3f5-0db8-44b0-bc95-ececcdea100d',
    UnityTabSectionQuestions: [
      'cdac66fc-747a-4b8c-9440-9c1ed6d6cfbd',
      '1b86d5ad-08ad-4426-bcc2-da4f220e7492',
      '7ed8b7b3-0036-4490-a6ff-3ffe20d0fbeb',
      '28a76fcd-2758-4e99-bfbd-4fb3904e6a97',
      'ea7d114d-bc23-4705-909e-8262ce58639c',
      '923dcff8-a672-46c1-8bce-0767714f4908'
    ],
    UnityTabSectionTitle: 'Carry foward Checkbox unselected',
    TabID: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabOrder: 1,
    UnityTabId: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabTitle: 'Tab 1'
  },
  {
    UnityTabSectionOrder: 6,
    UnityTabSectionId: 'a50813c7-3e4b-4614-9be8-33464be442eb',
    UnityTabSectionQuestions: ['eae4b849-36a0-4773-b320-cf02ca3048d7'],
    UnityTabSectionTitle: 'New React JS',
    TabID: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabOrder: 1,
    UnityTabId: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabTitle: 'Tab 1'
  },
  {
    UnityTabSectionOrder: 1,
    UnityTabSectionId: 'ce99b0b8-5a0e-4a1e-80da-56b2a16d1f50',
    UnityTabSectionQuestions: [
      '776a31fe-d4e3-40e7-b61b-dad4aa8acfa2',
      '3a25176d-5be6-4d4f-b4b9-cd20c1722ef2',
      'Key stakeholders-Y0L'
    ],
    UnityTabSectionTitle: 'testing',
    TabID: '8012c1fd-d09f-4661-a88b-281f31b62d5b',
    UnityTabOrder: 4,
    UnityTabId: '8012c1fd-d09f-4661-a88b-281f31b62d5b',
    UnityTabTitle: 'test1'
  },
  {
    UnityTabSectionOrder: 4,
    UnityTabSectionId: 'e3e1a71e-2e82-48b5-aaf8-12e26b91ee95',
    UnityTabSectionQuestions: [
      '3c8fee2b-6f66-4679-93a3-c99f1c94f535',
      '5fec0e90-c7c1-40ef-b3d8-130265b17723'
    ],
    UnityTabSectionTitle: 'Customtab1',
    TabID: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabOrder: 1,
    UnityTabId: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabTitle: 'Tab 1'
  },
  {
    UnityTabSectionOrder: 5,
    UnityTabSectionId: 'e549df7a-27ac-4431-9237-3cdef1743cf1',
    UnityTabSectionQuestions: [
      'f0833ccd-6da3-4617-8525-bcc105903560',
      '3d28a51b-f2c9-4fb4-bfa7-3312be657c16'
    ],
    UnityTabSectionTitle: 'SectionLogicChecking',
    TabID: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabOrder: 1,
    UnityTabId: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabTitle: 'Tab 1'
  },
  {
    UnityTabSectionOrder: 4,
    UnityTabSectionId: 'ec4cb1b4-65cc-4776-ac0f-334f31f8cd6b',
    UnityTabSectionQuestions: [
      'da70fcd0-f34e-4d8f-b14b-2e69ec27e18e',
      'cf85cb0f-e4f1-459f-a86b-629639a724e1',
      'a35b7ce3-c62b-4fa7-93eb-ccee92ff2cab',
      '5ce48b40-5c24-4ece-aeb6-b279c87cb523',
      'fe265c67-843c-4113-8684-9a379d3ad7bf',
      '2f952d59-8042-4bc2-af49-52fd8492a985',
      '62616b62-7713-4873-bf53-d628b492cd06',
      '1d639c2f-07e7-4fce-aafd-69037e936bc5',
      '63a07a05-4e90-457f-9701-e41c8fc905f4',
      '14ba79c0-ea17-4df8-b123-3b7262221425',
      '84d2e613-fcaf-4cf1-bb24-8793592cb12a',
      'c292fac0-69c5-4891-b42c-6a711abdd07a'
    ],
    UnityTabSectionTitle: 'Carry forward check box select section',
    TabID: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabOrder: 1,
    UnityTabId: '47034daf-eed8-4b8f-966a-be33b4a98d5e',
    UnityTabTitle: 'Tab 1'
  }
];

const allFlags = {
  answerUserTagFlag: {
    flagVersion: 12,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  approvalSendMailFlag: {
    flagVersion: 14,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  approvalsFlag: {
    flagVersion: 40,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  bidCostDetail: {
    flagVersion: 63,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  canLinkOpportunityNo: {
    flagVersion: 171,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  carryForwardAnswerFlag: {
    flagVersion: 19,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  customOpportunityNameFlag: {
    flagVersion: 25,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  eventLauncher: {
    flagVersion: 24,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  favouriteFlag: {
    flagVersion: 40,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  isQuestionForCustomerEditable: {
    flagVersion: 21,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  notepad: {
    flagVersion: 25,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  notepadLinker: {
    flagVersion: 19,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  notesUserTag: {
    flagVersion: 49,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  proposalTeamTab: {
    flagVersion: 23,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  questionsForCustomerTab: {
    flagVersion: 49,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  'schedule-events': {
    flagVersion: 2,
    trackEvents: false,
    value: false,
    variation: 1,
    version: 717
  },
  searchFlag: {
    flagVersion: 20,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  showTimelineFlag: {
    flagVersion: 31,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  },
  verticalTab: {
    flagVersion: 35,
    trackEvents: false,
    value: true,
    variation: 0,
    version: 717
  }
};

const history = createMemoryHistory({
  initialEntries: [
    {
      pathname: '/opportunities/UZA89257',
      search: ''
    }
  ]
});

const TabWithRedux = props => (
  <Provider store={store}>
    <SocketContext.Provider
      value={{
        socket: null,
        questionLockWrapper: jest.fn(),
        questionUnlockWrapper: jest.fn(),
        questionLockDetailsWrapper: jest.fn()
      }}
    >
      <Router history={history}>
        <Tab {...props} />
      </Router>
    </SocketContext.Provider>
  </Provider>
);

describe('testing for tab component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  window.scrollTo = jest.fn();
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));
  test('render the component without crashing', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        approvalsFlag: true,
        showTimelineFlag: true
      }
    });
    const { container } = render(<TabWithRedux />);
    expect(container).toBeInTheDocument();
    await waitFor(() => {
      const moreButton = screen.getByText('More');
      expect(screen.getByText('More')).toBeInTheDocument();
      fireEvent.click(moreButton);
      expect(screen.getByText('Strategy Development')).toBeInTheDocument();
      expect(screen.getByText('Timeline')).toBeInTheDocument();
      expect(screen.getByText('Approvals')).toBeInTheDocument();
      expect(screen.getByText('Documents')).toBeInTheDocument();
    });
  }, 20000);

  test('render with questions tab', () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_ACTIVE_TABINDEX,
      payload: 0
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: allFlags
    });
    store.dispatch({
      type: UNITY_TABS.SET_UNITY_TABS,
      payload: customTab
    });
    const { container } = render(
      <TabWithRedux
        id="UZA89257"
        enableValidateTab
        selectedView="questions"
        onChangeSelectedTab={jest.fn()}
      />
    );
    expect(container).toBeInTheDocument();

    const questionForCustomarBlade = container.querySelector(
      '#panel-notepad > div > button > svg > path'
    );
    fireEvent.click(questionForCustomarBlade);
    fireEvent.click(questionForCustomarBlade);

    const notepadButton = screen.getByTitle('Notes');
    fireEvent.click(notepadButton);
    const notepadBlade = container.querySelector(
      '#panel-notepad > div > button > svg > path'
    );
    fireEvent.click(notepadBlade);
    const notepad = screen.getByRole('heading', { name: /notepad/i });
    expect(notepad).toBeInTheDocument();
    fireEvent.click(notepadBlade);

    const proposalTeamButton = screen.getByTitle('Team');
    fireEvent.click(proposalTeamButton);
    const team = screen.getByText('Team');
    expect(team).toBeInTheDocument();

    const teamBlade = container.querySelector(
      '#panel-notepad > div > button > svg > path'
    );
    fireEvent.click(teamBlade);
    fireEvent.click(teamBlade);
  });

  test('check for timelines tab', () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: allFlags
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_ACTIVE_TABINDEX,
      payload: 1
    });
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/opportunities/UZA89257',
          search: '?viewType=timelines'
        }
      ]
    });
    window.history.pushState(
      {},
      '',
      '/opportunities/UZA89257?viewType=timelines&bidNo=3'
    );
    const { container } = render(
      <TabWithRedux
        id="UZA89257"
        enableValidateTab
        selectedView="timelines"
        onChangeSelectedTab={jest.fn()}
      />
    );
    expect(container).toBeInTheDocument();
  });

  test('check for approval tab rendering', () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: allFlags
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_ACTIVE_TABINDEX,
      payload: 2
    });
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/opportunities/UZA89257',
          search: '?viewType=approvals'
        }
      ]
    });
    const { container } = render(
      <TabWithRedux
        id="UZA89257"
        enableValidateTab
        selectedView="approvals"
        onChangeSelectedTab={jest.fn()}
      />
    );
    expect(container).toBeInTheDocument();
  });

  test('check for documents tab rendering', () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: allFlags
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_ACTIVE_TABINDEX,
      payload: 3
    });
    const history = createMemoryHistory({
      initialEntries: [
        {
          pathname: '/opportunities/UZA89257',
          search: '?viewType=documents'
        }
      ]
    });
    const { container } = render(
      <TabWithRedux
        id="UZA89257"
        enableValidateTab
        selectedView="documents"
        onChangeSelectedTab={jest.fn()}
      />
    );
    expect(container).toBeInTheDocument();
  });

  test('check for custom tab rendering', async () => {
    store.dispatch({
      type: UNITY_TABS.SET_UNITY_TABS,
      payload: customTab
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_ACTIVE_TABINDEX,
      payload: 4
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SWITCH_TEMP_STATUS,
      payload: 'success'
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.CHANGE_BID_STATUS_OPERATION,
      payload: true
    });

    jest.spyOn(UtilsFunc, 'checkTabRender').mockReturnValue(true);
    window.history.pushState(
      {},
      '',
      '/opportunities/UZA89257?viewType=testing&bidNo=3'
    );
    const { container } = render(
      <TabWithRedux
        id="UZA89257"
        enableValidateTab
        selectedView="validate"
        onChangeSelectedTab={jest.fn()}
      />
    );
    await waitFor(() => {
      const moreButton = screen.getByText('More');
      fireEvent.click(moreButton);

      const timelineTab = screen.getByText('Timeline');
      fireEvent.click(timelineTab);
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Available Dates')).toBeInTheDocument();
    });
  });
});
