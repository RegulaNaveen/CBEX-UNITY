import Typography from 'apollo-react/components/Typography';
import React, { useEffect, useState } from 'react';
import Checkbox from 'apollo-react/components/Checkbox';
import Switch from 'apollo-react/components/Switch';
import { TASKS } from '../../../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { doSearchAction } from '../../../../redux/actions/search-actions';
import { selectIsOpen, selectQuery } from '../../../../redux/selectors/search';
import { useCallback } from 'react';
import { selectCanTaskReorder } from '../../../../redux/selectors/tasks';
import { toggleCanReorder } from '../../../../redux/actions/tasksList-actions';
import { getSelectedBid } from '../../../../redux/selectors';

const Header = () => {
  const dispatch = useDispatch();
  const selectedBid = useSelector(getSelectedBid).toJS();
  const isOpen = useSelector(selectIsOpen);
  const query = useSelector(selectQuery);
  const canReorder = useSelector(selectCanTaskReorder);

  const editable = selectedBid.isEditable;
  const showMine = useSelector(state => state.tasks.showMine);

  const handleChange = event => {
    dispatch({
      type: TASKS.TOGGLE_SHOW_MINE,
      payload: event.target.checked
    });
    handleReorderToggle(false);
    {
      isOpen && query && dispatch(doSearchAction());
    }
  };

  const handleReorderToggle = useCallback(toggleValue => {
    dispatch(toggleCanReorder(toggleValue));
  }, []);

  useEffect(() => {
    handleReorderToggle(false);
  }, [editable]);

  return (
    <div className="header">
      <Typography variant="h3">Task List</Typography>
      <div className="right-box">
        {editable && (
          <div className="switch-wrapper">
            <Switch
              className="switch"
              label={null}
              checked={canReorder}
              onChange={() => handleReorderToggle(!canReorder)}
              size="small"
              disabled={showMine}
            />
            <Typography variant="body1" className="label">
              Reorder
            </Typography>
          </div>
        )}
        <Checkbox
          label="Show Mine"
          checked={showMine}
          onChange={handleChange}
          style={{ marginTop: '5px' }}
        />
      </div>
    </div>
  );
};

export default Header;
