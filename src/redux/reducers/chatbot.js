import { REDUX_TYPES } from '../../constants';

const {
  SET_CHATBOT_BUBBLES,
  ADD_CHATBOT_BUBBLE,
  SET_LOADING_STATE,
  UPDATE_BUBBLE,
  FETCHING_HISTORY
} = REDUX_TYPES.CHATBOT;

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
  sentOrReceivedAt: Date.now(),
  type: 'WELCOME_MSG'
};

const INITIAL_STATE = {
  bubbles: [],
  loading: false,
  fetchingHistory: false
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

function onLoading(state, action) {
  return {
    ...state,
    loading: action.payload
  };
}

function onUpdateBubble(state, action) {
  const { id, feedback } = action.payload;
  const bubbles = [...state.bubbles];
  const bubble = bubbles.find(b => b.info && b.info.id === id);
  if (bubble) {
    bubble.info.feedback = feedback;
  }
  return {
    ...state,
    bubbles
  };
}

function setFetchingHistory(state, action) {
  return {
    ...state,
    fetchingHistory: action.payload
  };
}

const actionMap = {
  [SET_CHATBOT_BUBBLES]: onSetBubbles,
  [ADD_CHATBOT_BUBBLE]: onAddBubble,
  [SET_LOADING_STATE]: onLoading,
  [UPDATE_BUBBLE]: onUpdateBubble,
  [FETCHING_HISTORY]: setFetchingHistory
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
