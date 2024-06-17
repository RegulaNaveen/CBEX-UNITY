import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatBotFab from 'apollo-react-4.19.0/components/ChatBotFab';
import ChatBotHeader from 'apollo-react-4.19.0/components/ChatBotHeader';
import ChatBotFooter from 'apollo-react-4.19.0/components/ChatBotFooter';
import ChatBubble from './ChatBubble';
import './styles.scss';
import classNames from 'classnames';
import ChatBotInfo from './ChatBotInfo';
import { useSelector } from 'react-redux';
import { selectChatBotBubbles } from '../../../redux/selectors/chatbot';
import { useDispatch } from 'react-redux';
import { addChatBotBubble } from '../../../redux/actions/chatbot-actions';

const ChatBot = () => {
  const bubblesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const bubbles = useSelector(selectChatBotBubbles);
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [disableFooter, setDisableFooter] = useState(false);
  const handleClose = useCallback(() => setExpanded(false), []);
  const handleOpen = useCallback(() => {
    setExpanded(true);
  }, []);

  useEffect(() => {
    if (expanded) {
      bubblesContainerRef.current.scrollTop =
        bubblesContainerRef.current.scrollHeight;
    }
  }, [expanded, bubbles]);

  useEffect(() => {
    const root = document.documentElement;
    if (fullscreen) {
      root?.style.setProperty('--fullscreen-margin-left-inputbox', '17vw');
      root?.style.setProperty('--fullscreen-min-width-inputbox', '60vw');
    } else {
      root?.style.setProperty('--fullscreen-margin-left-inputbox', '0px');
      root?.style.setProperty('--fullscreen-min-width-inputbox', '100%');
    }
  }, [fullscreen]);

  useEffect(() => {
    if (!disableFooter && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [disableFooter]);

  return (
    <div
      className={classNames({
        'chat-bot-ui-container': true,
        expanded
      })}
    >
      {expanded ? (
        <div
          className={classNames({
            'chat-bot-ui': true,
            'chat-bot-ui-fullscreen': fullscreen
          })}
        >
          <ChatBotHeader
            headerText="BidAssist"
            menuItems={[]}
            onExpand={() => setFullscreen(prev => !prev)}
            onClose={handleClose}
            open
            className="chat-bot-header"
          />
          <div
            className={classNames({
              'chat-bot-bubbles-container': true,
              'chat-bot-bubbles-container-fullscreen': fullscreen
            })}
            ref={bubblesContainerRef}
          >
            {bubbles.map((bubble, index) => (
              <ChatBubble
                key={index}
                variant={bubble.variant}
                copyContent={bubble.copyContent}
                replySuggestionMessage={bubble.replySuggestionMessage}
                buttonProps={
                  bubble?.buttonProps?.map((button, i) => ({
                    label: button.label,
                    onClick: () => console.log(button.label)
                  })) || []
                }
              >
                {bubble.children}
              </ChatBubble>
            ))}
          </div>
          <div
            className={classNames({
              'chat-bot-footer-container': true,
              'chat-bot-footer-container-fullscreen': fullscreen
            })}
          >
            <ChatBotFooter
              disabled={disableFooter}
              onSendClick={() => {
                setDisableFooter(true);
                dispatch(
                  addChatBotBubble(inputRef.current.value, () =>
                    setDisableFooter(false)
                  )
                );
              }}
              onActionClick={() => console.log('onActionClick')}
              placeholder="Ask me something..."
              className="chat-bot-footer"
              InputProps={{
                inputRef
              }}
            />
            <ChatBotInfo
              className={classNames({
                'chat-bot-info': true,
                'chat-bot-info-fullscreen': fullscreen
              })}
            />
          </div>
        </div>
      ) : (
        <ChatBotFab id="chat-bot" onClick={handleOpen}>
          {'BidAssist'}
        </ChatBotFab>
      )}
    </div>
  );
};

export default ChatBot;
