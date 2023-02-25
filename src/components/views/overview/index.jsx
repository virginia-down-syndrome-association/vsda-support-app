import { Grid, Divider } from 'semantic-ui-react'
import ApplicationOverview from './molecules/ApplicationOverview'
import './index.css'

export default function Overview (props) {
  return (
    <div className='overviewView__container'>
      <Grid>
        <Grid.Row className='overviewHeader'>
          <h1>Welcome to the VSDA Decison Support System.</h1>
          <div className='overviewHeaderSubtitle'>Using a geographic approach to help support VSDA and it&apos;s member community.</div>
        </Grid.Row>
        <Divider />
        <Grid.Row >
          <ApplicationOverview />
        </Grid.Row>
      </Grid>
    </div>
  )
}
