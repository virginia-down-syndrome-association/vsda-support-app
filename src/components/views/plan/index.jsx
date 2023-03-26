
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import DataSidepane from './organisms/DataSidepane'
import { constituents } from '../../../constants/layerConfig'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './style.scss'

export default function Plan (props) {
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (view?.ready) {
      console.log('MapView is ready within the Plan view')
    }
  }, [view])

  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <DataSidepane />
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
            isWebMap={false}
            mapProps={{ basemap: 'gray-vector' }}
            mapViewProps={{}}
            mapConsumer="plan"
            layers={[constituents]}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}
