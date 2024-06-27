import { fetchChatBotReplyApi } from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';

const { ADD_CHATBOT_BUBBLE, SET_LOADING_STATE } = REDUX_TYPES.CHATBOT;

export function addChatBotBubble(
  queryText,
  opportunityNumber,
  callback = () => {}
) {
  return async dispatch => {
    dispatch({ type: SET_LOADING_STATE, payload: true }); // Set loading state to true
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
      data = await fetchChatBotReplyApi(queryText, opportunityNumber);
    } finally {
      const newBubble = {
        variant: 'system',
        copyContent: data?.result?.result || ERROR_DEFAULT_REPLY,
        children: data?.result?.result || ERROR_DEFAULT_REPLY,
        sentOrReceivedAt: Date.now()
      };
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: newBubble });
      dispatch({ type: SET_LOADING_STATE, payload: false }); // Set loading state to false
      callback();
    }
  };
}
