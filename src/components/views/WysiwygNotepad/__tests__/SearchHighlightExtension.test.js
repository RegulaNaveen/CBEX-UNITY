import { extractTextFromDoc } from '../SearchHighlightExtension';
describe('extractTextFromDoc', () => {
  it('extractTextFromDoc', () => {
    const doc = [
      {
        type: {
          name: 'hardBreak'
        }
      },
      {
        type: {
          name: 'listItem'
        }
      },
      {
        type: {
          name: 'horizontalRule'
        }
      },
      {
        text: 'test',
        type: {
          name: 'text'
        }
      },
      {
        type: {
          name: 'mention'
        },
        attrs: {
          label: 'test'
        }
      },
      {
        type: {
          name: 'paragraph'
        }
      },
      {
        content: [
          {
            text: 'test',
            type: {
              name: 'text'
            }
          }
        ]
      },
      {
        content: {
          text: 'test',
          type: {
            name: 'text'
          }
        }
      }
    ];
    for (let index = 0; index < doc.length; index++) {
      const results = extractTextFromDoc(doc[index]);
      if (results) {
        const len = Object.keys(results).length;
        console.log('len', len);
        expect(len).toBeGreaterThan(0);
      }
    }
  });
});
