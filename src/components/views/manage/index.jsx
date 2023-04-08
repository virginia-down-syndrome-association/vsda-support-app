/* eslint-disable space-infix-ops */
import React, { useEffect} from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import DataResources from './molecules/DataResources'
import IntakeResources from './molecules/IntakeResources'
import OutreachResources from './molecules/OutreachResources'
import ProgramResources from './molecules/ProgramResources'
import ManageEvents from './molecules/ManageEvents'
import { useSelector } from 'react-redux'
import { agolItems } from '@/constants/appConfig'
import './style.scss'

export default function Manage (props) {
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (view?.ready) {
      console.log('ready')
    }
  }, [view])

  const mapProps = {
    basemap: 'gray-vector',
    portalItem: {
      id: agolItems.webmaps.manage.id
    }
  }

  return (
    <React.Fragment>
      <Grid className='manageGrid__wrapper'>
        <Grid.Column width={5}>
          <MapViewComponent
            mapProps={mapProps}
            mapViewProps={{}}
            mapConsumer='manage'
          />
        </Grid.Column>
        <Grid.Column width={5}>
          {/* <Header className='cardHeader' as='h3'>VDSA Events</Header> */}
          <ManageEvents />
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row fluid className='manageGrid__row'>
            <Container fluid>
              <Header className='cardHeader' style={{ textAlign: 'center' }} as='h3'>VSDA Program Resources</Header>
              <ProgramResources />
            </Container>
          </Grid.Row>
          <Grid.Row fluid >
            <Container className='manageGrid__row' fluid>
              <Header className='cardHeader' style={{ textAlign: 'center' }} as='h3'>Data-related Resources (Editing)</Header>
              <DataResources />
            </Container>
          </Grid.Row>
          <Grid.Row fluid className='manageGrid__row'>
            <Container fluid>
              <Header className='cardHeader' style={{ textAlign: 'center' }} as='h3'>Intake Resources (Data Collection)</Header>
              <IntakeResources />
            </Container>
          </Grid.Row>
          <Grid.Row fluid className='manageGrid__row'>
            <Container fluid>
              <Header className='cardHeader' style={{ textAlign: 'center' }} as='h3'>Outreach-related Resources (Open Data)</Header>
              <OutreachResources />
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}
