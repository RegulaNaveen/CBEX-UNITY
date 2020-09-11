// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

type Props = {
  elements: Array<string>,
  selectedView: string,
  onChangeView: (selectedView: string) => void
};

const TabButtons = ({ elements, selectedView, onChangeView }: Props) => {
  function handleActive({ target }: SyntheticInputEvent<EventTarget>) {
    const { id } = target;
    onChangeView(id);
  }

  return (
    <div className="tab-buttons">
      {elements.map(item => (
        <button
          key={uuidv4()}
          id={item}
          type="button"
          className={classNames('button', {
            'is-active': selectedView === item
          })}
          onClick={handleActive}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
