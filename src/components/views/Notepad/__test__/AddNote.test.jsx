import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RichTextEditor from 'apollo-react/components/RichTextEditor/RichTextEditor';

import Select from 'apollo-react/components/Select';
import AddNoteForm from '../AddNote';

describe('AddNoteForm', () => {
  const sections = {
    valueSeq: () => [
      { get: () => ({ sectionName: 'Section 1' }) },
      { get: () => ({ sectionName: 'Section 2' }) }
    ]
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(sections);
  it('renders without crashing', () => {
    render(
      <AddNoteForm
        sections={sections}
        values={{}}
        handleSubmit={() => {}}
        setFieldValue={() => {}}
      />
    );
  });
});
