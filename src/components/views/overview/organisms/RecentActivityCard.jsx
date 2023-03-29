import { useState, useEffect } from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import '../style.scss'

const useParticipants = () => {
  const { participants } = useSelector(state => state.participants)
  const [_participants, _setParticipants] = useState([])

  function getDaysSinceJoining (date) {
    const today = new Date()
    const dateJoined = new Date(date)
    const diffTime = Math.abs(today - dateJoined)
    const daysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return daysElapsed
  }

  useEffect(() => {
    if (participants.length > 0) {
      const items = participants.map(({ properties }) => {
        return {
          id: properties.OBJECTID,
          firstName: properties.FirstName,
          lastName: properties.LastName,
          daysSinceJoin: getDaysSinceJoining(properties.CreationDate)
        }
      })
      const dayThreshold = 90
      const recentItems = items.filter(item => item.daysSinceJoin <= dayThreshold)
      _setParticipants(recentItems)
    } else {
      _setParticipants([])
    }
  }, [participants])

  return [_participants, _setParticipants]
}

export default function RecentActivityCard (props) {
  const [recentParticipants] = useParticipants()

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid className='overviewCard'>
          <Card.Content >
            <Card.Header className='countyCardHeader cardHeader'>Recent Members (joined within last 90 days)</Card.Header>
          </Card.Content >
          <Card.Content className='overviewCard__content' >
            <Feed>
              {recentParticipants.map(participant => (
                <Feed.Event key={participant.id}>
                  <Feed.Label > <Icon size='tiny' name="user plus" /> </Feed.Label>
                  <Feed.Content>
                    <Feed.Date> {`${participant.daysSinceJoin} ago`} </Feed.Date>
                    <Feed.Summary>
                      {`${participant.firstName} ${participant.lastName} joined the platform.`}
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              ))}
            </Feed>
          </Card.Content >
        </Card>
      </div>

    </>
  )
}
