// import React from 'react'
import CountyOverview from '../molecules/CountyOverview'
import { Card } from 'semantic-ui-react'
import '../style.scss'

export default function CountyCard (props) {
  return (
    <>
      <div className='countyCard__container'>
        <Card className="raised fluid">
          <Card.Content>
            <Card.Header className='countyCardHeader cardHeader'>Statewide Affliate Organizations</Card.Header>
          </Card.Content>
          <Card.Content>
            <CountyOverview />
          </Card.Content>
        </Card>
      </div>

    </>
  )
}
