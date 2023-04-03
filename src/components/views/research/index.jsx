import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import MapViewComponent from '@/components/global/organisms/map/MapViewComponent'
import ResearchSidepane from './organisms/ResearchSidepane'
import { agolItems } from '../../../constants/appConfig'
import { useSelector } from 'react-redux'

export default function Research (props) {
  const { view } = useSelector(state => state.map)

  useEffect(() => {
    if (view?.ready) {
      console.log('MapView is ready within the Research view')
    }
  }, [view])

  const mapProps = {
    basemap: 'gray-vector',
    portalItem: {
      id: agolItems.webmaps.research.id
    }
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height' columns='two' divided>
          <Grid.Column className="first-col" width="6">
            <ResearchSidepane />
          </Grid.Column>
          <Grid.Column className="second-col"width="10">
            <MapViewComponent
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
