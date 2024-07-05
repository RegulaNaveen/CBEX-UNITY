import jwt_decode from 'jwt-decode';
import {
  fetchChatBotReplyApi,
  fetchChatHistoryApi,
  sendDataTriggerApi,
  submitFeedbackApi
} from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';
import { welcomeBubble } from '../reducers/chatbot';
import { CHATBOT } from '../../constants/app';
import { getAccessTokenFromLocalStorage } from '../../SessionHandler';
import moment from 'moment';
import { selectChatBotBubbles } from '../selectors/chatbot';

const {
  ADD_CHATBOT_BUBBLE,
  SET_LOADING_STATE,
  UPDATE_BUBBLE,
  FETCHING_HISTORY,
  SET_CHATBOT_BUBBLES
} = REDUX_TYPES.CHATBOT;

export function submitFeedback(feedback, callback = () => {}) {
  return async dispatch => {
    try {
      const response = await submitFeedbackApi(feedback);
      if (response.status === 200) {
        dispatch({ type: UPDATE_BUBBLE, payload: response.data });
      }
      return response;
    } finally {
      callback();
    }
  };
}

export function fetchHistory(opportunityNumber, appendRecents = false) {
  return async (dispatch, getState) => {
    try {
      await dispatch({ type: FETCHING_HISTORY, payload: true });
      const response = await fetchChatHistoryApi(opportunityNumber);
      if (response && Array.isArray(response.data)) {
        if (response.data.length === 0 && !appendRecents) {
          await dispatch({ type: ADD_CHATBOT_BUBBLE, payload: welcomeBubble });
        } else {
          // Append chat history to the existing bubbles
          if (appendRecents) {
            const lastChat = await selectChatBotBubbles(getState()).pop();
            if (lastChat && lastChat.info && lastChat.info.id) {
              const history = [];
              response.data.forEach(bubble => {
                if (new Date(bubble.created_at) > lastChat.sentOrReceivedAt) {
                  history.push({
                    info: {
                      id: bubble.id,
                      feedback: bubble.feedback,
                      is_ecoa_or_cd: bubble.is_ecoa_or_cd,
                      ...bubble.response
                    },
                    variant: 'user',
                    copyContent: bubble.user_query,
                    children: bubble.user_query,
                    sentOrReceivedAt: new Date(bubble.created_at).getTime(),
                    replySuggestionMessage: '',
                    isWelcomeBubble: false
                  });
                  history.push({
                    info: {
                      id: bubble.id,
                      feedback: bubble.feedback,
                      is_ecoa_or_cd: bubble.is_ecoa_or_cd,
                      ...bubble.response
                    },
                    variant: 'system',
                    copyContent:
                      (bubble.response &&
                        bubble.response.result &&
                        bubble.response.result.result) ||
                      CHATBOT.CHATBOT.DEFAULT_ERROR_REPLY,
                    children:
                      (bubble.response &&
                        bubble.response.result &&
                        bubble.response.result.result) ||
                      CHATBOT.CHATBOT.DEFAULT_ERROR_REPLY,
                    sentOrReceivedAt: new Date(bubble.created_at).getTime(),
                    replySuggestionMessage: '',
                    isWelcomeBubble: false
                  });
                }
              });
              await Promise.all(
                history.map(item =>
                  dispatch({ type: ADD_CHATBOT_BUBBLE, payload: item })
                )
              );
            }
          } else {
            // Replace the existing bubbles with the chat history
            const history = [];
            response.data.forEach(bubble => {
              history.push({
                info: {
                  id: bubble.id,
                  feedback: bubble.feedback,
                  is_ecoa_or_cd: bubble.is_ecoa_or_cd,
                  ...bubble.response
                },
                variant: 'user',
                copyContent: bubble.user_query,
                children: bubble.user_query,
                sentOrReceivedAt: new Date(bubble.created_at).getTime(),
                replySuggestionMessage: '',
                isWelcomeBubble: false
              });
              history.push({
                info: {
                  id: bubble.id,
                  feedback: bubble.feedback,
                  is_ecoa_or_cd: bubble.is_ecoa_or_cd,
                  ...bubble.response
                },
                variant: 'system',
                copyContent:
                  (bubble.response &&
                    bubble.response.result &&
                    bubble.response.result.result) ||
                  CHATBOT.CHATBOT.DEFAULT_ERROR_REPLY,
                children:
                  (bubble.response &&
                    bubble.response.result &&
                    bubble.response.result.result) ||
                  CHATBOT.CHATBOT.DEFAULT_ERROR_REPLY,
                sentOrReceivedAt: new Date(bubble.created_at).getTime(),
                replySuggestionMessage: '',
                isWelcomeBubble: false
              });
            });
            await dispatch({ type: SET_CHATBOT_BUBBLES, payload: history });
            const lastHistory = history[history.length - 1];
            const tokenInfo = jwt_decode(getAccessTokenFromLocalStorage());
            const isLastChatHappenedInCurrentSession = moment(
              new Date(lastHistory.sentOrReceivedAt)
            ).isBetween(
              moment(new Date(tokenInfo.auth_time * 1000)),
              moment(new Date(tokenInfo.exp * 1000))
            );
            if (!isLastChatHappenedInCurrentSession) {
              await dispatch({
                type: ADD_CHATBOT_BUBBLE,
                payload: welcomeBubble
              });
            }
          }
        }
      } else {
        if (!appendRecents) {
          await dispatch({ type: ADD_CHATBOT_BUBBLE, payload: welcomeBubble });
        }
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
