import notification from '../notification';
import { axiosInstance } from '../../store';
import sinon from 'sinon';

describe('updateSeenOne', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('updateSeenOne', async () => {
    const notificationId = '123';
    const response = {
      data: {
        data: 'success'
      }
    };
    sandbox.stub(axiosInstance, 'patch').resolves(response);
    const result = await notification.updateSeenOne(notificationId);
    expect(result).toEqual(response.data.data);
  });

  it('fetchNotifications', async () => {
    const response = {
      data: {
        data: 'success'
      }
    };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await notification.fetchNotifications();
    expect(result).toEqual(response.data.data);
  });
  it('updateSeenBatch', async () => {
    const response = {
      data: {
        data: 'success'
      }
    };
    sandbox.stub(axiosInstance, 'patch').resolves(response);
    const result = await notification.updateSeenBatch();
    expect(result).toEqual(response.data.data);
  });
});
