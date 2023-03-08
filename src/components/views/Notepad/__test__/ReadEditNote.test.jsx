import React from 'react';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import EditNote from '../ReadEditNote';

describe('EditNote component', () => {
  const sections = Map({
    1: Map({ sectionName: 'Section 1' }),
    2: Map({ sectionName: 'Section 2' })
  });

  const note = Map({
    id: 1,
    noteText: '{"blocks":[],"entityMap":{}}',
    section: sections.get(1)
  });

  it('should render ReadNote when readOnly is true', () => {
    const wrapper = mount(
      <EditNote sections={sections} readOnly note={note} onClose={() => {}} />
    );
    expect(wrapper.find('.read-note')).toHaveLength(1);
  });

  it('should render EditNoteForm when readOnly is false', () => {
    const wrapper = mount(
      <EditNote
        sections={sections}
        readOnly={false}
        note={note}
        onClose={() => {}}
      />
    );
    expect(wrapper.find('.edit-note')).toHaveLength(1);
  });
});
