
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ExploreDataSidepane from './organisms/ExploreDataSidepane'
import { addConstituentsLayer } from '@/utilities/maps'
import { useContext, useEffect } from 'react'
import { MapContext } from '@/contexts/MapContext'
import './style.scss'

export default function Explore (props) {
  const { mapView, map, setConstituentsLayer } = useContext(MapContext)

  useEffect(() => {
    if (mapView?.ready && map) {
      addConstituentsLayer(map, mapView, setConstituentsLayer)
    }
  }, [mapView, map])

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <ExploreDataSidepane />
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
            mapViewProps={{}}
            // onMapViewLoad={setMapView}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
