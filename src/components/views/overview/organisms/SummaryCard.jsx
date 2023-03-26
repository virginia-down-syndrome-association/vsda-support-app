// import React from 'react'
import { Card } from 'semantic-ui-react'
import '../style.scss'

export default function SummaryCard (props) {

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid className='overviewCard' >
          <Card.Content>
            <Card.Header className='cardHeader'>Platform Statistics</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCard__content'>

          </Card.Content>
        </Card>
      </div>

    </>
  )
}
