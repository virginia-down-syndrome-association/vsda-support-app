// import React from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react'
import '../style.scss'

export default function CurrentActivityCard(props) {
  const activities = [
    { id: 1, text: 'First event' },
    { id: 2, text: 'Second event' },
    { id: 3, text: 'Third event' },
    { id: 1, text: 'First event' },
    { id: 2, text: 'Second event' },
    { id: 3, text: 'Third event' },
    { id: 1, text: 'First event' },
    { id: 2, text: 'Second event' },
    { id: 3, text: 'Third event' },
    { id: 1, text: 'First event' },
    { id: 2, text: 'Second event' },
    { id: 3, text: 'Third event' }
  ]

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid className='overviewCard'>
          <Card.Content >
            <Card.Header className='countyCardHeader cardHeader'>Current Members (recent activity)</Card.Header>
          </Card.Content >
          <Card.Content className='overviewCard__content' >
            <Feed>
              {activities.map(activity => (
                <Feed.Event key={activity.id}>
                  <Feed.Label > <Icon size='tiny' name="user plus" /> </Feed.Label>
                  <Feed.Content>
                    <Feed.Date content='1 day ago' />
                    <Feed.Summary>
                      You added <a>Jenny Hess</a> to the platfrom.
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
