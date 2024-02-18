import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from 'apollo-react/components/Checkbox';
import DragIcon from 'apollo-react-icons/Drag';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import EllipsisHorizontal from 'apollo-react-icons/EllipsisHorizontal';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import User2Icon from 'apollo-react-icons/User2';
import CalendarIcon from 'apollo-react-icons/Calendar';
import PencilIcon from 'apollo-react-icons/Pencil';
import TrashIcon from 'apollo-react-icons/Trash';
import classNames from 'classnames';
import Typography from 'apollo-react/components/Typography';

function OverflowEllipsis({ desc, show }) {
  return (
    <span
      className={classNames({
        ellipsis: true,
        show: show
      })}
    >
      <Tooltip placement="top" title={desc}>
        <EllipsisHorizontal />
      </Tooltip>
    </span>
  );
}

function ListItem({ index, task, openModal }) {
  const [overflowed, setOverflowed] = useState(false);
  const [descRef, setDescRef] = useState(null);

  const handleResize = useCallback(() => {
    if (descRef) {
      setOverflowed(descRef.clientHeight > 48);
    }
  }, [descRef]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      handleResize();
    });

    if (descRef) {
      resizeObserver.observe(descRef);
    }

    return () => {
      if (descRef) {
        resizeObserver.unobserve(descRef);
      }
    };
  }, [descRef]);

  const handleClick = label => () => {
    console.log(`You picked ${label}.`);
  };

  const handleSeeOwners = text => () => {
    openModal(task.task_id);
  };

  const menuItems = [
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <User2Icon fontSize="small" />
          <Typography className="menu-item-label">See Owners</Typography>
        </div>
      ),
      onClick: handleSeeOwners()
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <CalendarIcon fontSize="small" />
          <Typography className="menu-item-label">History</Typography>
        </div>
      ),
      onClick: handleClick('History'),
      disabled: true
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <PencilIcon fontSize="small" />
          <Typography className="menu-item-label">Edit</Typography>
        </div>
      ),
      onClick: handleClick('Edit')
    },
    {
      text: (
        <div className="task-list-menu-item-wrapper">
          <TrashIcon fontSize="small" />
          <Typography className="menu-item-label">Delete</Typography>
        </div>
      ),
      onClick: handleClick('Delete'),
      destructiveAction: true
    }
  ];

  return (
    <Draggable
      key={`drag-group-1-item-${index}`}
      draggableId={`drag-group-1-item-${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            className="task-item-drag-container"
            {...provided.draggableProps}
          >
            <span {...provided.dragHandleProps}>
              <DragIcon fontSize="small" />
            </span>
            <Checkbox
              checked={task.is_completed}
              style={{
                marginLeft: '0.01rem',
                marginTop: '-0.25rem'
              }}
            />
            <div className="task-desc">
              <p
                ref={_ref => setDescRef(_ref)}
                // className={classNames({
                // 'font-red':
                // tasksGroup.dayDiffFromToday < 0 &&
                // !task.is_completed,
                // 'font-bold': task.is_completed
                // })}
              >
                {task.description}
                <OverflowEllipsis show={overflowed} desc={task.description} />
              </p>
            </div>
            <Tooltip disableFocusListener id="task-list-menu-btn-tooltip">
              <IconMenuButton
                menuItems={menuItems}
                size="small"
                id="task-list-item-menu-btn"
              >
                <EllipsisVertical />
              </IconMenuButton>
            </Tooltip>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default ListItem;
