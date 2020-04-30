// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getProposalInfo } from '../../../src/api/proposal';

describe('ProposalApi', () => {
  const PROPOSAL_API_URL =
    'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals/';

  describe('getProposalInfo', () => {
    it('should get proposal info', async () => {
      const mock = new MockAdapter(axios);
      const proposalId = '72f54264-5154-4899-ac6c-95dea210156d';
      const response = {
        data: {
          id: proposalId
        }
      };
      mock.onGet(`${PROPOSAL_API_URL}/${proposalId}`).reply(200, response);
      const data = await getProposalInfo(proposalId);
      expect(data).toEqual(response);
      mock.reset();
    });

    it('should catch error on get proposal info', async () => {
      const mock = new MockAdapter(axios);
      const proposalId = '72f54264-5154-4899-ac6c-95dea210156d';
      const message = 'Error message';
      const err = {
        message
      };
      mock.onGet(`${PROPOSAL_API_URL}/${proposalId}`).reply(500, err);
      const expectedError = async () => {
        await getProposalInfo(proposalId);
      };
      expect(expectedError()).rejects.toThrowError();
      mock.reset();
    });
  });
});
