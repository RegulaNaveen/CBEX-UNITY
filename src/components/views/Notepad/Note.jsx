import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'apollo-react/components/Link';
import Typography from 'apollo-react/components/Typography';
import Grid from 'apollo-react/components/Grid';
import {
  ContentState,
  Editor,
  EditorState,
  convertFromRaw,
  convertFromHTML
} from 'draft-js';
import { getUserName } from '../../../SessionHandler';
import {
  cssStyles,
  extendedBlockRenderMap,
  getBlockStyle
} from '../../common/RichTextEditor';
import 'draft-js/dist/Draft.css';

function Note({ userName, date, section, content, index, onShowAll, onEdit }) {
  const contentRef = useRef(null);
  const [showExpandLink, setShowExpandLink] = useState(false);

  useEffect(() => {
    if (
      contentRef &&
      contentRef.current &&
      contentRef.current.scrollHeight > contentRef.current.clientHeight
    ) {
      setShowExpandLink(true);
    }
  }, []);

  function onShowAllClick() {
    onShowAll(index);
  }

  const canEdit = userName === getUserName();
  let noteContent = content;
  let noteContentState = EditorState.createEmpty();

  try {
    noteContent = convertFromRaw(JSON.parse(noteContent));
  } catch (err) {
    const blocksFromHTML = convertFromHTML(content);
    noteContent = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
  } finally {
    noteContentState = EditorState.createWithContent(noteContent);
  }

  return (
    <div className="note">
      <div className="header">
        <Grid container spacing={2} alignContent="center">
          <Grid item xs={6} md={6} lg={8}>
            <Typography
              variant="body2"
              gutterBottom
              noWrap
              className="username"
            >
              {userName}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={4}>
            <Typography
              variant="body2"
              gutterBottom
              noWrap
              className="date"
              style={{ textAlign: 'right' }}
            >
              {moment(date).format('DD-MMM-yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className="body">
        <p className="title">{section}</p>
        <div className="content-wrapper" ref={contentRef}>
          <Editor
            className="content"
            customStyleMap={cssStyles}
            editorState={noteContentState}
            blockRenderMap={extendedBlockRenderMap}
            blockStyleFn={getBlockStyle}
            readOnly
            disabled
          />
          {showExpandLink && (
            <div className="expand-link">
              {/* eslint-disable-next-line */}
              ... <Link onClick={onShowAllClick}>Show All</Link>
            </div>
          )}
        </div>
        {canEdit && (
          <>
            {/* eslint-disable-next-line */}
            <Link onClick={() => onEdit(index)}>
              Edit Note
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

Note.propTypes = {
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Note;
