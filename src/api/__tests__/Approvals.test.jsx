import { axiosInstance } from '../../store';
import { APPROVALS_URL, PROPOSAL } from '../../constants/api';
import {
  getApprovalsApi,
  deleteApprovalsApi,
  duplicateApprovalApi
} from '../approvals';
import Sinon from 'sinon';

describe('Approvals api functions', () => {
  const sandbox = Sinon.createSandbox();

  beforeEach(() => {
    sandbox.restore();
  });

  afterAll(() => {
    sandbox.restore();
  });

  test('getApprovalsApi should send data', () => {
    sandbox.stub(axiosInstance, 'get').resolves({
      data: []
    });
    expect(getApprovalsApi()).resolves.toStrictEqual({ data: [] });
  });

  test('deleteApprovalsApi should delete data', () => {
    sandbox.stub(axiosInstance, 'delete').resolves({
      data: []
    });
    expect(deleteApprovalsApi()).resolves.toStrictEqual({ data: [] });
  });

  test('duplicateApprovalApi should duplicate data', () => {
    sandbox.stub(axiosInstance, 'put').resolves({
      data: []
    });
    expect(duplicateApprovalApi()).resolves.toStrictEqual({ data: [] });
  });
});
