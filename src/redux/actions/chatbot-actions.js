import { REDUX_TYPES } from '../../constants';

const { ADD_CHATBOT_BUBBLE } = REDUX_TYPES.CHATBOT;

export function addChatBotBubble(queryText, callback = () => {}) {
  return dispatch => {
    dispatch({
      type: ADD_CHATBOT_BUBBLE,
      payload: { variant: 'user', copyContent: queryText, children: queryText }
    });
    setTimeout(() => {
      const newBubble = {
        variant: 'systemWithContent',
        copyContent:
          'Lorem ipsum dolor sit amet. Eos sunt possimus sed mollitia voluptatem sit minima nobis. Ut sapiente asperiores sed atque corporis qui nesciunt quia eum atque voluptas hic quia aliquid qui eveniet quidem.',
        children:
          'Lorem ipsum dolor sit amet. Eos sunt possimus sed mollitia voluptatem sit minima nobis. Ut sapiente asperiores sed atque corporis qui nesciunt quia eum atque voluptas hic quia aliquid qui eveniet quidem.'
      };
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: newBubble });
      callback();
    }, 3000);
  };
}
