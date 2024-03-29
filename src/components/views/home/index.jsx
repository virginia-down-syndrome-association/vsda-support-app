import { Grid } from 'semantic-ui-react'
import './index.css'
import CountyCard from './organisms/CountyCard'
import StatisticsCard from './organisms/StatisticsCard'
import ProspectiveCard from './organisms/ProspectiveCard'
import CurrentActivityCard from './organisms/RecentActivityCard'
import MetricsCard from './organisms/MetricsCard'

export default function Home (props) {
  return (
    <div className='overviewView__container'>
      <Grid>
        <Grid.Row streched='false' className='overviewHeader'>
          <h1>Welcome to the VSDA Decison Support System.</h1>
          <div className='overviewHeaderSubtitle'>Using a geographic approach to help support VSDA and it&apos;s member community.</div>
        </Grid.Row>
        <Grid.Row columns="3">
          <Grid.Column>
            <CountyCard />
          </Grid.Column>
          <Grid.Column>
            <Grid.Row columns="2">
              <Grid.Column>
                <MetricsCard />
              </Grid.Column>
              <Grid.Column>
                <ProspectiveCard />
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row columns="2">
              <Grid.Column>
                <StatisticsCard />
              </Grid.Column>
              <Grid.Column>
                <CurrentActivityCard />
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
