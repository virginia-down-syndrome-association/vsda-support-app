
import { useState, useEffect } from 'react'
import { Card, Statistic, Grid } from 'semantic-ui-react'
import { calculateAgeFromTimestamp } from '@/utilities/filters'
import ParticipantAgeChart from '../molecules/ParticipantAgeChart'
import { useSelector } from 'react-redux'
import '../style.scss'

const getAverageAge = (participants) => {
  const ages = participants.map(({ properties }) => calculateAgeFromTimestamp(properties.Birthdate))
  const ageSum = ages.reduce((acc, age) => acc + age, 0)
  return {
    ages,
    averageAge: Math.round(ageSum / participants.length)
  }
}

const useMetrics = () => {
  const { participants } = useSelector(state => state.participants)

  const [participantCount, setParticipantCount] = useState(0)
  const [averageAge, setAverageAge] = useState('n/a')
  const [ages, setAges] = useState([])

  useEffect(() => {
    if (participants.length > 0) {
      const { ages, averageAge } = getAverageAge(participants)
      setAverageAge(averageAge)
      setAges(ages)
      setParticipantCount(participants.length)
    }
  }, [participants])

  return [participantCount, averageAge, ages]
}

export default function PlatformStatsCard(props) {
  const [participantCount, averageAge, ages] = useMetrics()

  return (
    <>
      <div className='countyCard__container overviewCard__container'>
        <Card raised fluid >
          <Card.Content>
            <Card.Header className='cardHeader'>Platform Metrics</Card.Header>
          </Card.Content>
          <Card.Content className='overviewCardStats__content stats__content'>
            <Grid>
              <Grid.Row >
                <Statistic className='statistic'>
                  <Statistic.Value>{participantCount}</Statistic.Value>
                  <Statistic.Label>Participants</Statistic.Label>
                </Statistic>
                <Statistic className='statistic'>
                  <Statistic.Value>5</Statistic.Value>
                  <Statistic.Label>VA Affiliate Organizations</Statistic.Label>
                </Statistic>
                <Statistic className='statistic'>
                  <Statistic.Value>{averageAge}</Statistic.Value>
                  <Statistic.Label>Average Age</Statistic.Label>
                </Statistic>
              </Grid.Row>
              <Grid.Row >
                <ParticipantAgeChart ages={ages} />
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </div>

    </>
  )
}
