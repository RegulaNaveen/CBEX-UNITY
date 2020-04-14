// @flow
import React from 'react';
import CloseCircle from '../svg/CloseCircle';

type Props = {
  onClick: Function,
  children: string
};

const SelectTeam = ({ onClick, children }: Props) => {
  return (
    <div className="selected-team-wrapper">
      <p className="selected-team-title">{children}</p>
      <div className="delete-team-icon" role="presentation" onClick={onClick}>
        <CloseCircle className="close-icon" />
      </div>
    </div>
  );
};

export default SelectTeam;
