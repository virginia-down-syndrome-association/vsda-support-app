import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import MapContainer from '@/components/views/explore/organisms/MapContainer'

export default function Explore(props) {
  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height' columns='two' divided>
          <Grid.Column className='gridColumn' width='5'>
            Sidebar goes here. 
          </Grid.Column>
          <Grid.Column width='10'>
            <MapContainer />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  )
}
