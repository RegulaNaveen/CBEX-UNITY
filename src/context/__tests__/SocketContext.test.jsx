import React from 'react';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import { render, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import SocketContext from '../SocketContext';
import { store } from '../../store';
import * as constants from '../../constants/api';
import PriceModeler from '../../components/common/PriceModeler';
import { setSession } from '../../SessionHandler';
import { REDUX_TYPES } from '../../constants';
import proposalData from '../../components/views/__tests__/Search/data.json';

const PriceModelerWithSocketContext = () => (
  <Provider store={store}>
    <SocketContext>
      <PriceModeler />
    </SocketContext>
  </Provider>
);

describe('Price Modeler concurrency', () => {
  let ws;
  beforeAll(() => {
    ws = new WS('ws://localhost:8081');
  });

  afterAll(() => {
    WS.clean();
  });

  afterEach(cleanup);

  beforeEach(() => {
    constants.SOCKET_URL = 'ws://localhost:8081';
    setSession(
      'test',
      'NOT_EMPTY',
      'NOT_EMPTY',
      'NOT_EMPTY',
      'NOT_EMPTY',
      'NOT_EMPTY'
    );
  });

  test('shows loading indicator and tooltip on event "COST_ESTIMATE_CALCULATING"', async () => {
    const { getByText, findByTestId } = render(
      <PriceModelerWithSocketContext />
    );
    expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    // send "COST_ESTIMATE_CALCULATING" event message on websocket
    await ws.connected;
    await ws.send(
      JSON.stringify({ data: {}, event: 'COST_ESTIMATE_CALCULATING' })
    );
    await waitFor(async () => {
      expect(
        await findByTestId('price-modeler-recalc-loader')
      ).toBeInTheDocument();
    });
  });

  test('hides loading indicator and tooltip on event "COST_ESTIMATE_UPDATE"', async () => {
    const { getByText, getByTestId } = render(
      <PriceModelerWithSocketContext />
    );
    expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    // send "COST_ESTIMATE_CALCULATING" event message on websocket
    await ws.connected;
    await ws.send(
      JSON.stringify({ data: {}, event: 'COST_ESTIMATE_CALCULATING' })
    );
    // send "COST_ESTIMATE_UPDATE" event message on websocket
    const data = {
      Cost: 1000000,
      TherapyArea__c: 'Oncology',
      Number_of_Sites__c: '2',
      Phase_P__c: '3',
      Patients_Enrolled__c: '10',
      Potential_Regions__c: 'Asia Pacific'
    };
    await ws.send(JSON.stringify({ data, event: 'COST_ESTIMATE_UPDATE' }));
    waitFor(() => {
      expect(getByTestId('price-modeler-recalc-loader'))
        .not()
        .toBeInTheDocument();
    });
  });

  test('verify UI updates on event "COST_ESTIMATE_UPDATE"', async () => {
    const { getByText, findByText } = render(<PriceModelerWithSocketContext />);
    expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    // send "COST_ESTIMATE_UPDATE" event message on websocket
    const data = {
      Cost: 1000000,
      TherapyArea__c: 'Oncology',
      Number_of_Sites__c: '2',
      Phase_P__c: '3',
      Patients_Enrolled__c: '10',
      Potential_Regions__c: 'Asia Pacific'
    };
    await ws.send(JSON.stringify({ data, event: 'COST_ESTIMATE_UPDATE' }));
    await waitFor(async () => {
      expect(await findByText(data.TherapyArea__c)).toBeInTheDocument();
      expect(await findByText(data.Potential_Regions__c)).toBeInTheDocument();
    });
  });

  it.skip('should update proposal detail on WS event "PROPOSAL_DETAIL_UPDATE"', async () => {
    render(
      <Provider store={store}>
        <SocketContext>
          <p>Socket test component</p>
        </SocketContext>
      </Provider>
    );
    const data = {
      proposalId: '12345',
      proposalDetails: {
        testKey: 'testValue'
      },
      bidStatusKey: false,
      bidStopStatus: false
    };

    const payload = [{ proposal: { proposalId: '12345' } }];
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: payload
    });

    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'PROPOSAL_DETAIL_UPDATE' }));

    await waitFor(() =>
      expect(
        store.getState().proposal.getIn(['proposalDetails', 'testKey'])
      ).toBe('testValue')
    );
  });

  xit('should update next milestone on WS event "NEXT_MILESTONE_UPDATE"', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    render(
      <Provider store={store}>
        <SocketContext>
          <p>Socket test component</p>
        </SocketContext>
      </Provider>
    );
    const data = {
      nextMilestone: [{ name: 'Test milestone', date: '01-Jan-2023' }]
    };
    await ws.connected;
    await ws.send(
      JSON.stringify({ data, event: 'NEXT_MILESTONE_UPDATE', oppId: '12345' })
    );

    console.log(
      'proposalDetails',
      store.getState().proposal.get('proposalDetails')
    );

    await waitFor(() =>
      expect(
        store.getState().proposals.getIn(['proposals', 0, 'nextMilestone'])
      ).toEqual(data.nextMilestone)
    );
  });

  it('should update custom name on WS event "CUSTOM_NAME_UPDATE"', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    render(
      <Provider store={store}>
        <SocketContext>
          <p>Socket test component</p>
        </SocketContext>
      </Provider>
    );
    const data = {
      customName: 'Test custom name',
      oppNumber: '12345'
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'CUSTOM_NAME_UPDATE' }));

    await waitFor(() =>
      expect(
        store.getState().proposals.getIn(['proposals', 0, 'customName'])
      ).toBe('Test custom name')
    );
  });

  it('should update favourite on WS event "FAVOURITE"', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    render(
      <Provider store={store}>
        <SocketContext>
          <p>Socket test component</p>
        </SocketContext>
      </Provider>
    );
    const data = {
      favourite: true,
      oppNumber: '12345',
      favouriteUpdatedDate: new Date()
    };
    await ws.connected;
    await ws.send(JSON.stringify({ data, event: 'FAVOURITE' }));
    await waitFor(() =>
      expect(
        store.getState().proposals.getIn(['proposals', 0, 'isFavourite'])
      ).toBe(true)
    );
  });
});
