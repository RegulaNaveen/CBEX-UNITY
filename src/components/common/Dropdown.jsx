// @flow
import React from 'react';

type Props = {
  id?: string,
  title: string,
  listOpen: boolean,
  items: Array<Object>,
  onClick: Function
};

const Dropdown = ({ id, title, listOpen, items, onClick }: Props) => {
  return (
    <div className="dd-wrapper">
      <div id={id} className="dd-header" role="presentation" onClick={onClick}>
        <div className="dd-header-title">{title}</div>
      </div>
      {listOpen && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  id: undefined
};

export default Dropdown;
