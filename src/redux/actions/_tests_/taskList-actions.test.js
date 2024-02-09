import Sinon from 'sinon';
import { fetchTasksList } from '../tasksList-actions';
import * as TasklistApis from '../../../api/tasksList';
describe('taskList actions', () => {
  let sinonSandbox;

  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should set loading to true and fetch tasks list', async () => {
    const proposalId = '123';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'fetchTasksListApi')
      .resolves({ tasks: [] });
    await fetchTasksList(proposalId)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_TASKS', payload: [] });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should set loading to true and fetch tasks list with non array', async () => {
    const proposalId = '123';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'fetchTasksListApi')
      .resolves({ tasks: {} });
    await fetchTasksList(proposalId)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_TASKS', payload: [] });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should set loading to true and fetch tasks list with error', async () => {
    const proposalId = '123';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'fetchTasksListApi')
      .rejects({});
    await fetchTasksList(proposalId)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR_FETCHING_TASKS',
      payload: { data: {} }
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });
});
