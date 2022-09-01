import React, { Fragment } from 'react';

import MenuItem from './MenuItem';

export default ({ editor }) => {
  if (!editor) {
    return null;
  }
  const items = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleBold()
          .run(),
      isActive: () => editor.isActive('bold')
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleItalic()
          .run(),
      isActive: () => editor.isActive('italic')
    },
    {
      icon: 'underline',
      title: 'Underline',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleUnderline()
          .run(),
      isActive: () => editor.isActive('underline')
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleStrike()
          .run(),
      isActive: () => editor.isActive('strike')
    },
    {
      icon: 'align-center',
      title: 'Align Center',
      action: () =>
        editor
          .chain()
          .focus()
          .setTextAlign('center')
          .run(),
      isActive: () => editor.isActive({ textAlign: 'center' })
    },
    {
      icon: 'align-left',
      title: 'Align left',
      action: () =>
        editor
          .chain()
          .focus()
          .setTextAlign('left')
          .run(),
      isActive: () => editor.isActive({ textAlign: 'left' })
    },
    {
      icon: 'align-right',
      title: 'Align right',
      action: () =>
        editor
          .chain()
          .focus()
          .setTextAlign('right')
          .run(),
      isActive: () => editor.isActive({ textAlign: 'right' })
    },
    {
      icon: 'subscript',
      title: 'Subscript',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleSubscript()
          .run(),
      isActive: () => editor.isActive('subscript')
    },
    {
      icon: 'superscript',
      title: 'Superscript',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleSuperscript()
          .run(),
      isActive: () => editor.isActive('superscript')
    },
    {
      icon: 'mark-pen-line',
      title: 'Highlight',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleHighlight()
          .run(),
      isActive: () => editor.isActive('highlight')
    },
    {
      type: 'divider'
    },
    {
      icon: 'h-1',
      title: 'Heading 1',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run(),
      isActive: () => editor.isActive('heading', { level: 1 })
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run(),
      isActive: () => editor.isActive('heading', { level: 2 })
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () =>
        editor
          .chain()
          .focus()
          .setParagraph()
          .run(),
      isActive: () => editor.isActive('paragraph')
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleBulletList()
          .run(),
      isActive: () => editor.isActive('bulletList')
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () =>
        editor
          .chain()
          .focus()
          .toggleOrderedList()
          .run(),
      isActive: () => editor.isActive('orderedList')
    },
    {
      type: 'divider'
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () =>
        editor
          .chain()
          .focus()
          .setHorizontalRule()
          .run()
    },
    {
      type: 'divider'
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () =>
        editor
          .chain()
          .focus()
          .setHardBreak()
          .run()
    },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      action: () =>
        editor
          .chain()
          .focus()
          .clearNodes()
          .unsetAllMarks()
          .run()
    },
    {
      type: 'divider'
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () =>
        editor
          .chain()
          .focus()
          .undo()
          .run()
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () =>
        editor
          .chain()
          .focus()
          .redo()
          .run()
    }
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? (
            <div className="divider" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
};
