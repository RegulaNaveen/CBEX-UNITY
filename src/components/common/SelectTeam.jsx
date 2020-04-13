// @flow
import React from 'react';
import closeCircleIcon from '../../../img/close.svg';

type Props = {
  id?: string,
  onClick: Function,
  onKeyPress: Function,
  children: string
};

const SelectTeam = ({ id, onClick, onKeyPress, children }: Props) => {
  return (
    <div className="selected-team-wrapper">
      <p className="selected-team-title">{children}</p>
      <button
        id={id}
        className="close-img-icon"
        onClick={onClick}
        onKeyPress={onKeyPress}
        type="button"
        tabIndex={0}
      >
        <img src={closeCircleIcon} alt="close" />
      </button>
    </div>
  );
};

SelectTeam.defaultProps = {
  id: undefined
};

export default SelectTeam;
