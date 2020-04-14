// @flow
import React from 'react';

type Props = {
  id?: string,
  placeholder: string,
  isCollapsed: boolean,
  items: Array<Object>,
  onClick: Function,
  title?: string
};

const Dropdown = ({
  id,
  placeholder,
  isCollapsed,
  items,
  onClick,
  title
}: Props) => {
  return (
    <>
      <p className="dd-title">{title}</p>
      <div className="dd-wrapper">
        <div
          id={id}
          className="dd-header"
          role="presentation"
          onClick={onClick}
        >
          <div className="dd-header-title">{placeholder}</div>
        </div>
        {isCollapsed && (
          <ul className="dd-list">
            {items.map(item => (
              <li className="dd-list-item" key={item.id}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

Dropdown.defaultProps = {
  id: undefined,
  title: undefined
};

export default Dropdown;
