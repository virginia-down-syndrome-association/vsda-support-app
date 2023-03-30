/* eslint-disable space-infix-ops */
import React from 'react'
import { Grid } from 'semantic-ui-react'
import './style.scss'

function Iframe (props) {
  return (<div className="iframe__wrapper" dangerouslySetInnerHTML={ {__html: props.iframe?props.iframe:''}} />)
}

export default function Edit (props) {
  const iframe = '<iframe src="https://experience.arcgis.com/experience/6b30323bc4144f268875ce6b1a5fd4f7/" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen>iFrames are not supported on this page.</iframe>'

  return (
    <React.Fragment>
      <React.Fragment>
        <Grid className='full-height full-width' columns='two' divided>
          <Grid.Column className='gridColumn' width='3'>
            Sidebar goes here.
          </Grid.Column>
          <Grid.Column className='ManageMap__container' width='13'>
            <Iframe iframe={iframe} />,
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </React.Fragment>
  )
}
