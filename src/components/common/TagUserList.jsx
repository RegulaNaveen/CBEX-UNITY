import React, { forwardRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

const userList = [
  {
    id: 'u1095134',
    name: 'Sharma, Dheeraj EX1',
    email: 'Dheera.Sharma@iqvia.com'
  },
  {
    id: 'u1119585',
    name: 'Murrell, Kimberly',
    email: 'kimberly.murrell@iqvia.com'
  },
  {
    id: 'q762370',
    name: 'MK, Roopesh',
    email: 'Roopesh.MK@quintiles.com'
  }
];

const TagUserList = forwardRef(({ searchTag, close, onSelect }, ref) => {
  const { rangeRef, selectionRef, richTextEditorRef } = ref;

  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const onClickHandler = async (e, user) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(user.name);
    close(); // callback func to close
  };

  return (
    !isEmpty(userList) && (
      <ul className="tag-user-list">
        {userList.map((item, indx) => (
          <li
            className={classNames('list-item', { active: !indx })}
            onClick={(e) => onClickHandler(e, item)}
            display-name={item.name}
            key={item.id}
            aria-hidden="true"
          >
            {`${item.name} - ${item.email} (${item.id})`}
          </li>
        ))}
      </ul>
    )
  );
});

export default TagUserList;
