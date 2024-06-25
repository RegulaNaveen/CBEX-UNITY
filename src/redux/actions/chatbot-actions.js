import { fetchChatBotReplyApi } from '../../api/chatbot';
import { REDUX_TYPES } from '../../constants';

const { ADD_CHATBOT_BUBBLE } = REDUX_TYPES.CHATBOT;

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
  queryText,
  opportunityNumber,
  bidNo,
  callback = () => {}
) {
  return async (dispatch, getState) => {
    const bubbles = getState().chatbot.bubbles;
    const NUM_NUM_OF_BUBBLES = 2;
    const context = extractContext(bubbles, NUM_NUM_OF_BUBBLES);

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
      const params = {
        query: queryText,
        oppurtunity_no: opportunityNumber,
        context,
        bid_no: 1
      };
      if (bidNo && bidNo != 'undefined') {
        params.bid_no = bidNo;
      }
      data = await fetchChatBotReplyApi(params);
    } finally {
      const newBubble = {
        variant: 'system',
        copyContent:
          data?.result?.result || data?.result || ERROR_DEFAULT_REPLY,
        children: data?.result?.result || data?.result || ERROR_DEFAULT_REPLY,
        sentOrReceivedAt: Date.now(),
        sourceDocs: data?.result?.source_documents || []
      };
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: newBubble });
      callback();
    }
  };
}
