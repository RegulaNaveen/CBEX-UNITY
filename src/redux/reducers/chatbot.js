import { cloneDeep } from 'lodash';
import { REDUX_TYPES } from '../../constants';

const {
  SET_CHATBOT_BUBBLES,
  ADD_CHATBOT_BUBBLE,
  UPDATE_CHATBOT_BUBBLE,
  SET_LOADING_STATE,
  UPDATE_BUBBLE,
  FETCHING_HISTORY,
  SET_MESSAGE_WATCHERS_MAP
} = REDUX_TYPES.CHATBOT;

export const welcomeBubble = {
  variant: 'systemWithContent',
  copyContent:
    "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. Be aware that I specialize in Unity's Clinical Bids; other bid types may result in incomplete responses. Please note that while I strive to provide helpful information, my responses are created using generative AI and may be inaccurate. ",
  children:
    "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. Be aware that I specialize in Unity's Clinical Bids; other bid types may result in incomplete responses. Please note that while I strive to provide helpful information, my responses are created using generative AI and may be inaccurate.",
  replySuggestionMessage: 'Here are some things I can do:',
  buttonProps: [
    {
      label: 'List relevant eCOA assessments'
    },
    {
      label: 'Provide overview of appropriate Connected Devices'
    },
    {
      label: 'Summarize this Opportunity'
    }
  ],
  sentOrReceivedAt: Date.now(),
  type: 'WELCOME_MSG',
  info: {
    result: {
      result:
        "Hello, I'm BidAssist, your AI-powered assistant, ready to help you create a proposal. Currently, I am able to read the following file types in Box.com: .doc, .docx, .pptx, & .pdf. Be aware that I specialize in Unity's Clinical Bids; other bid types may result in incomplete responses. Please note that while I strive to provide helpful information, my responses are created using generative AI and may be inaccurate."
    }
  }
};

const INITIAL_STATE = {
  bubbles: [],
  loading: false,
  fetchingHistory: false,
  messageWatchersMap: {}
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
  const bubbleIndex = bubbles.findIndex(
    b => b.info && b.info.id === id && b.variant === 'system'
  );
  if (bubbleIndex > -1) {
    bubbles[bubbleIndex].info.feedback = feedback;
  }
  return {
    ...state,
    bubbles: bubbles
  };
}

function setFetchingHistory(state, action) {
  return {
    ...state,
    fetchingHistory: action.payload
  };
}

function onUpdateChatbotBubble(state, action) {
  const { index, data } = action.payload;
  const bubbles = cloneDeep(state.bubbles);
  if (index > -1 && index <= bubbles.length - 1) {
    bubbles[index] = data;
  }

  return {
    ...state,
    bubbles
  };
}

function onSetMessageWatchersMap(state, action) {
  return {
    ...state,
    messageWatchersMap: action.payload
  };
}

const actionMap = {
  [SET_CHATBOT_BUBBLES]: onSetBubbles,
  [ADD_CHATBOT_BUBBLE]: onAddBubble,
  [SET_LOADING_STATE]: onLoading,
  [UPDATE_BUBBLE]: onUpdateBubble,
  [FETCHING_HISTORY]: setFetchingHistory,
  [UPDATE_CHATBOT_BUBBLE]: onUpdateChatbotBubble,
  [SET_MESSAGE_WATCHERS_MAP]: onSetMessageWatchersMap
};

export default function(state = INITIAL_STATE, action) {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
