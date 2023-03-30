
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import DataSidepane from './organisms/DataSidepane'
import { constituents } from '../../../constants/layerConfig'
import './style.scss'

export default function Plan (props) {
  return (
    <>
      <Grid className='full-height' columns='two' divided>
        <Grid.Column className='grid-col' width='5'>
          <DataSidepane />
        </Grid.Column>
        <Grid.Column className='grid-col' width='11'>
          <MapViewComponent
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
