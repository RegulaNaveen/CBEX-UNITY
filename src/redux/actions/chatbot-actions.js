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
          "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. For best results, start a new topic when changing tasks or subjects. ",
        children:
          "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. For best results, start a new topic when changing tasks or subjects. ",
        replySuggestionMessage: 'Here are some things I can do:',
        buttonProps: [
          {
            label: 'Show me the eCOA recommended services'
          },
          {
            label: 'See Regulatory Updates'
          },
          {
            label: 'Continue last topic: Enrolling a new Patient'
          }
        ]
      };
      dispatch({ type: ADD_CHATBOT_BUBBLE, payload: newBubble });
      callback();
    }, 3000);
  };
}
