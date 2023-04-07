import { Divider } from 'semantic-ui-react'
import ResearchSelector from '../molecules/ParticipantSelector'
import '../style.scss'
import TabController from './TabController'
import ProfileCard from '../molecules/ParticipantSummary'

export default function ResearchSidepane (props) {
  return (
    <>
      <div className="research-sidepane__wrapper">
        <div className='sidepaneHeader__container'>
          <h2 style= {{ paddingLeft: '14px' }}> View Participant-specific Information </h2>
          <ResearchSelector />
          <Divider />
        </div>
        <div className='tab__wrapper'>
          <ProfileCard />
          <TabController />
        </div>
      </div>
    </>
  )
}
