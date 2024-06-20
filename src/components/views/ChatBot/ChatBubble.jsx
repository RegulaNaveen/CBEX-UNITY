import ApolloChatBubble from 'apollo-react-4.19.0/components/ChatBubble';
import React, { useState } from 'react';
import { Copy } from 'apollo-react-icons';
import IconButton from 'apollo-react/components/IconButton';
import classNames from 'classnames';
import moment from 'moment';
import ThumbsDown from '../../svg/ThumbsDown';

const ChatBubbleActions = ({ variant = 'user', content, sentOrReceivedAt }) => {
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
      {/* <IconButton
        size="small"
        onClick={() => console.info('Copy icon clicked!')}
        darkMode
      >
        <Copy />
      </IconButton> */}
      {variant !== 'user' && (
        <IconButton
          size="small"
          onClick={() => console.info('Thumbs down icon clicked!')}
          darkMode
        >
          <ThumbsDown />
        </IconButton>
      )}
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
