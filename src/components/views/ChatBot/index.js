import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatBotFab from 'apollo-react-4.19.0/components/ChatBotFab';
import ChatBotHeader from 'apollo-react-4.19.0/components/ChatBotHeader';
import ChatBotFooter from 'apollo-react-4.19.0/components/ChatBotFooter';
import ChatBubble from './ChatBubble';
import './styles.scss';
import classNames from 'classnames';
import ChatBotInfo from './ChatBotInfo';

const ChatBot = () => {
  const bubblesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [bubbles, setBubbles] = useState([
    {
      variant: 'SystemWithContent',
      replySuggestionMessage: 'Here are some things I can do:',
      children:
        "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. For best results, start a new topic when changing tasks or subjects.",
      copyContent:
        "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. For best results, start a new topic when changing tasks or subjects.",
      buttonProps: [
        {
          label: 'Show me the eCOA recommended services'
        },
        {
          label: 'See Regulatory Updates'
        },
        {
          label: 'Continue last topic: Enrolling a new Patient'
        }
      ]
    },
    {
      variant: 'user',
      children: 'How can I help you?',
      copyContent: 'How can I help you?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
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
              onSendClick={() => {
                const newBubble = {
                  variant: 'user',
                  copyContent: inputRef.current.value,
                  children: inputRef.current.value
                };
                setBubbles(prev => [...prev, newBubble]);
                setTimeout(() => {
                  const newBubble = {
                    variant: 'systemWithContent',
                    copyContent: 'Hii from India',
                    children: 'Hii from India',
                    replySuggestionMessage: 'Here are some things I can do:',
                    buttonProps: [
                      {
                        label: 'Show me the eCOA recommended services',
                        onClick: () =>
                          console.log(
                            'Show me the eCOA recommended services clicked'
                          )
                      },
                      {
                        label: 'See Regulatory Updates',
                        onClick: () =>
                          console.log('See Regulatory Updates clicked')
                      },
                      {
                        label: 'Continue last topic: Enrolling a new Patient',
                        onClick: () =>
                          console.log(
                            'Continue last topic: Enrolling a new Patient clicked'
                          )
                      }
                    ]
                  };
                  setBubbles(prev => [...prev, newBubble]);
                }, 3000);
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
