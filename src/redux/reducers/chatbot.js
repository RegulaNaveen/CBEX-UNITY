import { REDUX_TYPES } from '../../constants';

const { SET_CHATBOT_BUBBLES, ADD_CHATBOT_BUBBLE } = REDUX_TYPES.CHATBOT;

export const welcomeBubble = {
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
  ],
  sentOrReceivedAt: Date.now()
};

const INITIAL_STATE = {
  bubbles: []
};

function onSetBubbles(state, action) {
  return {
    ...state,
    bubbles: action.payload
  };
}

function onAddBubble(state, action) {
  return {
    ...state,
    bubbles: [...state.bubbles, action.payload]
  };
}

const actionMap = {
  [SET_CHATBOT_BUBBLES]: onSetBubbles,
  [ADD_CHATBOT_BUBBLE]: onAddBubble
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
