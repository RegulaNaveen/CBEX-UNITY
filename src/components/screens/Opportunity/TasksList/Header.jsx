import Typography from 'apollo-react/components/Typography';
import React, { useState } from 'react';
import Checkbox from 'apollo-react/components/Checkbox';
import { TASKS } from '../../../../constants/types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

const Header = () => {
  const [showMine, setShowMine] = useState(false);
  const dispatch = useDispatch();

  const handleChange = event => {
    dispatch({
      type: TASKS.TOGGLE_SHOW_MINE,
      payload: event.target.checked
    });
    setShowMine(event.target.checked);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h3">Task List</Typography>
      <Checkbox
        label="Show Mine"
        checked={showMine}
        onChange={handleChange}
        style={{ marginTop: '5px' }}
      />
    </div>
  );
};

export default Header;
