// import React from 'react'
import { Card } from 'semantic-ui-react'
import '../style.scss'

export default function ProspectiveCard (props) {
  return (
    <>
      <div className='countyCard__container'>
        <Card raised fluid >
          <Card.Content>
            <Card.Header className='overviewCardprospectiveCardHeader cardHeader'>Prospective Members (awaiting intake)</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCard'>
            Member list goes here
          </Card.Content>
        </Card>
      </div>

    </>
  )
}
