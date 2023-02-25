import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import './style.scss'

export default function Manage (props) {
  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height grid__wrappper' columns='two' divided>
          <Grid.Column className='gridColumn' width='5'>
            Sidebar goes here.
          </Grid.Column>
          <Grid.Column className="ManageMap__container" width='10'>
            Map goes here
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  )
}
