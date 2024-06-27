import ApolloChatBubble from 'apollo-react-4.19.0/components/ChatBubble';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import React, { useState } from 'react';
import { Copy } from 'apollo-react-icons';
import IconButton from 'apollo-react/components/IconButton';
import classNames from 'classnames';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import ThumbsDown from '../../svg/ThumbsDown';
import { useSelector } from 'react-redux';
import { selectChatBotFeedbackFlag } from '../../../redux/selectors/proposal';

const ChatBubbleActions = ({ variant = 'user', content, sentOrReceivedAt }) => {
  const [showCopySnack, setShowCopySnack] = useState(false);
  const chatBotFeedbackFlag = useSelector(selectChatBotFeedbackFlag);

  const createClipBoardContent = () => {
    let html = '<html><body>';
    // Replace \n with <br /> for HTML line breaks
    const formattedContent = content.replace(/\n/g, '<br />');
    html += `${formattedContent}`;
    html += '</body></html>';
    return html;
  };

  const copyToClipBoard = () => {
    setShowCopySnack(true);
    const content = createClipBoardContent();
    const blob = new Blob([content], { type: 'text/html' });
    const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
    navigator.clipboard.write([clipboardItem]);
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
          <div>
            <IconButton size="small" onClick={() => copyToClipBoard()} darkMode>
              <Copy />
            </IconButton>
            {chatBotFeedbackFlag && (
              <IconButton
                size="small"
                onClick={() => console.info('Thumbs down icon clicked!')}
                darkMode
              >
                <ThumbsDown />
              </IconButton>
            )}
          </div>
        </>
      )}
      <Snackbar
        className="custom-snackbar"
        open={showCopySnack}
        autoHideDuration={2000}
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
