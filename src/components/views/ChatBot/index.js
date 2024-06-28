import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatBotFab from 'apollo-react-4.19.0/components/ChatBotFab';
import ChatBotHeader from 'apollo-react-4.19.0/components/ChatBotHeader';
import ChatBotFooter from 'apollo-react-4.19.0/components/ChatBotFooter';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import ChatBubble from './ChatBubble';
import './styles.scss';
import classNames from 'classnames';
import ChatBotInfo from './ChatBotInfo';
import { useSelector } from 'react-redux';
import { selectChatBotBubbles } from '../../../redux/selectors/chatbot';
import { useDispatch } from 'react-redux';
import { addChatBotBubble } from '../../../redux/actions/chatbot-actions';
import { welcomeBubble } from '../../../redux/reducers/chatbot';
import { REDUX_TYPES } from '../../../constants';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { changeBid } from '../../../redux/actions/proposal-actions';
import { getBidList } from '../../../redux/selectors/proposal';

const { ADD_CHATBOT_BUBBLE } = REDUX_TYPES.CHATBOT;

const ChatBot = () => {
  const bubblesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const history = useHistory();
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const bubbles = useSelector(selectChatBotBubbles);
  const bidList = useSelector(getBidList);
  const loading = useSelector(state => state.chatbot.loading);
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [disableFooter, setDisableFooter] = useState(false);
  const handleClose = useCallback(() => setExpanded(false), []);
  const handleOpen = useCallback(() => {
    setExpanded(true);
    if (bubbles.length === 0) {
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: welcomeBubble });
    }
  }, [bubbles]);

  const winLocationSearch = window.location.search;
  const queryparams = new URLSearchParams(winLocationSearch);
  const bidNo = queryparams.get('bidNo');
  const bidType = queryparams.get('bidType');

  const {
    params: { id }
  } = useRouteMatch();

  useEffect(() => {
    if (bubbles.length <= 1) {
      return;
    }
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

  const handleGotoQuestion = useCallback(
    (bidNo, questionText) => {
      const filterList = bidList.filter(bid => bid.bidNo == bidNo);
      if (filterList.length == 0) {
        return;
      }
      const bidObj = filterList[0];
      dispatch(
        changeBid(bidObj, null, () => {
          setExpanded(false);
          history.replace(
            `?bidNo=${bidNo}&bidType=${bidObj.bidType}&search_q_text=${questionText}`
          );
        })
      );
    },
    [bidList, dispatch]
  );

  const handleReviewDoc = useCallback(fileId => {
    const newWindow = window.open(
      `https://app.box.com/file/${fileId}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  }, []);

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
            onClose={handleClose}
            open
            onExpand={() => setFullscreen(prev => !prev)}
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
                info={bubble?.info}
                variant={bubble.variant}
                copyContent={bubble.copyContent}
                replySuggestionMessage={bubble.replySuggestionMessage}
                sentOrReceivedAt={bubble.sentOrReceivedAt}
                isWelcomeBubble={bubble.type === 'WELCOME_MSG'}
                buttonProps={
                  bubble?.buttonProps?.map((button, i) => ({
                    label: button.label,
                    onClick: () =>
                      dispatch(
                        addChatBotBubble(
                          { query: button.label, id, bidNo, bidType },
                          () => setDisableFooter(false)
                        )
                      )
                  })) || []
                }
                className="chat-bot-bubble"
              >
                {bubble.children}
              </ChatBubble>
            ))}
            {loading && (
              <div className="chat-bot-loader">
                <ApolloProgress
                  className="apollo-custom-progress-indicator"
                  statusText="BidAssist is responding..."
                  textAlignment="left"
                  solid
                />
              </div>
            )}
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
                if (!inputRef.current.value) {
                  return;
                }
                setDisableFooter(true);
                setInputText('');
                dispatch(
                  addChatBotBubble(
                    { query: inputRef.current.value, id, bidNo, bidType },
                    () => setDisableFooter(false)
                  )
                );
              }}
              onActionClick={() => console.log('onActionClick')}
              placeholder="Ask me something..."
              className={classNames({
                'chat-bot-footer': true,
                'chat-bot-footer-fullscreen': fullscreen
              })}
              InputProps={{
                inputRef,
                value: inputText,
                onChange: e => setInputText(e.target.value)
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
