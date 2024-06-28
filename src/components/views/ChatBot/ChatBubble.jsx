import ApolloChatBubble from 'apollo-react-4.19.0/components/ChatBubble';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import React, { useState } from 'react';
import { Copy } from 'apollo-react-icons';
import IconButton from 'apollo-react/components/IconButton';
import classNames from 'classnames';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import ThumbsDown from '../../svg/ThumbsDown';
import FeedbackModal, { FeedbackSubmitModal } from './FeedbackModal';
import { useSelector } from 'react-redux';
import { selectChatBotFeedbackFlag } from '../../../redux/selectors/proposal';

const ChatBubbleActions = ({
  variant = 'user',
  content,
  sentOrReceivedAt,
  isWelcomeBubble
}) => {
  const [showCopySnack, setShowCopySnack] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const chatBotFeedbackFlag = useSelector(selectChatBotFeedbackFlag);

  // REQUIRED TO SUPPORT HTML COPY TO CLIPBOARD
  // const createClipBoardContent = () => {
  //   let html = '<html><body>';
  //   // Replace \n with <br /> for HTML line breaks
  //   const formattedContent = content.replace(/\n/g, '<br />');
  //   html += `${formattedContent}`;
  //   html += '</body></html>';
  //   return html;
  // };

  const copyToClipBoard = () => {
    // REQUIRED TO SUPPORT HTML COPY TO CLIPBOARD
    // const htmlContent = createClipBoardContent();
    // const blob = new Blob([htmlContent], { type: 'text/html' });
    // const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
    navigator.clipboard.writeText(content);
    setShowCopySnack(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowCopySnack(false);
  };

  const handleThumbsDownClick = () => {
    setShowFeedbackModal(true);
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
          {` - ${moment(sentOrReceivedAt).format('MMM D HH:mm')}`}
        </span>
      )}
      {variant !== 'user' && !isWelcomeBubble && (
        <>
          <div>
            <IconButton size="small" onClick={() => copyToClipBoard()} darkMode>
              <Copy />
            </IconButton>
            {chatBotFeedbackFlag && (
              <IconButton
                size="small"
                onClick={() => handleThumbsDownClick()}
                darkMode
                disabled={!info.id || info.feedback}
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
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal
          id={info?.id}
          answer={content}
          open={showFeedbackModal}
          setShowSubmitModal={setShowSubmitModal}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
      {/* Feedback Submit Modal */}
      {showSubmitModal && (
        <FeedbackSubmitModal
          open={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
};

const ChatBubble = ({
  info,
  variant,
  replySuggestionMessage = '',
  buttonProps = [],
  children,
  copyContent,
  className = '',
  sentOrReceivedAt,
  isWelcomeBubble
}) => (
  <ApolloChatBubble
    variant={variant}
    senderName={
      <ChatBubbleActions
        info={info}
        variant={variant}
        content={copyContent}
        sentOrReceivedAt={sentOrReceivedAt}
        isWelcomeBubble={isWelcomeBubble}
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
