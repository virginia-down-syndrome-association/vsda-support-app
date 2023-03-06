
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ExploreDataSidepane from './organisms/ExploreDataSidepane'
import { constituents } from '../../../constants/layerConfig'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setMapView } from '@/store/reducers/map'
import './style.scss'

export default function Explore (props) {
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (view?.ready) {
      console.log('MapView is ready within the Explore view')
    }
  }, [view])

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <ExploreDataSidepane />
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
            mapViewProps={{}}
            mapProps={{ basemap: 'gray-vector' }}
            layers={[constituents]}
            onMapViewLoad={setMapView}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
