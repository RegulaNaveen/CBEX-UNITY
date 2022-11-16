import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import Loader from 'apollo-react/components/Loader';
import getADUsers from '../../api/getADUsers';

const TagUserList = ({ searchTag, onSelect, close }) => {
  const [fetchingUsers, setfetchingUsers] = useState(false);
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    setfetchingUsers(true);
    try {
      if (searchTag !== null && searchTag.length > 0) {
        const usersList = await getADUsers(searchTag);
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.log('Error in retrieving users');
      setUsers([]);
    } finally {
      if (searchTag !== true) {
        setfetchingUsers(false);
      }
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [searchTag]);

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
      {users.map((item, indx) => (
        <li
          className={classNames('list-item', { active: !indx })}
          onClick={e => onClickHandler(e, item)}
          display-name={item.name}
          key={item.id}
          aria-hidden="true"
        >
          {`${item.first_name} ${item.last_name}(${item.email})`}
        </li>
      ))}
    </ul>
  );
};

export default TagUserList;
