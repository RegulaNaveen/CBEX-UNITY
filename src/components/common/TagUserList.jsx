import React, { useEffect, useState, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { CancelableADRequestApi } from '../../api/getADUsers';

function formatUser(user, query) {
  const name = `${user.first_name} ${user.last_name}`;
  const queryMatchResult = name.match(new RegExp(query, 'i'));
  if (queryMatchResult !== null) {
    const start = queryMatchResult['index'];
    const first = name.slice(0, start);
    const matched = name.slice(start, start + query.length);
    const last = name.slice(start + query.length, name.length);
    return [first, <b>{matched}</b>, last, `(${user.email})`];
  } else {
    return [name, `(${user.email})`];
  }
}

function TagUserListItem({ active, item, onClickHandler }) {
  const listItemRef = useRef(null);

  useEffect(() => {
    if (listItemRef.current && active) {
      listItemRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, [active]);

  return (
    <li
      ref={listItemRef}
      className={classNames('list-item', {
        active
      })}
      onClick={e => onClickHandler(e, item)}
      display-name={item.name}
      key={item.id}
      aria-hidden="true"
    >
      {item.formattedUser}
    </li>
  );
}

const TagUserList = ({ searchTag, onSelect, close }) => {
  const [fetchingUsers, setfetchingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  async function fetchUsers() {
    setfetchingUsers(true);
    if (searchTag !== null && searchTag.length > 0) {
      let usersList = await CancelableADRequestApi.getUsersByQuery(searchTag);
      usersList = usersList.map(user => ({
        ...user,
        formattedUser: formatUser(user, searchTag)
      }));
      console.log(usersList);
      setUsers(usersList);
    } else {
      setUsers([]);
    }
    setActiveOptionIndex(0);
    setfetchingUsers(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [searchTag]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownListener);
    return () => window.removeEventListener('keydown', handleKeyDownListener);
  }, [users]);

  function handleKeyDownListener(event) {
    if (users.length === 0) return;
    if (['Escape', 'Enter', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.code === 'Escape') {
      handleEscapeKeyPress();
      return;
    }

    if (event.code === 'Enter') {
      handleEnterKeyPress();
      return;
    }

    if (event.code === 'ArrowDown') {
      handleArrowKeyDownPress();
      return;
    }

    if (event.code === 'ArrowUp') {
      handleArrowKeyUpPress();
    }
  }

  function handleArrowKeyUpPress() {
    setActiveOptionIndex(prevActiveOptionIndex =>
      prevActiveOptionIndex > 0
        ? prevActiveOptionIndex - 1
        : prevActiveOptionIndex
    );
  }

  function handleArrowKeyDownPress() {
    setActiveOptionIndex(prevActiveOptionIndex =>
      prevActiveOptionIndex < users.length - 1
        ? prevActiveOptionIndex + 1
        : prevActiveOptionIndex
    );
  }

  function handleEnterKeyPress() {
    setActiveOptionIndex(activeIndex => {
      onSelect(users[activeIndex]);
      close();
      return 0;
    });
  }

  function handleEscapeKeyPress() {
    close();
  }

  const onClickHandler = async (e, user) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(user);
    close(); // callback func to close
  };

  if (fetchingUsers) {
    return (
      <div className="tag-user-list-loader">
        <p>Loading...</p>
      </div>
    );
  }

  if (isEmpty(users)) {
    return null;
  }

  // Can be enhanced with Popper component
  return (
    <ul className="tag-user-list">
      {users.map((item, index) => (
        <TagUserListItem
          item={item}
          active={activeOptionIndex === index}
          onClickHandler={onClickHandler}
          key={`tag-user-item-${index + 1}`}
        />
      ))}
    </ul>
  );
};

export default TagUserList;
