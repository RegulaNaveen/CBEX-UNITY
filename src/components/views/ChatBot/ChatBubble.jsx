import ApolloChatBubble from 'apollo-react-4.19.0/components/ChatBubble';
import React, { useEffect, useRef, useState } from 'react';
import { Copy } from 'apollo-react-icons';
import IconButton from 'apollo-react/components/IconButton';
import StatusCheck from 'apollo-react-icons/StatusCheck';
import Tooltip from 'apollo-react/components/Tooltip';
import classNames from 'classnames';
import moment from 'moment';
import ThumbsDown from '../../svg/ThumbsDown';
import FeedbackModal, { FeedbackSubmitModal } from './FeedbackModal';
import { useSelector } from 'react-redux';
import { selectChatBotFeedbackFlag } from '../../../redux/selectors/proposal';
import { getContentAsText } from './utils';

const ChatBubbleActions = ({
  info,
  variant = 'user',
  content,
  sentOrReceivedAt,
  isWelcomeBubble
}) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [copied, setCopied] = useState(false);
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
    setCopied(true);
    navigator.clipboard.writeText(getContentAsText(content));
    setTimeout(() => setCopied(false), 1000);
  };

  const handleThumbsDownClick = () => {
    setShowFeedbackModal(true);
  };

  const actions = [
    <span>{variant === 'user' ? 'You' : 'BidAssist'}</span>,
    sentOrReceivedAt !== null ? (
      <span>
        &nbsp;
        {` - ${moment(sentOrReceivedAt).format('MMM D HH:mm')}`}
      </span>
    ) : (
      <></>
    ),
    variant !== 'user' && !isWelcomeBubble ? (
      <>
        <div>
          <Tooltip
            id="copy-tooltip"
            variant="light"
            title={
              <div>
                <StatusCheck fontSize="extraSmall" />
                Copied
              </div>
            }
            placement="top"
            open={copied}
          >
            <IconButton
              title="Copy"
              size="small"
              onClick={() => copyToClipBoard()}
              darkMode
            >
              <Copy />
            </IconButton>
          </Tooltip>
          {chatBotFeedbackFlag ? (
            <IconButton
              size="small"
              onClick={() => handleThumbsDownClick()}
              darkMode
              disabled={!info.id || info.feedback}
            >
              <ThumbsDown />
            </IconButton>
          ) : null}
        </div>
      </>
    ) : (
      <></>
    )
  ];

  if (variant === 'user') {
    actions.reverse();
  }

  return (
    <div
      className={classNames({
        'chat-bubble-actions': true,
        'chat-bubble-actions-reverse': variant === 'user'
      })}
    >
      {actions}
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
  isWelcomeBubble,
  sourceDocuments = []
}) => {
  const sourceDocs = sourceDocuments.filter(
    src => src.metadata.doc_class !== 'unity'
  );
  const [showTooltip, setShowTooltip] = useState(
    Array(sourceDocs.length).fill(false)
  );
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      // Check if the click is on the scrollbar
      const isScrollbarClick =
        event.offsetX > event.target.clientWidth ||
        event.offsetY > event.target.clientHeight;

      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        !isScrollbarClick
      ) {
        setShowTooltip(Array(sourceDocs.length).fill(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sourceDocs.length]);

  const handleTooltipClick = index => e => {
    e.preventDefault();
    setShowTooltip(showTooltip.map((val, i) => (i === index ? true : false)));
  };

  const renderSourceDocument = () => {
    if (sourceDocs.length === 0) return null;
    return (
      <>
        {sourceDocs.map((docs, index) => (
          <span ref={tooltipRef} tabIndex={0}>
            <Tooltip
              id="answer-tooltip"
              title={
                <div>
                  <div>
                    {docs?.metadata?.source.replace(
                      /^\/usr\/src\/app\/api\/data\//,
                      ''
                    )}
                  </div>
                  <div>Page: {docs?.metadata?.page}</div>
                </div>
              }
              body={docs?.page_content}
              placement="top-start"
              variant="light"
              open={showTooltip[index]}
            >
              <span
                className="tooltip-index"
                onClick={handleTooltipClick(index)}
                style={{ cursor: 'pointer' }}
              >
                [{index + 1}]
              </span>
            </Tooltip>
          </span>
        ))}
      </>
    );
  };
  return (
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
      {renderSourceDocument()}
    </ApolloChatBubble>
  );
};

export default ChatBubble;
