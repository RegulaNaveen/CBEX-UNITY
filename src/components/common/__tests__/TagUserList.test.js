import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TagUserList from '../TagUserList';
import * as getADUsers from '../../../api/getADUsers';
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
    const mockClose = jest.fn();
    const props = {
      searchTag: 'a',
      onSelect: mockOnSelect,
      close: mockClose
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
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call onSelect when list item is seleted from keyboard', async () => {
    const mockOnSelect = jest.fn();
    const mockClose = jest.fn();
    const props = {
      searchTag: 'a',
      onSelect: mockOnSelect,
      close: mockClose
    };
    const userlistStubCall = sandbox.stub(getADUsers, 'default').resolves([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@noone.himself'
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@noone.herself'
      }
    ]);

    const { screen, findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(
        await findByText('John Doe(johndoe@noone.himself)')
      ).toBeInTheDocument();
    });
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should close list and not select option when Escape is pressed', async () => {
    const mockOnSelect = jest.fn();
    const mockClose = jest.fn();
    const props = {
      searchTag: 'a',
      onSelect: mockOnSelect,
      close: mockClose
    };
    const userlistStubCall = sandbox.stub(getADUsers, 'default').resolves([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@noone.himself'
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@noone.herself'
      }
    ]);

    const { findByText } = render(<TagUserList {...props} />);
    await waitFor(async () => {
      expect(userlistStubCall.callCount).toEqual(1);
      expect(
        await findByText('John Doe(johndoe@noone.himself)')
      ).toBeInTheDocument();
    });
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter', code: 'Escape' });
    expect(mockOnSelect).toHaveBeenCalledTimes(0);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
