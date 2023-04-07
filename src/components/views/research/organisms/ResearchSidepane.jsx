import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import ResearchSelector from '../molecules/ResearchSelector'
import '../style.scss'

export default function ResearchSidepane (props) {
  return (
    <>
      <div className="research-sidepane__wrapper">
        <div className='sidepaneHeader__container'>
          <h2> View Participant-specific Information </h2>
          <Divider />
        </div>
        <div className='tab__wrapper'>
          <ResearchSelector />
        </div>
      </div>
    </>
  )
}
