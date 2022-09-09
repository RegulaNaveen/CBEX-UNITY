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

const TagUserList = forwardRef((props, ref) => {
  const { rangeRef, searchTagRef } = ref;

  const onClickHandler = e => {
    const tagName = e.target.getAttribute('display-name');
    const refRange = rangeRef.current;
    const { commonAncestorContainer, startOffset } = refRange;
    // set start selection
    refRange.setStart(
      commonAncestorContainer,
      startOffset - searchTagRef.current.length
    );
    // set end selection
    refRange.setEnd(commonAncestorContainer, startOffset);
    window.getSelection().addRange(refRange);
    // Delete selected text
    refRange.deleteContents();
    // Insert new tag
    const newNode = document.createElement('u');
    newNode.innerHTML = `${tagName} `;
    refRange.insertNode(newNode);
    // Remove selection
    window.getSelection().removeAllRanges();
  };

  return (
    !isEmpty(userList) && (
      <ul className="tag-user-list">
        {userList.map((item, indx) => (
          <li
            className={classNames('list-item', { active: !indx })}
            onClick={onClickHandler}
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
