import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TagUserList from '../TagUserList';
import * as proposalApi from '../../../api/proposal';
import Sinon from 'sinon';

describe('TagUserList unit tests', () => {
  const sandbox = Sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    sandbox.restore();
  });
  it('should render users list on searchTag Present', async () => {
    const props = {
      searchTag: 'a'
    };
    const userlistStubCall = sandbox
      .stub(proposalApi, 'getUsersListApiCall')
      .resolves({
        data: [
          {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@noone.himself'
          }
        ]
      });
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(
        await findByText('Doe, John (johndoe@noone.himself)')
      ).toBeInTheDocument();
    });
  });

  it('should not render users list on searchTag Present', async () => {
    const props = {
      searchTag: null
    };
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(await findByText('No User Found')).toBeInTheDocument();
    });
  });

  it('should not render users list on searchTag Present but no result', async () => {
    const props = {
      searchTag: 'a'
    };
    const userlistStubCall = sandbox
      .stub(proposalApi, 'getUsersListApiCall')
      .resolves({ error: '401' });
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(await findByText('No User Found')).toBeInTheDocument();
    });
  });

  it('should render empty users list on api failure', async () => {
    const props = {
      searchTag: 'a'
    };
    const userlistStubCall = sandbox
      .stub(proposalApi, 'getUsersListApiCall')
      .rejects();
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(await findByText('No User Found')).toBeInTheDocument();
    });
  });

  it('should call onSelect when list item is clicked', async () => {
    const mockOnSelect = jest.fn();
    const props = {
      searchTag: 'a',
      onSelect: mockOnSelect
    };
    const userlistStubCall = sandbox
      .stub(proposalApi, 'getUsersListApiCall')
      .resolves({
        data: [
          {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@noone.himself'
          }
        ]
      });

    const { screen, findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(
        await findByText('Doe, John (johndoe@noone.himself)')
      ).toBeInTheDocument();
    });
    fireEvent.click(await findByText('Doe, John (johndoe@noone.himself)'));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
