import { Header, Card, Grid, Statistic } from 'semantic-ui-react'
import '../style.scss'

export default function ProfileCard () {
  return (
    <>
      <Card fluid>
        <Grid className='profileGrid' columns='4' divided >
          <Grid.Column className='gridColumn summary__container' width='3'>
            <Grid.Row>
              <Header as='h4' className='cardHeader'>Etta Moran</Header>
            </Grid.Row>
            <Grid.Row> Female</Grid.Row>
          </Grid.Column>
          <Grid.Column className='gridColumn' width='3'>
            <Statistic>
              <Statistic.Value>3</Statistic.Value>
              <Statistic.Label>Years Old</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column className='locationSummary' width='9'>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}> Constituent Number:</Header>
              <div>123456789</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}> Family ID:</Header>
              <div>123456789</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader summaryItem' style={{ margin: '0px' }}>Added to platform on: </Header>
              <div>12.31.2022</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}>Zip: </Header>
              <div>22401</div>
            </Grid.Row>
            <Grid.Row className='rowSpan'>
              <Header as='h5' className='cardHeader' style={{ margin: '0px' }}>County: </Header>
              <div>City of Fredericksburg</div>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Card>
    </>
  )
}
