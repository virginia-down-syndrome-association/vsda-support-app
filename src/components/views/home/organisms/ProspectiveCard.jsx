import { useState, useEffect, useCallback } from 'react'
import { queryFeatures } from '@esri/arcgis-rest-feature-service'
import { Card, Feed, Icon } from 'semantic-ui-react'
import { agolItems } from '@/constants/appConfig'
import { useSelector, useDispatch } from 'react-redux'
import { setProspectiveParticipants } from '@/store/reducers/participants'
import useTokenHelper from '@/utilities/hooks/useTokenHelper'
import '../style.scss'

const useProspectiveParticipants = () => {
  const { prospectiveParticipants } = useSelector(state => state.participants)
  const [_prospects, _setProspects] = useState([])

  function getDaysSinceOutreach (date) {
    const today = new Date()
    const dateJoined = new Date(date)
    const diffTime = Math.abs(today - dateJoined)
    const daysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return daysElapsed
  }

  useEffect(() => {
    if (prospectiveParticipants.length > 0) {
      const items = prospectiveParticipants.map(({ attributes }) => {
        return {
          id: attributes.objectid,
          outreachContact: attributes.name,
          participantContact: {
            firstName: attributes.participant_firstname,
            lastName: attributes.participant_lastname,
            age: attributes.participant_age,
            sex: attributes.participant_sex
          },
          status: attributes.status,
          relationship: attributes.relationship,
          preferredOutreach: attributes.preferred_outreach,
          daysSinceOutreach: getDaysSinceOutreach(attributes.CreationDate)
        }
      })
      // TODO FILTER BASED ON STATUS
      _setProspects(items)
    } else {
      _setProspects([])
    }
  }, [prospectiveParticipants])

  return [_prospects, _setProspects]
}

export default function ProspectiveCard (props) {
  const dispatch = useDispatch()
  const { authentication } = useTokenHelper()
  const [prospectiveParticipants] = useProspectiveParticipants()

  const getProspects = useCallback(async () => {
    const fields = [
      'objectid',
      'CreationDate',
      'preferred_outreach',
      'relationship',
      'name',
      'status',
      'participant_firstname',
      'participant_lastname',
      'participant_age',
      'participant_sex'
    ]
    const { features } = await queryFeatures({
      url: agolItems.rest.prospects,
      f: 'json',
      outfields: fields,
      returnGeometry: false,
      authentication
    })
    dispatch(setProspectiveParticipants(features))
  })

  useEffect(() => {
    if (authentication) {
      getProspects()
    }
  }, [authentication])

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid >
          <Card.Content>
            <Card.Header className='overviewCardprospectiveCardHeader cardHeader'>Prospective Members (awaiting intake)</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCard__content'>
            <Feed>
              {prospectiveParticipants.map(prospect => (
                <Feed.Event key={prospect.id}>
                  <Feed.Label > <Icon size='tiny' name="exchange" /> </Feed.Label>
                  <Feed.Content>
                    <Feed.Date>{`${prospect.outreachContact} (${prospect.relationship}) reached out ${prospect.daysSinceOutreach} day ago`}</Feed.Date>
                    { prospect.participantContact.firstName && <Feed.Event>
                      {`(Regarding ${prospect.participantContact.age} year old ${prospect.participantContact.firstName} ${prospect.participantContact.lastName})`}
                    </Feed.Event> }
                    <Feed.Meta>
                      {`Prefers outreach over ${prospect.preferredOutreach}`}
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              ))}
            </Feed>
          </Card.Content>
        </Card>
      </div>

    </>
  )
}
