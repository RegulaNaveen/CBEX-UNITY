import React, { useEffect, useState } from 'react';
import ApolloChatBubble from 'apollo-react-4.19.0/components/ChatBubble';
import { Copy } from 'apollo-react-icons';
import classNames from 'classnames';
import moment from 'moment';

const ChatBubbleActions = ({ variant = 'user', content }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={classNames({
        'chat-bubble-actions': true,
        'chat-bubble-actions-reverse': variant === 'user'
      })}
    >
      <span>{variant === 'user' ? 'You' : 'BidAssist'}</span>
      {variant !== 'user' && <span>{`- ${moment().fromNow()}`}</span>}
      <div
        onClick={() => {
          navigator.clipboard.writeText(content);
          setCopied(true);
        }}
      >
        <Copy className={classNames({ copied, 'copy-icon': true })} />
      </div>
    </div>
  );
};

const ChatBubble = ({
  variant,
  replySuggestionMessage = '',
  buttonProps = [],
  children,
  copyContent,
  className = ''
}) => (
  <ApolloChatBubble
    variant={variant}
    senderName={<ChatBubbleActions variant={variant} content={copyContent} />}
    replySuggestionMessage={replySuggestionMessage}
    buttonProps={buttonProps}
    className={className}
  >
    {children}
  </ApolloChatBubble>
);

export default ChatBubble;
