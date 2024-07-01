import jwt_decode from 'jwt-decode';
import {
  fetchChatBotReplyApi,
  fetchChatHistoryApi,
  submitFeedbackApi
} from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';
import { welcomeBubble } from '../reducers/chatbot';
import { CHATBOT } from '../../constants/app';
import { getAccessTokenFromLocalStorage } from '../../SessionHandler';
import moment from 'moment';

const {
  ADD_CHATBOT_BUBBLE,
  SET_LOADING_STATE,
  UPDATE_BUBBLE,
  FETCHING_HISTORY,
  SET_CHATBOT_BUBBLES
} = REDUX_TYPES.CHATBOT;

function extractContext(bubbles, maxNumOfCount) {
  const context = [];
  let count = 0;
  if (!bubbles) return context;
  for (let i = bubbles.length - 1; i > 0; i--) {
    if (count >= maxNumOfCount) break;

    const bubble = bubbles[i];
    if (bubble.variant === 'user') {
      context.push({
        question: bubble.children,
        answer: bubbles[i + 1].children
      });
      count++;
    }
  }

  return context;
}

export function addChatBotBubble(
  { query: queryText, id: opportunityNumber, bidNo, bidType, maxContextCount },
  callback = () => {}
) {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING_STATE, payload: true }); // Set loading state to true
    const bubbles = getState().chatbot.bubbles;
    const context = extractContext(bubbles, maxContextCount);

    dispatch({
      type: ADD_CHATBOT_BUBBLE,
      payload: {
        variant: 'user',
        copyContent: queryText,
        children: queryText,
        sentOrReceivedAt: Date.now()
      }
    });

    const ERROR_DEFAULT_REPLY =
      'Unable to process your query. Please rephrase and try again.';
    let data;
    try {
      const params = {
        query: queryText,
        oppurtunity_no: opportunityNumber,
        context,
        bidNo: 1,
        bidType
      };
      if (bidNo && bidNo != 'undefined') {
        params.bidNo = parseInt(bidNo);
      }
      data = await fetchChatBotReplyApi(params);
    } catch (e) {
      data = e;
    } finally {
      const newBubble = {
        variant: 'system',
        copyContent: !data.error
          ? (data.response &&
              data.response.result &&
              data.response.result.result) ||
            ERROR_DEFAULT_REPLY
          : ERROR_DEFAULT_REPLY,
        children: !data.error
          ? (data.response &&
              data.response.result &&
              data.response.result.result) ||
            ERROR_DEFAULT_REPLY
          : ERROR_DEFAULT_REPLY,
        source_documents: !data.error ? data.source_documents || [] : [],
        sentOrReceivedAt: Date.now(),
        info: !data.error ? data : {},
        sourceDocs: data?.result?.source_documents || []
      };
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: newBubble });
      dispatch({ type: SET_LOADING_STATE, payload: false }); // Set loading state to false
      callback();
    }
  };
}

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

export function fetchHistory(opportunityNumber) {
  return async dispatch => {
    try {
      await dispatch({ type: FETCHING_HISTORY, payload: true });
      const response = await fetchChatHistoryApi(opportunityNumber);
      if (response && Array.isArray(response.data)) {
        if (response.data.length === 0) {
          await dispatch({ type: ADD_CHATBOT_BUBBLE, payload: welcomeBubble });
        } else {
          const history = [];
          response.data.forEach(bubble => {
            history.push({
              info: {
                id: bubble.id,
                feedback: bubble.feedback
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
                feedback: bubble.feedback
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
