// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

type Props = {
  elements: Array<{| tabName: string, notifications?: number |}>,
  selectedView: string,
  onChangeView: (selectedView: string) => void
};

const TabButtons = ({ elements, selectedView, onChangeView }: Props) => {
  function handleActive({ target }: SyntheticInputEvent<EventTarget>) {
    const { id } = target;
    onChangeView(id);
  }

  return (
    <div
      className="tab-buttons"
      style={{
        width: elements.length * 150,
        gridTemplateColumns: `repeat(${elements.length}, 1fr)`
      }}
    >
      {elements.map(({ tabName, notifications }) => (
        <button
          key={uuidv4()}
          id={tabName}
          type="button"
          className={classNames('button', {
            'is-active': selectedView === tabName
          })}
          onClick={handleActive}
        >
          {tabName}
          {notifications && notifications > 0 ? (
            <span className="notification">{notifications}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
