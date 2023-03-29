// import React from 'react'
import { Grid, Card } from 'semantic-ui-react'
import ParticipantAgeChart from '../molecules/ParticipantAgeChart'
import ParticipantSexChart from '../molecules/ParticipantSexChart'
import '../style.scss'

export default function SummaryCard (props) {
  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid className='overviewCard' >
          <Card.Content>
            <Card.Header className='cardHeader'>Platform Statistics</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCardStats__content'>
            <Grid>
              <Grid.Row columns="2">
                <Grid.Column>
                  <ParticipantSexChart />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </div>

    </>
  )
}