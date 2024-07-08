import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import ChatBotFab from 'apollo-react-4.19.0/components/ChatBotFab';
import ChatBotHeader from 'apollo-react-4.19.0/components/ChatBotHeader';
import ChatBotFooter from 'apollo-react-4.19.0/components/ChatBotFooter';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import Typography from 'apollo-react/components/Typography';
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from './ChatBubble';
import CustomModal from '../../common/CustomModal';
import './styles.scss';
import classNames from 'classnames';
import ChatBotInfo from './ChatBotInfo';
import { useSelector } from 'react-redux';
import {
  selectChatBotBubbles,
  selectChatBotFetchingHistory
} from '../../../redux/selectors/chatbot';
import { useDispatch } from 'react-redux';
import {
  fetchHistory,
  handleChatBotQueryWSMsg,
  sendDataTrigger
} from '../../../redux/actions/chatbot-actions';
import { useRouteMatch, useHistory } from 'react-router-dom';
import featureFlags from '../../../constants/featureFlags';
import Loader from 'apollo-react/components/Loader';
import { MultiResponseChat } from './MultiResponseChat';
import { changeBid } from '../../../redux/actions/proposal-actions';
import { getBidList } from '../../../redux/selectors/proposal';
import { extractBidInfo, extractContext } from './utils';
import { SocketContext } from '../../../context/SocketContext';
import { REDUX_TYPES } from '../../../constants';
import { CHATBOT } from '../../../constants/app';

const { ADD_CHATBOT_BUBBLE, SET_LOADING_STATE } = REDUX_TYPES.CHATBOT;

const ChatBot = () => {
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [gotoQuestionData, setGotoQuestionData] = useState({});
  const [openDifferentBidModal, setOpenDifferentBidModal] = useState(false);

  const bubblesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const flags = useSelector(state => state.proposal.get('eventflag'));
  const bubbles = useSelector(selectChatBotBubbles);
  const bidList = useSelector(getBidList);
  const loading = useSelector(state => state.chatbot.loading);
  const fetchingHistory = useSelector(selectChatBotFetchingHistory);

  const handleClose = useCallback(() => setExpanded(false), []);

  const {
    socket: { current: socketInstance },
    initiateConnection
  } = useContext(SocketContext);

  const winLocationSearch = window.location.search;
  const queryparams = new URLSearchParams(winLocationSearch);
  const bidNo = queryparams.get('bidNo');
  const bidType = queryparams.get('bidType');

  const {
    params: { id }
  } = useRouteMatch();

  const handleOpen = useCallback(() => {
    setExpanded(true);
    dispatch(sendDataTrigger({ opportunityNumber: id, bidNo, bidType }));
  }, [id, bidNo, bidType, dispatch]);

  useEffect(() => {
    if (socketInstance) {
      console.info(`[CHATBOT] Socket instance available!`);
      socketInstance.addEventListener('message', message => {
        const data = JSON.parse(message.data);
        // Handle event ONLY if data.event_group is 'CHATBOT'
        if (data.event_group === 'CHATBOT') {
          switch (data.event_name) {
            case 'CHATBOT_USER_QUERY_RESPONSE':
              console.info(`[CHATBOT] Event: ${data.event_name}`);
              dispatch({
                type: ADD_CHATBOT_BUBBLE,
                payload: {
                  variant: 'system',
                  copyContent:
                    (data.event_data &&
                      data.event_data.response &&
                      data.event_data.response.result &&
                      data.event_data.response.result.result) ||
                    CHATBOT.DEFAULT_ERROR_REPLY,

                  children:
                    (data.event_data &&
                      data.event_data.response &&
                      data.event_data.response.result &&
                      data.event_data.response.result.result) ||
                    CHATBOT.DEFAULT_ERROR_REPLY,
                  sentOrReceivedAt: new Date(
                    data.event_data.created_at
                  ).getTime(),
                  info: {
                    id: data.event_data.id,
                    feedback: data.event_data.feedback,
                    is_ecoa_or_cd: data.event_data.is_ecoa_or_cd,
                    ...data.event_data.response
                  }
                }
              });
              dispatch({ type: SET_LOADING_STATE, payload: false });
              break;
            case 'CHATBOT_USER_QUERY':
              console.info(`[CHATBOT] Event: ${data.event_name}`);
              dispatch(handleChatBotQueryWSMsg(data.event_data));
              break;
            default:
              console.info(`[CHATBOT] Unknown Event: ${data.event_name}`);
              break;
          }
        }
      });
    } else {
      console.info(`[CHATBOT] Socket instance not available!`);
    }
  }, [socketInstance]);

  useEffect(() => {
    dispatch(fetchHistory(id));
  }, [id]);

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

  const handleSendMsgBtnClick = useCallback(
    async payload => {
      // if socketInstance is not available establish new connection and send message
      let socket = socketInstance;
      if (!socket) {
        socket = await initiateConnection();
        if (!socket) {
          console.error(`[CHATBOT] Socket connection failed!`);
          return;
        }
      }
      socket.send(
        JSON.stringify({
          event_group: 'CHATBOT',
          event_name: 'CHATBOT_USER_QUERY',
          event_data: {
            ...payload,
            query_id: uuidv4(),
            context: extractContext(
              bubbles,
              flags[featureFlags.CHATBOT_CONTENT_COUNT]
            )
          }
        })
      );
      await dispatch({ type: SET_LOADING_STATE, payload: true });
      await dispatch({
        type: ADD_CHATBOT_BUBBLE,
        payload: {
          variant: 'user',
          copyContent: payload.query,
          children: payload.query,
          sentOrReceivedAt: Date.now()
        }
      });
      // TODO: Set a timer to check if the response is not received in <n> seconds
      // and show a message to the user that the response is taking longer than expected
      // give UI control to the user to poll the server for the response
    },
    [dispatch, socketInstance, initiateConnection, bubbles, flags]
  );

  const findBidObjAndChangeBid = useCallback(
    ({ targetBidNumber, targetBidType, questionText }) => {
      const filterList = bidList.filter(
        bid => bid.bidNo == targetBidNumber && bid.bidType == targetBidType
      );
      if (filterList.length == 0) {
        return;
      }
      const bidObj = filterList[0];
      dispatch(
        changeBid(bidObj, null, () => {
          setExpanded(false);
          history.replace(
            `?bidNo=${targetBidNumber}&bidType=${targetBidType}&search_q_text=${questionText}`
          );
        })
      );
    },
    [bidList, dispatch]
  );

  const handleGotoQuestion = useCallback(
    (paramBidNo, questionText) => {
      const { targetBidNumber, targetBidType } = extractBidInfo(paramBidNo);
      if (bidNo == targetBidNumber && bidType == targetBidType) {
        findBidObjAndChangeBid({
          targetBidNumber,
          targetBidType,
          questionText
        });
      } else {
        setOpenDifferentBidModal(() => {
          setGotoQuestionData({ targetBidNumber, targetBidType, questionText });
          return true;
        });
      }
    },
    [bidList, dispatch, openDifferentBidModal, findBidObjAndChangeBid]
  );

  const handleReviewDoc = useCallback(fileId => {
    const newWindow = window.open(
      `https://app.box.com/file/${fileId}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  }, []);

  const onCloseDifferentBidModal = useCallback(
    () => setOpenDifferentBidModal(false),
    [openDifferentBidModal]
  );

  const onclickDifferentBidModal = useCallback(() => {
    setOpenDifferentBidModal(false);
    findBidObjAndChangeBid({ ...gotoQuestionData });
  }, [gotoQuestionData, findBidObjAndChangeBid]);

  return (
    <div
      className={classNames({
        'chat-bot-ui-container': true,
        expanded
      })}
    >
      <CustomModal
        open={openDifferentBidModal}
        onClose={onCloseDifferentBidModal}
        title="Visit Different Bid"
        buttonProps={[
          {
            label: 'Cancel'
          },
          {
            label: 'View Question',
            'data-testid': 'ok-button',
            onClick: onclickDifferentBidModal
          }
        ]}
      >
        <Typography>
          This answer is part of a different bid. Do you want to continue and
          change to that bid?
        </Typography>
      </CustomModal>
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
              'chat-bot-bubbles-container-fullscreen': fullscreen,
              relative: true
            })}
            ref={bubblesContainerRef}
          >
            {fetchingHistory ? (
              <Loader
                isInner
                className="chat-bot-loader"
                overlayClassName="chat-bot-loader-overlay"
              />
            ) : (
              <>
                {bubbles.map((bubble, index) => (
                  <ChatBubble
                    key={index}
                    info={bubble?.info}
                    variant={bubble.variant}
                    copyContent={bubble.copyContent}
                    replySuggestionMessage={bubble.replySuggestionMessage}
                    sentOrReceivedAt={bubble.sentOrReceivedAt}
                    isWelcomeBubble={bubble.type === 'WELCOME_MSG'}
                    sourceDocuments={bubble?.source_documents || []}
                    buttonProps={
                      bubble?.buttonProps?.map((button, i) => ({
                        label: button.label,
                        onClick: () =>
                          handleSendMsgBtnClick({
                            query: button.label,
                            id,
                            bidNo,
                            bidType
                          }),
                        title: button.label
                      })) || []
                    }
                    className="chat-bot-bubble"
                  >
                    {bubble.variant.startsWith('system') ? (
                      <MultiResponseChat
                        list={
                          bubble?.info &&
                          bubble?.info.result &&
                          Array.isArray(bubble?.info?.result.result)
                            ? bubble?.info?.result.result
                            : [bubble?.info?.result]
                        }
                        handleGotoQuestion={handleGotoQuestion}
                        handleReviewDoc={handleReviewDoc}
                      />
                    ) : (
                      bubble.children
                    )}
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
              </>
            )}
          </div>
          <div
            className={classNames({
              'chat-bot-footer-container': true,
              'chat-bot-footer-container-fullscreen': fullscreen
            })}
          >
            <ChatBotFooter
              disabled={loading || fetchingHistory}
              onSendClick={() => {
                if (!inputRef.current.value) {
                  return;
                }
                setInputText('');
                handleSendMsgBtnClick({
                  query: inputRef.current.value,
                  id,
                  bidNo,
                  bidType
                });
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
