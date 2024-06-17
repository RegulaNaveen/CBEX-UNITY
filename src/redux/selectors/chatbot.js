const selectChatBot = state => {
  return state.chatbot;
};

export const selectChatBotBubbles = state => {
  return selectChatBot(state).bubbles;
};
