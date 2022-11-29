import React, { useEffect, useState, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import Loader from 'apollo-react/components/Loader';
import getADUsers from '../../api/getADUsers';

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
      {`${item.first_name} ${item.last_name}(${item.email})`}
    </li>
  );
}

const TagUserList = ({ searchTag, onSelect, close, updateSearchTag }) => {
  const [fetchingUsers, setfetchingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  async function fetchUsers() {
    setfetchingUsers(true);
    if (searchTag !== null && searchTag.length > 0) {
      const usersList = await getADUsers(searchTag);
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
        <span
          style={{
            marginLeft: '0px',
            marginRight: '6px',
            position: 'relative',
            top: '15px',
            width: '20px'
          }}
        >
          <Loader
            isInner
            size={20}
            style={{
              width: '20px',
              height: '20px'
            }}
          />
        </span>
        <p>Fetching users...</p>
      </div>
    );
  }

  if (isEmpty(users)) {
    return null;
  }

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
