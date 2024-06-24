import ApolloChatBubble from 'apollo-react-4.19.0/components/ChatBubble';
import React, { useState } from 'react';
import { Copy } from 'apollo-react-icons';
import IconButton from 'apollo-react/components/IconButton';
import classNames from 'classnames';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import ThumbsDown from '../../svg/ThumbsDown';

const ChatBubbleActions = ({ variant = 'user', content, sentOrReceivedAt }) => {
  const [showCopySnack, setShowCopySnack] = useState(false);

  const handleCopyClick = () => {
    setShowCopySnack(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowCopySnack(false);
  };

  return (
    <div
      className={classNames({
        'chat-bubble-actions': true,
        'chat-bubble-actions-reverse': variant === 'user'
      })}
    >
      <span>{variant === 'user' ? 'You' : 'BidAssist'}</span>
      {variant !== 'user' && (
        <span>
          &nbsp;
          {` - ${moment(sentOrReceivedAt).format('MMM D H:mm')}`}
        </span>
      )}
      {variant !== 'user' && (
        <>
          <IconButton size="small" onClick={() => handleCopyClick()} darkMode>
            <Copy />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => console.info('Thumbs down icon clicked!')}
            darkMode
          >
            <ThumbsDown />
          </IconButton>
        </>
      )}
      <Snackbar
        open={showCopySnack}
        autoHideDuration={300000}
        onClose={handleSnackbarClose}
        message="Copied to clipboard"
        // action={action}
      />
    </div>
  );
};

const ChatBubble = ({
  variant,
  replySuggestionMessage = '',
  buttonProps = [],
  children,
  copyContent,
  className = '',
  sentOrReceivedAt
}) => (
  <ApolloChatBubble
    variant={variant}
    senderName={
      <ChatBubbleActions
        variant={variant}
        content={copyContent}
        sentOrReceivedAt={sentOrReceivedAt}
      />
    }
    replySuggestionMessage={replySuggestionMessage}
    buttonProps={buttonProps}
    className={className}
  >
    {children}
  </ApolloChatBubble>
);

export default ChatBubble;
