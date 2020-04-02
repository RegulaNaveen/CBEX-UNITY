// @flow
import React from 'react'
import ProposalInfo from './ProposalInfo'
import TasksList from './TasksList'

const Proposal = () => {
  return (
    <div className='stuff'>
      This is the Proposal Screen
      <ProposalInfo/>
      <TasksList/>
    </div>
  )
}

export default Proposal
