// @flow
import React from 'react'

function ProposalInfo() {
  return (
    <div className='proposalInfo-wrapper'>
      <div className='proposalInfo-title'>
        RFP-1028
      </div>
      <div className='proposalInfo-subtitle'>
        Details
      </div>
      <div className='proposalInfo-details-wrapper'>
        <div className='proposalInfo-details-column'>
          <div className='proposalInfo-details-segment'>
            <div className='proposalInfo-details-data'>
              Account Executive:
            </div>
            <div className='proposalInfo-details-data'>
              Jan Levinson-Gould
            </div>
          </div>
          <div className='proposalInfo-details-segment'>
            <div className='proposalInfo-details-data'>
              Business Development:
            </div>
            <div className='proposalInfo-details-data'>
              Dwight Schrute
            </div>
          </div>
        </div>
        <div className='proposalInfo-details-column'>
          <div className='proposalInfo-details-segment'>
            <div className='proposalInfo-details-data'>
              Proposal Director: 
            </div>
            <div className='proposalInfo-details-data'>
              Michael Scott
            </div>
          </div>
          <div className='proposalInfo-details-segment'>
            <div className='proposalInfo-details-data'>
              Labs:
            </div>
            <div className='proposalInfo-details-data'>
              Kevin Malone
            </div>
          </div>
        </div>
        <div className='proposalInfo-details-column'>
          <div className='proposalInfo-details-row-segment'>
            <div className='proposalInfo-details-data'>
              Synopsis Sent:
            </div>
            <div className='proposalInfo-details-data'>
              Yes
            </div>
          </div>
          <div className='proposalInfo-details-row-segment'>
            <div className='proposalInfo-details-data'>
              Phase:
            </div>
            <div className='proposalInfo-details-data'>
              2
            </div>
          </div>
          <div className='proposalInfo-details-row-segment'>
            <div className='proposalInfo-details-data'>
              Number of Sites:
            </div>
            <div className='proposalInfo-details-data'>
              12
            </div>
          </div>
        </div>
        <div className='proposalInfo-details-column'>
          <div className='proposalInfo-details-segment'>
            <div className='proposalInfo-details-data'>
              Countries: 
            </div>
            <div className='proposalInfo-details-data'>
              France, UK, Italy, Spain
            </div>
          </div>
          <div className='proposalInfo-details-segment'>
            <div className='proposalInfo-details-data'>
              Indication:
            </div>
            <div className='proposalInfo-details-data'>
              Myopia
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalInfo
