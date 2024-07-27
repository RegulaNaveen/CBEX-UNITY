import { Mark, mergeAttributes } from '@tiptap/core';

export function extractTextFromDoc(
  doc,
  refs = { texts: [], mentionIndices: [], offset: 0 }
) {
  if (doc.type && doc.type.name === 'hardBreak') {
    refs.texts.push(' ');
    refs.offset += 1;
  }
  if (doc.type && doc.type.name === 'listItem') {
    refs.texts.push('  ');
    refs.offset += 2;
  }
  if (doc.type && doc.type.name === 'horizontalRule') {
    refs.texts.push(' ');
    refs.offset += 1;
  }
  if (doc.type && doc.type.name === 'text') {
    refs.texts.push(doc.text);
    refs.offset += doc.text.length;
    return;
  } else if (
    typeof doc === 'object' &&
    doc.type &&
    doc.type.name === 'mention'
  ) {
    if (doc.attrs && doc.attrs.label) {
      refs.texts.push(doc.attrs.label);
      refs.mentionIndices.push({
        from: refs.offset + 1,
        to: refs.offset + doc.attrs.label.length + 1
      });
      refs.offset += doc.attrs.label.length;
    }
    return;
  } else if (typeof doc === 'object' && Array.isArray(doc.content)) {
    doc.content.forEach(content => {
      extractTextFromDoc(content, refs);
    });
    if (doc.type && doc.type.name === 'listItem') {
      refs.texts.push('  ');
      refs.offset += 2;
    }
  } else if (typeof doc === 'object' && typeof doc.content === 'object') {
    extractTextFromDoc(doc.content, refs);
  }

  if (
    doc.type &&
    (doc.type.name === 'paragraph' ||
      doc.type.name === 'heading' ||
      doc.type.name === 'bulletList' ||
      doc.type.name === 'orderedList')
  ) {
    refs.texts.push('  ');
    refs.offset += 2;
  }

  return refs;
}

export const SearchHighlight = Mark.create({
  name: 'searchHighlight',
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'search-highlight'
      },
      enable: false
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span',
        skip: !this.options.enable
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      this.options.enable
        ? mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
        : HTMLAttributes,
      0
    ];
  },
  addCommands() {
    // can, chain, commands, dispatch, editor, view, tr, state
    return {
      search: (query, index) => ({ state, chain }) => {
        if (this.options.enable && query.length > 0) {
          chain()
            .selectAll()
            .unsetMark(this.name);
          const { texts, mentionIndices } = extractTextFromDoc(state.doc);
          let results = [];
          let matchResults = [
            ...texts
              .join('')
              .matchAll(
                new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
              )
          ];
          matchResults.forEach(match => {
            let originalSelection = {
              from: match['index'] + 1,
              to: match['index'] + 1 + match[0].length
            };
            let selection = {
              from: match['index'] + 1,
              to: match['index'] + 1 + match[0].length
            };
            console.log({ originalSelection, selection });
            for (let i = 0; i < mentionIndices.length; i++) {
              if (originalSelection.from > mentionIndices[i].to) {
                let newSelection = {
                  from:
                    selection.from -
                    (mentionIndices[i].to - mentionIndices[i].from) +
                    1,
                  to:
                    selection.to -
                    (mentionIndices[i].to - mentionIndices[i].from) +
                    1
                };
                selection = newSelection;
              }
              if (
                originalSelection.from < mentionIndices[i].from &&
                originalSelection.to > mentionIndices[i].from
              ) {
                let newSelection = {
                  from: selection.from,
                  to:
                    selection.to -
                    (mentionIndices[i].to - mentionIndices[i].from) +
                    1
                };
                selection = newSelection;
              }
              if (
                originalSelection.from >= mentionIndices[i].from &&
                originalSelection.to <= mentionIndices[i].to
              ) {
                let newSelection = { ...selection };
                newSelection.from =
                  mentionIndices[i].from -
                  (originalSelection.from - selection.from);
                newSelection.to =
                  mentionIndices[i].from -
                  (originalSelection.from - selection.from) +
                  1;
                selection = { ...newSelection };
              }
              if (
                originalSelection.from < mentionIndices[i].from &&
                originalSelection.to > mentionIndices[i].from &&
                originalSelection.to <= mentionIndices[i].to
              ) {
                let newSelection = { ...selection };
                newSelection.from = selection.from;
                newSelection.to =
                  mentionIndices[i].from -
                  (originalSelection.from - selection.from) +
                  1;
                selection = { ...newSelection };
              }
              if (
                originalSelection.from >= mentionIndices[i].from &&
                originalSelection.from < mentionIndices[i].to &&
                originalSelection.to > mentionIndices[i].to
              ) {
                let newSelection = { ...selection };
                newSelection.from =
                  mentionIndices[i].from -
                  (originalSelection.from - selection.from);
                newSelection.to =
                  selection.to -
                  (mentionIndices[i].to - mentionIndices[i].from) +
                  1;
                selection = { ...newSelection };
              }
            }
            results.push(selection);
          });
          if (index > -1 && results.length - 1 >= index) {
            // do highlight the selection in index
            chain()
              .setTextSelection(results[index])
              .setMark(this.name)
              .focus()
              .scrollIntoView();
          }
        }
        return true;
      },
      reset: () => ({ chain }) => {
        chain()
          .selectAll()
          .unsetMark(this.name);
      }
    };
  }
});
