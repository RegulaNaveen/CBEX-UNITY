// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getProposalInfo, setProposalAnswer } from '../../../src/api/proposal';

describe('ProposalApi', () => {
  const PROPOSAL_API_URL =
    'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals';

  describe('getProposalInfo', () => {
    it('should get proposal info', async () => {
      const mock = new MockAdapter(axios);
      const proposalId = '9b28f967-229c-4ca4-9ab6-74e8e681bd50';
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
      const proposalId = '9b28f967-229c-4ca4-9ab6-74e8e681bd50';
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

  describe('setProposalAnswer', () => {
    it('should set proposal answer', async () => {
      const mock = new MockAdapter(axios);
      const proposalId = '9b28f967-229c-4ca4-9ab6-74e8e681bd50';
      const questionId = 'Data Strategy-O0U';
      const answer = 'Fake answer';
      const response = {
        user: 'user@test.com',
        date: '2020-05-12T16:52:19.433Z',
        answer: 'answer'
      };
      mock
        .onPut(`${PROPOSAL_API_URL}/${proposalId}/${questionId}`)
        .reply(200, response);
      const data = await setProposalAnswer(proposalId, questionId, answer);
      expect(data).toEqual(response);
      mock.reset();
    });

    it('should cath error on set proposal answer', () => {
      const mock = new MockAdapter(axios);
      const proposalId = '9b28f967-229c-4ca4-9ab6-74e8e681bd50';
      const questionId = 'Data Strategy-O0U';
      const answer = 'Fake answer';
      const response = {
        user: 'user@test.com',
        date: '2020-05-12T16:52:19.433Z',
        answer: 'answer'
      };
      mock
        .onPut(`${PROPOSAL_API_URL}/${proposalId}/${questionId}`)
        .reply(200, response);
      const expectedError = async () => {
        await setProposalAnswer(proposalId, questionId, answer);
      };
      expect(expectedError()).rejects.toThrowError();
      mock.reset();
    });
  });
});
