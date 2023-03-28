// import React from 'react'
import { Card, Feed, Icon } from 'semantic-ui-react'
import '../style.scss'

export default function ProspectiveCard (props) {
  const prospects = [
    { id: 1, text: 'First event' },
    { id: 2, text: 'Second event' },
    { id: 3, text: 'Third event' },
    { id: 4, text: 'First event' },
    { id: 5, text: 'Second event' },
    { id: 6, text: 'Third event' },
    { id: 7, text: 'First event' },
    { id: 8, text: 'Second event' },
    { id: 9, text: 'Third event' },
    { id: 10, text: 'First event' },
    { id: 11, text: 'Second event' },
    { id: 12, text: 'Third event' }
  ]

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid >
          <Card.Content>
            <Card.Header className='overviewCardprospectiveCardHeader cardHeader'>Prospective Members (awaiting intake)</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCard__content'>
            <Feed>
              {prospects.map(prospect => (
                <Feed.Event key={prospect.id}>
                  <Feed.Label > <Icon size='tiny' name="exchange" /> </Feed.Label>
                  <Feed.Content>
                    <Feed.Date content='Reached out 1 day ago (3.26.2023)' />
                    <Feed.Summary>
                      <a>Jenny Hess</a>
                    </Feed.Summary>
                    <Feed.Meta>
                    Prefers outreach over phone.
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
