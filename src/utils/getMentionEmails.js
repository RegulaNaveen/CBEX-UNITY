const getMentionEmails = editorJson => {
  const mentions = new Set();
  const flatten = item => {
    if (item.type === 'mention') {
      mentions.add(item.attrs.id);
    } else if (item.content?.length > 0) {
      item.content.forEach(i => {
        flatten(i);
      });
    }
  };
  flatten(editorJson);
  return Array.from(mentions);
};
export default getMentionEmails;
