import { Divider } from 'semantic-ui-react'
import ResearchSelector from '../atoms/ParticipantSelector'
import '../style.scss'
import TabController from './TabController'
import ProfileCard from '../molecules/ActiveParticipantSummary'
import RangeSelector from '../atoms/RangeSelector'
import ParticipantTypeNotice from '../atoms/ParticipantTypeNotice'

export default function ResearchSidepane (props) {
  return (
    <>
      <div className="research-sidepane__wrapper">
        <div className='sidepaneHeader__container'>
          <h2 style= {{ paddingLeft: '14px' }}> View Participant-specific Information </h2>
          <ResearchSelector />
          <RangeSelector />
          <Divider />
        </div>
        <div className='tab__wrapper'>
          <ParticipantTypeNotice />
          <ProfileCard />
          <TabController />
        </div>
      </div>
    </>
  )
}
