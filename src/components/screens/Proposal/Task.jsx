import React from 'react'

function Task() {
  const collapsed = true;
  return (
    <div className='task-wrapper'>
      <div className='task-icon'>{'>'}</div>
      {!collapsed ? 
      <div className='task-title-wrapper'>
        <div className='task-title'>
          Resources
        </div>
        <div className='task-status-wrapper'>
          <div className='task-status-description'>
            8 Incomplete
          </div>
        </div>
      </div> :
      <div className='task-table-wrapper'>
        <div className='task-table-headers'>
          <div className='task-title'>
            Resources
          </div>
          <div className='task-title'>
            Answer
          </div>
          <div className='task-title'>
            Owner
          </div>
          <div className='task-title'>
            Due Date
          </div>
          <div className='task-title'>
            Date Completed
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Task
