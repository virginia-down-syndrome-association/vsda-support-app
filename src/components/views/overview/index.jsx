import { Grid, Divider } from 'semantic-ui-react'
import ApplicationOverview from './molecules/ApplicationOverview'
import './index.css'
import CountyOverview from './molecules/CountyOverview'

export default function Overview (props) {
  return (
    <div className='overviewView__container'>
      <Grid>
        <Grid.Row streched='false' className='overviewHeader'>
          <h1>Welcome to the VSDA Decison Support System.</h1>
          <div className='overviewHeaderSubtitle'>Using a geographic approach to help support VSDA and it&apos;s member community.</div>
        </Grid.Row>
        <Grid.Row >
          <CountyOverview />
        </Grid.Row>
      </Grid>
    </div>
  )
}
