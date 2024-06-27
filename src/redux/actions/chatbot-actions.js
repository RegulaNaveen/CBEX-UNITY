import { fetchChatBotReplyApi } from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';

const { ADD_CHATBOT_BUBBLE, SET_LOADING_STATE } = REDUX_TYPES.CHATBOT;

export function addChatBotBubble(
  { query: queryText, id: opportunityNumber, bidNo, bidType },
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
      'Unable to process your query. Please rephrase and try again';
    let data;
    try {
      data = await fetchChatBotReplyApi({
        query: queryText,
        oppurtunity_no: opportunityNumber,
        bidNo,
        bidType
      });
    } finally {
      const newBubble = {
        variant: 'system',
        copyContent: !data.error
          ? data.response || ERROR_DEFAULT_REPLY
          : ERROR_DEFAULT_REPLY,
        children: !data.error
          ? data.response || ERROR_DEFAULT_REPLY
          : ERROR_DEFAULT_REPLY,
        sentOrReceivedAt: Date.now(),
        info: !data.error ? data : {}
      };
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: newBubble });
      dispatch({ type: SET_LOADING_STATE, payload: false }); // Set loading state to false
      callback();
    }
  };
}
