import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MentionList from '../WysiwygNotepad/MentionList';
import userEvent from '@testing-library/user-event';

describe('MentionList', () => {
  it('should render correctly', async () => {
    const props = {
      items: [{ listOption: 'abc' }],
      command: jest.fn()
    };
    ('');

    const mockSelectItem = jest.fn();

    const user = userEvent.setup();

    const { getByRole } = render(<MentionList {...props} />);
    await user.click(getByRole('button'));
    expect(getByRole('button')).toBeTruthy();
  });
});
