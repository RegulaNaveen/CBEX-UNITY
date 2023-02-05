import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Note from '../Notepad/Note';

describe('Note component', () => {
  test('renders Note component with userName, date, section and content', () => {
    const userName = 'User 1';
    const date = '2022-01-01';
    const section = 'Test Section';
    const content = 'Test Content';
    const index = 1;
    const onShowAll = jest.fn();
    const onEdit = jest.fn();
    const textstyle = {};

    const { getByText } = render(
      <Note
        userName={userName}
        date={date}
        section={section}
        content={content}
        index={index}
        onShowAll={onShowAll}
        onEdit={onEdit}
        textstyle={textstyle}
      />
    );

    expect(getByText(userName)).toBeInTheDocument();
    expect(getByText(section)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  test.skip('renders expanded link when content is too long', () => {
    const userName = 'User 1';
    const date = '2022-01-01';
    const section = 'Test Section';
    const content =
      'This is a very long test content. This is a very long test content.';
    const index = 1;
    const onShowAll = jest.fn();
    const onEdit = jest.fn();
    const textstyle = {};

    const { getByText } = render(
      <Note
        userName={userName}
        date={date}
        section={section}
        content={content}
        index={index}
        onShowAll={onShowAll}
        onEdit={onEdit}
        textstyle={textstyle}
      />
    );

    expect(getByText('Show All')).toBeInTheDocument();
  });

  test.skip('calls onShowAll function when Show All link is clicked', async () => {
    const userName = 'User 1';
    const date = '2022-01-01';
    const section = 'Test Section';
    const content =
      'This is a very long test content. This is a very long test content.';
    const index = 1;
    const onShowAll = jest.fn();
    const onEdit = jest.fn();
    const textstyle = {};

    const { getByText } = render(
      <Note
        userName={userName}
        date={date}
        section={section}
        content={content}
        index={index}
        onShowAll={onShowAll}
        onEdit={onEdit}
        textstyle={textstyle}
      />
    );

    fireEvent.click(getByText('Show All'));
    await expect(onShowAll).toHaveBeenCalledWith(index);
  });
});
