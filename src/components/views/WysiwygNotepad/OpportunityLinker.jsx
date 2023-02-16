import { Mark, markPasteRule, markInputRule } from '@tiptap/core';

const OpportunityLinker = Mark.create({
  name: 'opportunityLinker',
  addAttributes() {
    return {
      href: {
        renderHTML: attributes => {
          return {
            target: '_blank',
            href: attributes.href
          };
        }
      }
    };
  },
  renderHTML(opts) {
    return ['a', opts.HTMLAttributes, 0];
  },
  addInputRules() {
    return [
      markInputRule({
        find: /(?:^|\s)([A-Z]{3}[0-9]{5}\s)$/,
        type: this.type,
        getAttributes: match => {
          return {
            href: `${window.location.origin}/opportunities/${match[0]}`
          };
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
          return {
            href: `${window.location.origin}/opportunities/${match[0]}`
          };
        }
      })
    ];
  }
});
export default OpportunityLinker;
