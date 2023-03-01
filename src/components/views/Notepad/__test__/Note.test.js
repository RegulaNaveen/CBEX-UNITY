import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Note from '../Note';

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
});
