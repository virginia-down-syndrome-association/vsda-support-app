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
          <Grid.Column className='' width='4'>
            Hello
          </Grid.Column>
          <Grid.Column className='' width='6'>
            <Grid.Row> County  </Grid.Row>
            <Grid.Row> Zip </Grid.Row>
          </Grid.Column>
        </Grid>
      </Card>
    </>
  )
}
