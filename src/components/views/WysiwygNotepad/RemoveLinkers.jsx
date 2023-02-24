import { markPasteRule, markInputRule } from '@tiptap/core';
import Link from '@tiptap/extension-link';

const RemoveLinkers = Link.extend({
  name: 'opportunityLinker',
  renderHTML(opts) {
    return ['span', opts.HTMLAttributes, 0];
  },
  addInputRules() {
    return [
      markInputRule({
        find: /(?:^|\s)([A-Z]{3}[0-9]{5}\s)$/,
        type: this.type,
        getAttributes: match => {
          return {};
        }
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: /(?:^|\s)(([A-Z]{3}[0-9]{5}))/g,
        type: this.type,
        getAttributes: match => {
          return {};
        }
      })
    ];
  }
});
export default RemoveLinkers;
