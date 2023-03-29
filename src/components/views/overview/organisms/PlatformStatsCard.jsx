
import { useState, useEffect, useCallback } from 'react'
import { Card, Statistic } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import '../style.scss'

 

export default function PlatformStatsCard (props) {

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid >
          <Card.Content>
            <Card.Header className='cardHeader'>Platform Metrics</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCard__content stats__content'>
            <Statistic className='statistic'>
                <Statistic.Value>25</Statistic.Value>
                <Statistic.Label>Participants</Statistic.Label>
            </Statistic>
            <Statistic className='statistic'>
                <Statistic.Value>5</Statistic.Value>
                <Statistic.Label>VA Affiliate Organizations</Statistic.Label>
            </Statistic>
            <Statistic className='statistic'>
                <Statistic.Value>2</Statistic.Value>
                <Statistic.Label>Average Age</Statistic.Label>
            </Statistic>
            <Statistic className='statistic'>
                <Statistic.Value>2,204</Statistic.Value>
                <Statistic.Label>Views</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
      </div>

    </>
  )
}










<Statistic>
<Statistic.Value>2,204</Statistic.Value>
<Statistic.Label>Views</Statistic.Label>
</Statistic>