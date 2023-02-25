
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import { useContext } from 'react'
import { MapContext } from '@/contexts/MapContext'

export default function Explore (props) {
  const { setMapView } = useContext(MapContext)

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='gridColumn' width='5'>
          Sidebar goes here.
        </Grid.Column>
        <Grid.Column width='10'>
          <MapViewComponent
            mapViewProps={{}}
            onMapViewLoad={setMapView}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
