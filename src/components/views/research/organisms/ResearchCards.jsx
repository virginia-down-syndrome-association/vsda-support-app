import { Segment } from 'semantic-ui-react'
import DefaultCard from '../molecules/DefaultCard'
import ProfileCard from '../molecules/ParticipantSummary'
import MedicalCard from '../molecules/MedicalCard'
import AdvocacyCard from '../molecules/AdvocacyCard'

export default function ResearchSidepane (props) {
  return (
    <>
      <div className="research-sidepane__wrapper">
        <Segment vertical>
          <DefaultCard name="Profile"><ProfileCard /></DefaultCard>
        </Segment>
        <Segment vertical>
          <DefaultCard name="Medical"><MedicalCard /></DefaultCard>
        </Segment>
        <Segment vertical>
          <DefaultCard name="Advocacy"><AdvocacyCard /></DefaultCard>
        </Segment>
        <Segment vertical>
          <DefaultCard name="Participation"><AdvocacyCard /></DefaultCard>
        </Segment>
      </div>
    </>
  )
}
