import React, { Fragment } from 'react';
import { createMatomoObj, saveDataInMatomo } from '../../../utils/utils';

import MenuItem from './MenuItem';

export default ({ editor, trackEvent, proposalDetails, userEmail, userRole}) => {
  if (!editor) {
    return null;
  }
  const items = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => {
        editor
        .chain()
        .focus()
        .toggleBold()
        .run();
        const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'bold')
        saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive('bold')
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleItalic()
          .run();
        const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Italic')
        saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive('italic')
    },
    {
      icon: 'underline',
      title: 'Underline',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleUnderline()
          .run();
        const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'underline')
        saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive('underline')
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () =>{
        editor
        .chain()
        .focus()
        .toggleStrike()
        .run();
        const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Strike')
        saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive('strike')
    },
    {
      icon: 'align-center',
      title: 'Align Center',
      action: () =>{
        editor
        .chain()
        .focus()
        .setTextAlign('center')
        .run();
        const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'align-center')
        saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive({ textAlign: 'center' })
    },
    {
      icon: 'align-left',
      title: 'Align left',
      action: () =>{
        editor
          .chain()
          .focus()
          .setTextAlign('left')
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'align-left')
          saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive({ textAlign: 'left' })
    },
    {
      icon: 'align-right',
      title: 'Align right',
      action: () =>{
        editor
          .chain()
          .focus()
          .setTextAlign('right')
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'align-right')
          saveDataInMatomo(trackEvent, matamoObj);
      },        
      isActive: () => editor.isActive({ textAlign: 'right' })
    },
    {
      icon: 'subscript',
      title: 'Subscript',
      action: () =>{
          editor
          .chain()
          .focus()
          .toggleSubscript()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'subscript')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('subscript')
    },
    {
      icon: 'superscript',
      title: 'Superscript',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleSuperscript()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'superscript')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('superscript')
    },
    {
      icon: 'mark-pen-line',
      title: 'Highlight',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleHighlight()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Highlight')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('highlight')
    },
    {
      type: 'divider'
    },
    {
      icon: 'h-1',
      title: 'Heading 1',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Heading 1')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('heading', { level: 1 })
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Heading 2')
          saveDataInMatomo(trackEvent, matamoObj);
      },
      isActive: () => editor.isActive('heading', { level: 2 })
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () =>{
        editor
          .chain()
          .focus()
          .setParagraph()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'paragraph')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('paragraph')
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleBulletList()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Bullet List')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('bulletList')
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () =>{
        editor
          .chain()
          .focus()
          .toggleOrderedList()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Ordered List')
          saveDataInMatomo(trackEvent, matamoObj);
        },
      isActive: () => editor.isActive('orderedList')
    },
    {
      type: 'divider'
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () =>{
        editor
          .chain()
          .focus()
          .setHorizontalRule()
          .run()
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'separator')
          saveDataInMatomo(trackEvent, matamoObj);
      }
    },
    {
      type: 'divider'
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () =>{
        editor
          .chain()
          .focus()
          .setHardBreak()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'text-wrap')
          saveDataInMatomo(trackEvent, matamoObj);
      }
    },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      action: () =>{
        editor
          .chain()
          .focus()
          .clearNodes()
          .unsetAllMarks()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Clear Format')
          saveDataInMatomo(trackEvent, matamoObj);
      }
    },
    {
      type: 'divider'
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () =>{
        editor
          .chain()
          .focus()
          .undo()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Undo')
          saveDataInMatomo(trackEvent, matamoObj);
      }
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () =>{
        editor
          .chain()
          .focus()
          .redo()
          .run();
          const matamoObj = createMatomoObj(proposalDetails, userEmail, userRole, 'Redo')
          saveDataInMatomo(trackEvent, matamoObj);
      }
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
