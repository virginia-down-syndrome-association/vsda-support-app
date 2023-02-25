
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ExploreTabController from './organisms/ExploreTabController'
import { useContext, useEffect } from 'react'
import { MapContext } from '@/contexts/MapContext'
import './style.scss'

export default function Explore (props) {
  const { mapView, setMapView } = useContext(MapContext)

  useEffect(() => {
    console.log(mapView)
  }, [mapView])

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <ExploreTabController />
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
            mapViewProps={{}}
            onMapViewLoad={setMapView}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
