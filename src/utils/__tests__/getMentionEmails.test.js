import getMentionEmails from '../getMentionEmails';

describe('getMentionEmails', () => {
  it('should return an empty array if editorJson is empty', () => {
    const editorJson = {};
    const result = getMentionEmails(editorJson);
    expect(result).toEqual([]);
  });

  it('should return an empty array if no mentions are found', () => {
    const editorJson = {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a test'
        }
      ]
    };
    const result = getMentionEmails(editorJson);
    expect(result).toEqual([]);
  });

  it('should return an array of unique mention emails', () => {
    const editorJson = {
      type: 'paragraph',
      content: [
        {
          type: 'mention',
          attrs: {
            id: 'user1'
          }
        },
        {
          type: 'mention',
          attrs: {
            id: 'user2'
          }
        },
        {
          type: 'mention',
          attrs: {
            id: 'user1'
          }
        }
      ]
    };
    const result = getMentionEmails(editorJson);
    expect(result).toEqual(['user1', 'user2']);
  });

  it('should handle nested content', () => {
    const editorJson = {
      type: 'paragraph',
      content: [
        {
          type: 'mention',
          attrs: {
            id: 'user1'
          }
        },
        {
          type: 'text',
          text: 'This is a test',
          content: [
            {
              type: 'mention',
              attrs: {
                id: 'user2'
              }
            }
          ]
        }
      ]
    };
    const result = getMentionEmails(editorJson);
    expect(result).toEqual(['user1', 'user2']);
  });
});
