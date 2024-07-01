import { fetchChatBotReplyApi, submitFeedbackApi } from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';

const {
  ADD_CHATBOT_BUBBLE,
  SET_LOADING_STATE,
  UPDATE_BUBBLE
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
          ? data?.result || ERROR_DEFAULT_REPLY
          : ERROR_DEFAULT_REPLY,
        children: !data.error
          ? data?.result || ERROR_DEFAULT_REPLY
          : ERROR_DEFAULT_REPLY,
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
