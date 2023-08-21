import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import MentionList from './MentionList';
import getADUsers from '../../../api/getADUsers';
import { store } from '../../../store';
import { getSelectedBid } from '../../../redux/selectors';

export default {
  items: async ({ query }) => {
    let autoCompleteList = [];
    try {
      if (query.length >= 1) {
        const adUsers = await getADUsers(query);
        if (adUsers?.length > 0) {
          autoCompleteList = adUsers.map(user => {
            return {
              id: `${user.email?.toLowerCase() || ''}`,
              label: `${user.first_name || ''} ${user.last_name || ''}`,
              listOption: `${user.first_name || ''} ${user.last_name ||
                ''} (${user.email?.toLowerCase() || ''})`,
              emp_id: user.emp_id
            };
          });
        }
      }
      return autoCompleteList;
    } catch (error) {
      console.log('error in generating usernames for notes suggestion');
      console.error(error);
      return autoCompleteList;
    }
  },
  render: () => {
    let component;
    let popup;

    return {
      onStart: props => {
        props.proposalId = getSelectedBid(store.getState())?.get('id', '');
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
        // component.destroy();
      }
    };
  },
  allowSpaces: true
};
