// @flow
import React from 'react';

import { List, Card } from '../svg/index';

type Props = {
  isTypeCard: boolean,
  setTypeCard: Function
};

const Switch = (props: Props) => {
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
    <div className="switch">
      <button type="button" onClick={handleListSelected}>
        <List
          className="switch__icon"
          fill={!isTypeCard ? activeColor : inactiveColor}
        />
      </button>
      <button type="button" onClick={handleCardSelected}>
        <Card
          className="switch__icon"
          fill={isTypeCard ? activeColor : inactiveColor}
        />
      </button>
    </div>
  );
};

export default Switch;
