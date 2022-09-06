import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';

import MentionList from './MentionList.jsx';

export default {
  items: ({ query }) => {
    return [
      { id: 'Lea@.comThompson', label: 'Lea Thompson' },
      { id: 'Cyndi@.comLauper', label: 'Cyndi Lauper' },
      { id: 'Tom@.comCruise', label: 'Tom Cruise' },
      { id: 'Jerry@.comHall', label: 'Jerry Hall' },
      { id: 'Joan@.comCollins', label: 'Joan Collins' },
      { id: 'Winona@.comRyder', label: 'Winona Ryder' },
      { id: 'Christina@.comApplegate', label: 'Christina Applegate' },
      { id: 'Alyssa@.comMilano', label: 'Alyssa Milano' }
    ];
    //   .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
    //   .slice(0, 5);
  },

  render: () => {
    let component;
    let popup;

    return {
      onStart: props => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start'
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      }
    };
  }
};
