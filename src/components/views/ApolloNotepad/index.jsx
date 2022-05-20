import React, { Fragment, useEffect, useState } from 'react';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import debounce from 'lodash/debounce';
import { EditorState, convertFromRaw } from 'draft-js';

/**
 * @defaultNote should be in RichText JSON type i.e {block:[],entityMap:{}}
 */
const ApolloNotepad = ({ defaultNote = null }) => {
  let isFirstLoad = true;
  const handleNotesChange = debounce(value => {
    console.log({ isFirstLoad, time: new Date(), value });
    // This function should not save data to db on first load
    if (!isFirstLoad) {
      // TODO Save data to db
      console.log('Save data to DB');
    }
    isFirstLoad = false;
  }, 2000);
  return (
    <div>
      <RichTextEditor
        spellCheck={true}
        onChange={handleNotesChange}
        defaultValue={defaultNote}
      />
    </div>
  );
};

export default ApolloNotepad;
