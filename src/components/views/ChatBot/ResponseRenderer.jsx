import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CHATBOT } from '../../../constants/app';

function ResponseRenderer({ response }) {
  const [breakDowns, setBreakDowns] = useState([]);

  useEffect(() => {
    if (response) {
      setBreakDowns(
        response.split('\n').map(line => {
          const headingInfo = CHATBOT.HEADINGS_REGEXP.exec(line);
          if (headingInfo !== null) {
            const headingLevel = headingInfo.groups['hcnt'].length;
            let heading = <h6>{headingInfo.groups['hname']}</h6>;
            switch (headingLevel) {
              case 1:
                heading = <h1>{headingInfo.groups['hname']}</h1>;
                break;
              case 2:
                heading = <h2>{headingInfo.groups['hname']}</h2>;
                break;
              case 3:
                heading = <h3>{headingInfo.groups['hname']}</h3>;
                break;
              case 4:
                heading = <h4>{headingInfo.groups['hname']}</h4>;
                break;
              case 5:
                heading = <h5>{headingInfo.groups['hname']}</h5>;
                break;
              default:
            }
            return <>{heading}</>;
          } else if (line.trim() === '') {
            return <>{'\n'}</>;
          } else {
            return <>{line + '\n'}</>;
          }
        })
      );
    } else {
      setBreakDowns([<>{CHATBOT.NO_ANSWER_MSG}</>]);
    }
  }, [response]);

  return <>{breakDowns}</>;
}

ResponseRenderer.propTypes = {
  response: PropTypes.string.isRequired
};

ResponseRenderer.defaultProps = {
  response: ''
};

export default ResponseRenderer;
