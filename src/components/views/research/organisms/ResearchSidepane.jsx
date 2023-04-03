import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import '../style.scss'

export default function ResearchSidepane (props) {
  return (
    <>
      <div className="research-sidepane__wrapper">
        <Grid className='full-height' columns='two' divided>
          <Grid.Row>
            Timmy
          </Grid.Row>
          <Grid.Row >
            Jimmy
          </Grid.Row>
        </Grid>
      </div>
    </>
  )
}
