import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatBotFab from 'apollo-react-4.19.0/components/ChatBotFab';
import ChatBotHeader from 'apollo-react-4.19.0/components/ChatBotHeader';
import ChatBotFooter from 'apollo-react-4.19.0/components/ChatBotFooter';
import ApolloProgress from 'apollo-react/components/ApolloProgress';
import Typography from 'apollo-react/components/Typography';
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
  addChatBotBubble,
  fetchHistory
} from '../../../redux/actions/chatbot-actions';
import { REDUX_TYPES } from '../../../constants';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import featureFlags from '../../../constants/featureFlags';
import Loader from 'apollo-react/components/Loader';
import { MultiResponseChat } from './MultiResponseChat';
import { changeBid } from '../../../redux/actions/proposal-actions';
import { getBidList } from '../../../redux/selectors/proposal';

const { ADD_CHATBOT_BUBBLE } = REDUX_TYPES.CHATBOT;

function extractBidInfo(bidNo) {
  let targetBidType = '';
  let targetBidNumber = '';

  if (bidNo.startsWith('RFI_')) {
    targetBidType = 'RFI_Request';
    targetBidNumber = bidNo.slice(4);
  } else if (bidNo.startsWith('PA_')) {
    targetBidType = 'Post_Award_Bid';
    targetBidNumber = bidNo.slice(3);
  } else if (bidNo.startsWith('EE_')) {
    targetBidType = 'Early_Engagement_Bid';
    targetBidNumber = bidNo.slice(3);
  } else {
    targetBidType = 'Clinical_Bid';
    targetBidNumber = bidNo;
  }

  return { targetBidNumber, targetBidType };
}

const ChatBot = () => {
  const bubblesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const history = useHistory();
  const [inputText, setInputText] = useState('');
  const [openDifferentBidModal, setOpenDifferentBidModal] = useState(false);
  const [gotoQuestionData, setGotoQuestionData] = useState({});
  const dispatch = useDispatch();
  const bubbles = useSelector(selectChatBotBubbles);
  const bidList = useSelector(getBidList);
  const loading = useSelector(state => state.chatbot.loading);
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [disableFooter, setDisableFooter] = useState(false);
  const fetchingHistory = useSelector(selectChatBotFetchingHistory);
  const handleClose = useCallback(() => setExpanded(false), []);

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

  const handleWindowFocus = useCallback(() => {
    dispatch(fetchHistory(id, true));
  }, [id, dispatch]);

  useEffect(() => {
    window.addEventListener('focus', handleWindowFocus);

    return () => window.removeEventListener('focus', handleWindowFocus);
  }, []);

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
                          dispatch(
                            addChatBotBubble(
                              {
                                query: button.label,
                                id,
                                bidNo,
                                bidType,
                                maxContextCount:
                                  flags[featureFlags.CHATBOT_CONTENT_COUNT]
                              },
                              () => setDisableFooter(false)
                            )
                          )
                      })) || []
                    }
                    className="chat-bot-bubble"
                  >
                    {bubble.variant.startsWith('system') ? (
                      <MultiResponseChat
                        list={
                          Array.isArray(bubble?.info?.result)
                            ? bubble?.info?.result
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
              disabled={disableFooter || fetchingHistory}
              onSendClick={() => {
                if (!inputRef.current.value) {
                  return;
                }
                setDisableFooter(true);
                setInputText('');
                dispatch(
                  addChatBotBubble(
                    {
                      query: inputRef.current.value,
                      id,
                      bidNo,
                      bidType,
                      maxContextCount: flags[featureFlags.CHATBOT_CONTENT_COUNT]
                    },
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
