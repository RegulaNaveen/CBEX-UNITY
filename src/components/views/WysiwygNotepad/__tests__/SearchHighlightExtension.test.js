import {
  SearchHighlight,
  extractTextFromDoc
} from '../SearchHighlightExtension';
describe('extractTextFromDoc', () => {
  it('SearchHighlight', () => {
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
