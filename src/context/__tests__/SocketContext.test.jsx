import React from 'react';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import SocketContext from '../SocketContext';
import { store } from '../../store';
import * as constants from '../../constants/api';
import PriceModeler from '../../components/common/PriceModeler';
import { setSession } from '../../SessionHandler';

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
});
