// @flow
import React from 'react';

import { ListView, CardView } from '../svg';

type Props = {
  isTypeCard: boolean,
  setTypeCard: Function
};

const SwitchView = (props: Props) => {
  const { isTypeCard, setTypeCard } = props;

  const activeColor = '#0256D2';
  const inactiveColor = '#999999';

  function handleListSelected() {
    setTypeCard(false);
  }

  function handleCardSelected() {
    setTypeCard(true);
  }

  return (
    <div className="switch-view">
      <button type="button" onClick={handleListSelected}>
        <ListView
          className="switch-view__icon"
          fill={!isTypeCard ? activeColor : inactiveColor}
        />
      </button>
      <button type="button" onClick={handleCardSelected}>
        <CardView
          className="switch-view__icon"
          fill={isTypeCard ? activeColor : inactiveColor}
        />
      </button>
    </div>
  );
};

export default SwitchView;
