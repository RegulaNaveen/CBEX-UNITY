import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'apollo-react/components/Link';
import Typography from 'apollo-react/components/Typography';
import Grid from 'apollo-react/components/Grid';

function Note({ userName, date, section, content }) {
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
            <Typography variant="body2" gutterBottom noWrap className="date">
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
              ... <Link>Show All</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Note.propTypes = {
  userName: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  section: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.string.isRequired
};

export default Note;
