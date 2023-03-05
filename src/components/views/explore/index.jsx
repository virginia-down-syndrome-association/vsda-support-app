
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ExploreDataSidepane from './organisms/ExploreDataSidepane'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setMapView } from '@/store/reducers/map'
import './style.scss'

export default function Explore (props) {
  // const { mapView, map, setConstituentsLayer, constituentsLayer } = useContext(MapContext)
  const { view } = useSelector(state => state.map)
  useEffect(() => {
    if (view?.ready) {
      console.log('should add layer once view is ready')
    }
  }, [view])

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <ExploreDataSidepane />
          {view?.ready && <div>Map is ready</div>}
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
            mapViewProps={{}}
            mapProps={{ basemap: 'gray-vector' }}
            onMapViewLoad={setMapView}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
