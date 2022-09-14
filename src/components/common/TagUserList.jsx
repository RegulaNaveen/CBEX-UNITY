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

const TagUserList = forwardRef(({ searchTag, close }, ref) => {
  const { rangeRef, selectionRef, richTextEditorRef } = ref;

  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const onClickHandler = async e => {
    const tagName = e.target.getAttribute('display-name');
    const range = rangeRef.current;
    const { commonAncestorContainer, startOffset } = range;

    range.setStart(commonAncestorContainer, startOffset - searchTag.length - 1); // set start selection
    range.setEnd(commonAncestorContainer, startOffset); // set end selection
    window.getSelection().addRange(range);

    range.deleteContents(); // Delete selected text

    const newNode = document.createElement('u');
    newNode.innerHTML = `${tagName}`;
    range.insertNode(newNode); // Insert new tag

    // const selection = selectionRef.current;
    // selection.removeAllRanges(); // Remove selection

    await timeout(0);
    // Move the cursor after newNode
    // range.setStartAfter(newNode);
    // range.setEndAfter(newNode);
    // selection.addRange(range);

    // const richTextElement = richTextEditorRef.current;
    // richTextElement.focus();

    close(); // callback func to close
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
