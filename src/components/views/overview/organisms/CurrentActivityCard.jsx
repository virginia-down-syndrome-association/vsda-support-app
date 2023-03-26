// import React from 'react'
import { Card } from 'semantic-ui-react'
import '../style.scss'

export default function CurrentActivityCard (props) {
  return (
    <>
      <div className='countyCard__container'>
        <Card raised fluid>
          <Card.Content >
            <Card.Header className='countyCardHeader cardHeader'>Current Members (recent activity)</Card.Header>
          </Card.Content >
          <Card.Content className='overviewCard' >
            Things
          </Card.Content >
        </Card>
      </div>

    </>
  )
}
