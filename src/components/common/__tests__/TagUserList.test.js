import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TagUserList from '../TagUserList';
import * as getADUsers from '../../../api/getADUsers';
import Sinon from 'sinon';

describe.skip('TagUserList unit tests', () => {
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
    const userlistStubCall = sandbox.stub(getADUsers, 'default').resolves([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@noone.himself'
      }
    ]);
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(
        await findByText('John Doe(johndoe@noone.himself)')
      ).toBeInTheDocument();
    });
  });

  it('should not render users list on searchTag absent', async () => {
    let props = {
      searchTag: null
    };
    const userlistStubCall = sandbox.stub(getADUsers, 'default');
    userlistStubCall.onCall(0).resolves([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@noone.himself'
      }
    ]);
    userlistStubCall.resolves([]);
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(0);
    });
  });

  it('should not render users list on searchTag Present but no result', async () => {
    let props = {
      searchTag: 'a'
    };
    const userlistStubCall = sandbox.stub(getADUsers, 'default');
    userlistStubCall.withArgs('invalid').resolves([]);
    userlistStubCall.resolves([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@noone.himself'
      }
    ]);
    const { findByText, queryByText, rerender } = render(
      <TagUserList {...props} />
    );
    props = { searchTag: 'invalid' };
    rerender(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(2);
      expect(
        await queryByText('John Doe(johndoe@noone.himself)')
      ).not.toBeInTheDocument();
    });
  });

  it('should render empty users list on api failure', async () => {
    const props = {
      searchTag: 'a'
    };
    const userlistStubCall = sandbox.stub(getADUsers, 'default').resolves([]);
    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
    });
  });

  it('should call onSelect when list item is clicked', async () => {
    const mockOnSelect = jest.fn();
    const props = {
      searchTag: 'a',
      onSelect: mockOnSelect
    };
    const userlistStubCall = sandbox.stub(getADUsers, 'default').resolves([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@noone.himself'
      }
    ]);

    const { screen, findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(
        await findByText('John Doe(johndoe@noone.himself)')
      ).toBeInTheDocument();
    });
    fireEvent.click(await findByText('John Doe(johndoe@noone.himself)'));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
