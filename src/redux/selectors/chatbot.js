const selectChatBot = state => {
  return state.chatbot;
};

export const selectChatBotBubbles = state => {
  return selectChatBot(state).bubbles;
};

export const selectChatBotFetchingHistory = state => {
  return selectChatBot(state).fetchingHistory;
};
