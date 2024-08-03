import {
  fetchChatHistoryApi,
  getHistoryItemById,
  sendDataTriggerApi,
  submitFeedbackApi
} from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';
import { welcomeBubble } from '../reducers/chatbot';
import { CHATBOT } from '../../constants/app';
import {
  selectChatBotBubbles,
  selectMessageWatchersMap
} from '../selectors/chatbot';
import { cloneDeep } from 'lodash';

const {
  ADD_CHATBOT_BUBBLE,
  UPDATE_CHATBOT_BUBBLE,
  SET_LOADING_STATE,
  UPDATE_BUBBLE,
  FETCHING_HISTORY,
  SET_CHATBOT_BUBBLES,
  SET_MESSAGE_WATCHERS_MAP
} = REDUX_TYPES.CHATBOT;

export function submitFeedback(feedback, callback = () => {}) {
  return async dispatch => {
    try {
      const response = await submitFeedbackApi(feedback);
      if (response.status === 200) {
        dispatch({ type: UPDATE_BUBBLE, payload: response.data });
      }
      return response;
    } catch (e) {
      return { statue: 500, message: 'Error submitting feedback' };
    } finally {
      callback();
    }
  };
}

export function fetchHistory(opportunityNumber) {
  console.log(`[CHATBOT] Fetching chat history for ${opportunityNumber}`);
  return async (dispatch, getState) => {
    try {
      await dispatch({ type: FETCHING_HISTORY, payload: true });
      const response = await fetchChatHistoryApi(opportunityNumber);
      if (response && Array.isArray(response.data)) {
        if (response.data.length === 0) {
          await dispatch({
            type: SET_CHATBOT_BUBBLES,
            payload: [welcomeBubble]
          });
        } else {
          // Replace the existing bubbles with the chat history
          const history = [];
          response.data.reverse().forEach(bubble => {
            history.push({
              info: {
                id: bubble.id,
                feedback: bubble.feedback,
                is_ecoa_or_cd: bubble.is_ecoa_or_cd,
                ...bubble.response,
                result: {
                  ...((bubble.response &&
                    bubble.response.result &&
                    bubble.response.result) ||
                    {}),
                  result:
                    (bubble.response &&
                      bubble.response.result &&
                      bubble.response.result.result) ||
                    CHATBOT.DEFAULT_ERROR_REPLY
                }
              },
              variant: 'user',
              copyContent: bubble.user_query,
              children: bubble.user_query,
              sentOrReceivedAt:
                bubble.user_query_created_at !== null
                  ? new Date(bubble.user_query_created_at).getTime()
                  : null,
              replySuggestionMessage: '',
              isWelcomeBubble: false
            });
            history.push({
              info: {
                id: bubble.id,
                feedback: bubble.feedback,
                is_ecoa_or_cd: bubble.is_ecoa_or_cd,
                ...bubble.response,
                user_query: bubble.user_query,
                result: {
                  ...((bubble.response &&
                    bubble.response.result &&
                    bubble.response.result) ||
                    {}),
                  result:
                    (bubble.response &&
                      bubble.response.result &&
                      bubble.response.result.result) ||
                    CHATBOT.DEFAULT_ERROR_REPLY
                }
              },
              variant: 'system',
              copyContent:
                (bubble.response &&
                  bubble.response.result &&
                  bubble.response.result.result) ||
                CHATBOT.DEFAULT_ERROR_REPLY,
              children:
                (bubble.response &&
                  bubble.response.result &&
                  bubble.response.result.result) ||
                CHATBOT.DEFAULT_ERROR_REPLY,
              sentOrReceivedAt: bubble.response_received_at
                ? new Date(bubble.response_received_at).getTime()
                : new Date(bubble.created_at).getTime(),
              replySuggestionMessage: '',
              isWelcomeBubble: false
            });
          });
          await dispatch({ type: SET_CHATBOT_BUBBLES, payload: history });
          await dispatch({
            type: ADD_CHATBOT_BUBBLE,
            payload: welcomeBubble
          });
        }
      } else {
        await dispatch({ type: ADD_CHATBOT_BUBBLE, payload: welcomeBubble });
      }
    } catch (e) {
      console.log('[CHATBOT] Error fetching chat history: ', e);
    } finally {
      await dispatch({ type: FETCHING_HISTORY, payload: false });
    }
  };
}

export function sendDataTrigger({ opportunityNumber, bidNo, bidType }) {
  return async () => {
    try {
      const requestPayload = {
        opportunityNumber,
        bidNo,
        bidType
      };
      await sendDataTriggerApi(requestPayload);
    } catch (e) {
      console.error('[CHATBOT] Error sending data trigger: ', e);
    }
  };
}

export function handleChatBotQueryWSMsg(message) {
  return async (dispatch, getState) => {
    try {
      if (message.query_id) {
        const bubbles = await selectChatBotBubbles(getState());
        if (
          bubbles.findIndex(
            bubble =>
              bubble && bubble.info && bubble.info.id === message.query_id
          ) > -1
        ) {
          return;
        }
        const sentOrReceivedAt = new Date(Number(message.query_created_at));
        await dispatch({
          type: ADD_CHATBOT_BUBBLE,
          payload: {
            info: {
              id: message.query_id,
              feedback: ''
            },
            variant: 'user',
            copyContent: message.query,
            children: message.query,
            sentOrReceivedAt:
              sentOrReceivedAt !== 'Invalid Date'
                ? sentOrReceivedAt
                : Date.now(),
            isWelcomeBubble: false
          }
        });
        await dispatch({ type: SET_LOADING_STATE, payload: true });
      }
    } catch (e) {
      console.error('[CHATBOT] Error handling chatbot query WS message: ', e);
    }
  };
}

export function addResponseToChat(responseData) {
  return async (dispatch, getState) => {
    try {
      const bubbles = await selectChatBotBubbles(getState());
      const messageWatchersMap = cloneDeep(
        selectMessageWatchersMap(getState())
      );
      if (messageWatchersMap && messageWatchersMap[responseData.id]) {
        clearTimeout(messageWatchersMap[responseData.id]);
        console.info(
          `[CHATBOT] Removed message watcher for ${responseData.id}`
        );
        delete messageWatchersMap[responseData.id];
        await dispatch({
          type: SET_MESSAGE_WATCHERS_MAP,
          payload: messageWatchersMap
        });
        console.info(
          `[CHATBOT] message watchers list: ${JSON.stringify(
            messageWatchersMap
          )}`
        );
      }
      const responseBubbleIndex = bubbles.findIndex(
        bubble =>
          bubble &&
          bubble.info &&
          bubble.info.id === responseData.id &&
          bubble.variant === 'system'
      );
      if (responseBubbleIndex > -1) {
        await dispatch({
          type: UPDATE_CHATBOT_BUBBLE,
          payload: {
            data: {
              variant: 'system',
              copyContent:
                (responseData &&
                  responseData.response &&
                  responseData.response.result &&
                  responseData.response.result.result) ||
                CHATBOT.DEFAULT_ERROR_REPLY,

              children:
                (responseData &&
                  responseData.response &&
                  responseData.response.result &&
                  responseData.response.result.result) ||
                CHATBOT.DEFAULT_ERROR_REPLY,
              sentOrReceivedAt: responseData.response_received_at
                ? new Date(responseData.response_received_at).getTime()
                : new Date(responseData.created_at).getTime(),
              info: {
                id: responseData.id,
                feedback: responseData.feedback,
                is_ecoa_or_cd: responseData.is_ecoa_or_cd,
                ...responseData.response
              }
            },
            index: responseBubbleIndex
          }
        });
      } else {
        await dispatch({
          type: ADD_CHATBOT_BUBBLE,
          payload: {
            variant: 'system',
            copyContent:
              (responseData &&
                responseData.response &&
                responseData.response.result &&
                responseData.response.result.result) ||
              CHATBOT.DEFAULT_ERROR_REPLY,

            children:
              (responseData &&
                responseData.response &&
                responseData.response.result &&
                responseData.response.result.result) ||
              CHATBOT.DEFAULT_ERROR_REPLY,
            sentOrReceivedAt: responseData.response_received_at
              ? new Date(responseData.response_received_at)
              : new Date(responseData.created_at).getTime(),
            info: {
              id: responseData.id,
              feedback: responseData.feedback,
              is_ecoa_or_cd: responseData.is_ecoa_or_cd,
              user_query: responseData.user_query,
              ...responseData.response
            }
          }
        });
      }
    } catch (e) {
      console.log('[CHATBOT] Error adding response to chat: ', e);
    }
  };
}

function onWatchTimeout(messageId, userQuery) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const messageWatchersMap = cloneDeep(selectMessageWatchersMap(state));
      if (messageWatchersMap && messageWatchersMap[messageId]) {
        clearTimeout(messageWatchersMap[messageId]);
        console.info(`[CHATBOT] Removed message watcher for ${messageId}`);
        delete messageWatchersMap[messageId];
        await dispatch({
          type: SET_MESSAGE_WATCHERS_MAP,
          payload: messageWatchersMap
        });
        console.info(
          `[CHATBOT] message watchers list: ${JSON.stringify(
            messageWatchersMap
          )}`
        );
      }
      const bubbles = cloneDeep(selectChatBotBubbles(state));
      const userBubbleIndex = bubbles.findIndex(
        bubble =>
          bubble &&
          bubble.info &&
          bubble.info.id === messageId &&
          bubble.variant === 'user'
      );
      if (userBubbleIndex > -1) {
        const queryResponse = await getHistoryItemById(messageId);
        const response = (queryResponse &&
          queryResponse.data &&
          queryResponse.data.response) || {
          result: {
            result: [
              {
                result: CHATBOT.RESTART_DISCLAIMER
              }
            ]
          }
        };
        bubbles.splice(userBubbleIndex + 1, 0, {
          variant: 'system',
          copyContent: CHATBOT.DEFAULT_ERROR_REPLY,
          children: CHATBOT.DEFAULT_ERROR_REPLY,
          sentOrReceivedAt: Date.now(),
          info: {
            id: messageId,
            feedback: '',
            user_query: userQuery,
            ...response
          }
        });
        await dispatch({ type: SET_CHATBOT_BUBBLES, payload: bubbles });
      }
      await dispatch({ type: SET_LOADING_STATE, payload: false });
    } catch (e) {
      console.info('[CHATBOT] Error in handle message wacth timeout' + e);
    }
  };
}

export function attachWatcher(messageId, userQuery) {
  return async (dispatch, getState) => {
    try {
      console.info(`[CHATBOT] Attaching watcher for message id: ${messageId}`);
      const state = getState();
      const bubbles = selectChatBotBubbles(state);
      const userBubbleIndex = bubbles.findIndex(
        bubble =>
          bubble &&
          bubble.info &&
          bubble.info.id === messageId &&
          bubble.variant === 'user'
      );
      if (userBubbleIndex > -1) {
        const messageWatchersMap = cloneDeep(selectMessageWatchersMap(state));
        if (messageWatchersMap && !messageWatchersMap[messageId]) {
          messageWatchersMap[messageId] = setTimeout(
            () => dispatch(onWatchTimeout(messageId, userQuery)),
            CHATBOT.MESSAGE_WATCHER_TIMEOUT
          );
          dispatch({
            type: SET_MESSAGE_WATCHERS_MAP,
            payload: messageWatchersMap
          });
          console.info(
            `[CHATBOT] watcher for message id: ${messageId} attached`
          );
        }
      } else {
        console.info(`[CHATBOT] message id: ${messageId} not found`);
      }
    } catch (e) {
      console.log(`[CHATBOT] Error attaching watcher to ${messageId} ` + e);
    }
  };
}
