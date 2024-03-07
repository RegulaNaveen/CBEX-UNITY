import Typography from 'apollo-react/components/Typography';
import React, { useState } from 'react';
import Checkbox from 'apollo-react/components/Checkbox';
import { TASKS } from '../../../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { doSearchAction } from '../../../../redux/actions/search-actions';
import { selectIsOpen, selectQuery } from '../../../../redux/selectors/search';

const Header = () => {
  const [showMine, setShowMine] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const query = useSelector(selectQuery);
  const handleChange = event => {
    dispatch({
      type: TASKS.TOGGLE_SHOW_MINE,
      payload: event.target.checked
    });
    {
      isOpen && query && dispatch(doSearchAction());
    }
    setShowMine(event.target.checked);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }}
    >
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
