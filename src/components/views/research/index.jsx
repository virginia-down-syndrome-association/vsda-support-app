import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import { setMapView } from '@/store/reducers/map'
import { useSelector } from 'react-redux'

export default function Research (props) {
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (view?.ready) {
      console.log('MapView is ready within the Explore view')
    }
  }, [view])

  const mapProps = {
    basemap: 'gray-vector',
    portalItem: {
      id: 'aa52ca4c4b5448699b1f838d58cb20a7'
    }
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height' columns='two' divided>
          <Grid.Column className="first-col" width="7">
            First Column
          </Grid.Column>
          <Grid.Column className="second-col"width="9">
            <MapViewComponent
              isWebMap={true}
              mapProps={ mapProps }
              mapViewProps={{}}
              mapConsumer="analysis"
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  )
}
