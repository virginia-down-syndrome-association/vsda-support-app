
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ExploreDataSidepane from './organisms/ExploreDataSidepane'
import { addConstituentsLayer } from '@/utilities/maps'
import { useContext, useEffect } from 'react'
import { MapContext } from '@/contexts/MapContext'
import { useSelector } from 'react-redux'
import { updateConstituentFilter } from '@/utilities/data'
import './style.scss'

export default function Explore (props) {
  const { mapView, map, setConstituentsLayer, constituentsLayer } = useContext(MapContext)
  const state = useSelector(state => state.filters)
  useEffect(() => {
    if (mapView?.ready && map) {
      addConstituentsLayer(map, mapView, setConstituentsLayer)
    }
  }, [mapView, map])

  useEffect(() => {
    if (constituentsLayer) {
      updateConstituentFilter(constituentsLayer)
    }
  }, [constituentsLayer, state])

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
