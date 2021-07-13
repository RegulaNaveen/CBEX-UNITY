import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'apollo-react/components/Link';
import Typography from 'apollo-react/components/Typography';
import Grid from 'apollo-react/components/Grid';
import { getUserName } from '../../../SessionHandler';

function Note({ userName, date, section, content, index, onShowAll, onEdit, textstyle, notesBottomstyle }) {
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

  return (
    <div className="note" style={notesBottomstyle ? {marginBottom: notesBottomstyle } : {}}>
      <div className="header">
        <Grid container spacing={2} alignContent="center">
          <Grid item xs={6} md={6} lg={8}>
            <Typography
              variant="body2"
              gutterBottom
              noWrap
              style={{paddingLeft: 8}}
              className="username"
            >
              {userName}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={4}>
            <Typography variant="body2" gutterBottom noWrap className="date" style={textstyle ? {...textstyle, ...{textAlign: 'right'} } :  {textAlign: 'right'}}>
              {moment(date).format('DD-MMM-yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className="body">
        <p className="title">{section}</p>
        <div className="content-wrapper">
          <p className="content" ref={contentRef}>
            {content}
          </p>
          {showExpandLink && (
            <div className="expand-link">
              {/* eslint-disable-next-line */}
              ... <Link onClick={onShowAllClick}>Show All</Link>
            </div>
          )}
        </div>
        { canEdit && <Link onClick={() => onEdit(index)}>Edit Note</Link> }
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
